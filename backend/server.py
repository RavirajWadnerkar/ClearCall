import os
import json
import logging
from openai import OpenAI
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import mysql.connector
import traceback
from dotenv import load_dotenv
from awsConfig import upload_to_s3, AWS_BUCKET_NAME, s3_client
import tempfile
from functools import wraps
import time
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman
from twilio.rest import Client

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure app
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default_secret_key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Initialize rate limiter
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

# Initialize Talisman for security headers
Talisman(app,
    content_security_policy={
        'default-src': "'self'",
        'img-src': '*',
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'"]
    },
    force_https=False  # Set to True in production
)

# Initialize extensions with updated CORS configuration
CORS(app, 
     resources={
         r"/*": {
             "origins": ["http://localhost:8000", "http://127.0.0.1:8000", "http://localhost:8080", "http://127.0.0.1:8080", "http://localhost:8081", "http://127.0.0.1:8081"],
             "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
             "allow_headers": ["Content-Type", "Authorization", "Accept", "X-Requested-With", "Access-Control-Allow-Credentials"],
             "expose_headers": ["Content-Type", "Authorization"],
             "supports_credentials": True,
             "max_age": 120
         }
     }
)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Database configuration
db_config = {
    "host": os.getenv('DB_HOST', 'localhost'),
    "user": os.getenv('DB_USER', 'root'),
    "password": os.getenv('DB_PASSWORD', ''),
    "database": os.getenv('DB_NAME', 'clearcall'),
    "port": int(os.getenv('DB_PORT', 3306))
}

def get_db_connection():
    try:
        logger.info("Attempting to connect to the database")
        connection = mysql.connector.connect(**db_config)
        logger.info("Database connection successful")
        return connection
    except mysql.connector.Error as err:
        logger.error(f"Database connection failed: {err}")
        raise

def init_db():
    """Initialize database tables if they don't exist."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Create voice_complaints table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS voice_complaints (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                s3_file_path VARCHAR(255) NOT NULL,
                transcript TEXT,
                ai_response TEXT,
                status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """)
        
        cursor.execute("""
    CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        call_sid VARCHAR(64) NOT NULL,
        caller_number VARCHAR(20),
        recipient_number VARCHAR(20),
        duration INT,
        start_time DATETIME,
        status VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
""")


        logger.info("Database tables initialized successfully")
        conn.commit()

    except mysql.connector.Error as err:
        logger.error(f"Error initializing database: {err}")
        raise

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Initialize database tables when the application starts
with app.app_context():
    init_db()

# Route for root URL
@app.route('/')
def home():
    # Return a simple JSON response instead of trying to render a template
    print("Root route hit")
    return jsonify({"message": "ClearCall API is running"}), 200

# Route to handle favicon.ico requests
@app.route('/favicon.ico')
def favicon():
    return "", 204

# /signup endpoint
@app.route('/signup', methods=['POST'])
def signup():
    print("Signup endpoint hit")
    try:
        data = request.get_json(force=True)
        print('Received signup request with data:', data)
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        phone = data.get('phone')
        role = data.get('role', 'user')

        # Validate required fields
        if not all([name, email, password, phone, role]):
            print('Validation failed: Missing required fields')
            return jsonify({"error": "All fields (name, email, password, phone, role) are required."}), 400

        # Basic role validation
        if role not in ["user", "admin"]:
            print('Validation failed: Invalid role')
            return jsonify({"error": "Invalid role. Must be 'user' or 'admin'."}), 400

        # Optional: basic email format check
        if '@' not in email or '.' not in email:
            print('Validation failed: Invalid email format')
            return jsonify({"error": "Invalid email format."}), 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        print('Password hashed successfully')

        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Check for existing email
            cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
            if cursor.fetchone():
                print('Signup failed: Email already exists')
                return jsonify({"error": "User with this email already exists."}), 409

            # Insert new user
            query = """
                INSERT INTO users (name, email, phone, hashed_password, role)
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(query, (name, email, phone, hashed_password, role))
            conn.commit()
            print('User inserted successfully into the database')

            return jsonify({"success": True, "message": "User registered successfully."}), 201

        except mysql.connector.Error as db_err:
            print(f"Database error during signup: {db_err}")
            return jsonify({"error": "Database error occurred. Please try again later."}), 500

        finally:
            cursor.close()
            conn.close()

    except Exception as e:
        print(f"Unexpected error during signup: {e}")
        traceback.print_exc()
        return jsonify({"error": "An unexpected error occurred. Please try again later."}), 500


# Updated login function to properly verify hashed passwords
@app.route('/login', methods=['POST'])
def login():
    print("Login endpoint hit")
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        
        try:
            # Fetch user by email
            cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
            user = cursor.fetchone()

            if not user or not bcrypt.check_password_hash(user['hashed_password'], password):
                return jsonify({"error": "Invalid email or password"}), 401

            return jsonify({"success": True, "message": "Login successful"}), 200

        except mysql.connector.Error as db_err:
            print(f"Database error during login: {db_err}")
            return jsonify({"error": "Database error occurred. Please try again later."}), 500

        finally:
            cursor.close()
            conn.close()

    except Exception as e:
        print(f"Unexpected error during login: {e}")
        return jsonify({"error": "An unexpected error occurred. Please try again later."}), 500

# /logout endpoint
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        # JWT revocation can be implemented here if needed
        return jsonify({"success": True, "message": "Logged out successfully"}), 200

    except Exception as e:
        print(f"Unexpected error: {e}")
        traceback.print_exc()
        return jsonify({"error": "An unexpected error occurred. Please try again later."}), 500

# Protected route example
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"logged_in_as": current_user})

# Route to serve the completed_calls.json file
@app.route('/api/completed-calls', methods=['GET'])
def get_completed_calls():
    try:
        # Get the path to the completed_calls.json file
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'completed_calls.json')
        
        # Check if the file exists
        if not os.path.exists(file_path):
            # Return an empty array if file doesn't exist
            return jsonify([]), 200
            
        # Read the file and return its contents
        with open(file_path, 'r') as f:
            data = json.load(f)
            
        return jsonify(data), 200
        
    except Exception as e:
        print(f"Error serving completed_calls.json: {e}")
        return jsonify({"error": "Failed to retrieve call data"}), 500

@app.route('/api/sync-twilio-inquiries', methods=['POST'])
def sync_twilio_logs():
    try:
        # Load Twilio credentials
        account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        phone_number = os.getenv('TWILIO_PHONE_NUMBER')
        client = Client(account_sid, auth_token)

        # Fetch all calls made TO your Twilio number
        calls = client.calls.list(to=phone_number)

        current_month = datetime.now().month
        current_year = datetime.now().year

        # Filter completed calls for this month
        completed_calls = [
            call for call in calls
            if call.status == "completed" and call.start_time and call.start_time.month == current_month and call.start_time.year == current_year
        ]

        # Insert into inquiries table
        conn = get_db_connection()
        cursor = conn.cursor()

        insert_query = """
            INSERT INTO inquiries (
                call_sid, caller_number, recipient_number, duration, start_time, status
            ) VALUES (%s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE duration=VALUES(duration), status=VALUES(status)
        """

        for call in completed_calls:
            cursor.execute(insert_query, (
                call.sid,
                call._from,  # caller
                call.to,     # recipient
                int(call.duration) if call.duration else 0,
                call.start_time.strftime('%Y-%m-%d %H:%M:%S'),
                call.status
            ))

        conn.commit()
        logger.info(f"Synced {len(completed_calls)} Twilio calls to 'inquiries' table")
        return jsonify({"message": f"Synced {len(completed_calls)} calls"}), 200

    except Exception as e:
        logger.error(f"Twilio sync error: {str(e)}")
        return jsonify({"error": "Failed to sync Twilio logs"}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/api/monthly-summary', methods=['GET', 'OPTIONS'])
def get_monthly_summary():
    """Return monthly data for resolved vs escalated complaints."""
    if request.method == 'OPTIONS':
        return handle_preflight()
        
    try:
        # For demo purposes, returning mock data
        # In a production environment, this would query the database
        return jsonify([
            { "name": 'Jan', "resolved": 65, "escalated": 15 },
            { "name": 'Feb', "resolved": 59, "escalated": 12 },
            { "name": 'Mar', "resolved": 80, "escalated": 8 },
            { "name": 'Apr', "resolved": 81, "escalated": 10 },
            { "name": 'May', "resolved": 76, "escalated": 11 },
            { "name": 'Jun', "resolved": 85, "escalated": 7 },
        ]), 200
    except Exception as e:
        logger.error(f"Error fetching monthly summary: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload and store it in S3."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Upload the file to S3
    upload_message = upload_to_s3(file, AWS_BUCKET_NAME)

    if "File uploaded" in upload_message:
        return jsonify({"message": upload_message}), 200
    else:
        return jsonify({"error": upload_message}), 500

# backend/server.py (add this endpoint to your server.py)
@app.route('/file-count', methods=['GET'])
def get_file_count():
    """Fetch the count of files in the S3 bucket."""
    try:
        response = s3_client.list_objects_v2(Bucket=AWS_BUCKET_NAME)
        contents = response.get('Contents', [])
        
        # Filter only PDF files
        pdf_files = [obj for obj in contents if obj['Key'].lower().endswith('.pdf')]
        file_count = len(pdf_files)
        return jsonify({"file_count": file_count}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Retrieve the OpenAI API key from the environment variable
openai_api_key = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=openai_api_key)

def retry_with_backoff(max_retries=3, initial_delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            delay = initial_delay
            last_exception = None
            
            for retry in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    if retry < max_retries - 1:
                        logger.warning(f"Attempt {retry + 1} failed: {str(e)}. Retrying in {delay} seconds...")
                        time.sleep(delay)
                        delay *= 2  # Exponential backoff
                    else:
                        logger.error(f"All {max_retries} attempts failed. Last error: {str(e)}")
                        raise last_exception
            
            raise last_exception
        return wrapper
    return decorator

@retry_with_backoff()
def download_from_s3(bucket, key, local_path):
    logger.info(f"Downloading file from S3: {bucket}/{key} to {local_path}")
    s3_client.download_file(bucket, key, local_path)
    logger.info("S3 download successful")

@retry_with_backoff()
def transcribe_audio(audio_file):
    logger.info("Starting audio transcription")
    with open(audio_file, 'rb') as f:
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=f,
            response_format="text"
        )
    logger.info("Audio transcription successful")
    return transcript

@retry_with_backoff()
def generate_ai_response(transcript):
    logger.info("Generating AI response")
    chat_response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful customer service AI assistant. Analyze the customer's complaint and provide a professional, empathetic response."},
            {"role": "user", "content": transcript}
        ]
    )
    logger.info("AI response generated successfully")
    return chat_response.choices[0].message.content

@app.route('/api/process-voice-complaint', methods=['POST', 'OPTIONS'])
def process_voice_complaint():
    if request.method == 'OPTIONS':
        return handle_preflight()
        
    try:
        data = request.get_json()
        s3_file_path = data.get('file_path')
        
        if not s3_file_path:
            logger.error("No file path provided in request")
            return jsonify({'error': 'No file path provided'}), 400

        temp_file_path = None
        try:
            with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_file:
                temp_file_path = temp_file.name
                logger.info(f"Created temporary file: {temp_file_path}")
                
            # Download file from S3
            try:
                download_from_s3(AWS_BUCKET_NAME, s3_file_path, temp_file_path)
            except Exception as s3_error:
                logger.error(f"S3 download error: {str(s3_error)}")
                return jsonify({'error': f'Failed to download file from S3: {str(s3_error)}'}), 500

            # Transcribe audio
            try:
                transcript = transcribe_audio(temp_file_path)
                logger.info(f"Transcript generated: {transcript[:100]}...")
            except Exception as whisper_error:
                logger.error(f"Transcription error: {str(whisper_error)}")
                return jsonify({'error': f'Failed to transcribe audio: {str(whisper_error)}'}), 500

            # Generate AI response
            try:
                ai_response = generate_ai_response(transcript)
                logger.info("AI response generated successfully")
            except Exception as gpt_error:
                logger.error(f"AI response generation error: {str(gpt_error)}")
                return jsonify({'error': f'Failed to generate AI response: {str(gpt_error)}'}), 500

            # Store the complaint in the database
            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                
                insert_query = """
                    INSERT INTO voice_complaints (
                        user_id,
                        s3_file_path,
                        transcript,
                        ai_response,
                        status,
                        created_at
                    ) VALUES (%s, %s, %s, %s, %s, NOW())
                """
                
                user_id = get_jwt_identity()
                cursor.execute(insert_query, (
                    user_id,
                    s3_file_path,
                    transcript,
                    ai_response,
                    'completed'
                ))
                conn.commit()
                logger.info("Complaint stored in database successfully")
                
            except Exception as db_error:
                logger.error(f"Database error: {str(db_error)}")
                # Don't return error to client, just log it
                # The complaint processing was successful even if DB storage failed
            
            finally:
                if cursor:
                    cursor.close()
                if conn:
                    conn.close()

            return jsonify({
                'success': True,
                'transcript': transcript,
                'response': ai_response
            })

        finally:
            # Clean up temporary file
            if temp_file_path and os.path.exists(temp_file_path):
                try:
                    os.unlink(temp_file_path)
                    logger.info("Temporary file cleaned up successfully")
                except Exception as cleanup_error:
                    logger.warning(f"Failed to clean up temporary file: {str(cleanup_error)}")

    except Exception as e:
        logger.error(f"Unexpected error in process_voice_complaint: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@app.route('/api/complaint-summary', methods=['GET', 'OPTIONS'])
def get_complaint_summary():
    """Return percentage breakdown of AI-resolved vs human-escalated inquiries."""
    if request.method == 'OPTIONS':
        return handle_preflight()

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT COUNT(*) AS total_inquiries FROM inquiries")
        total_inquiries = cursor.fetchone()['total_inquiries']

        cursor.execute("SELECT COUNT(*) AS escalations FROM human_escalation")
        escalations = cursor.fetchone()['escalations']

        if total_inquiries == 0:
            ai_resolved_pct = 0
            human_escalated_pct = 0
        else:
            ai_resolved_pct = round(((total_inquiries - escalations) / total_inquiries) * 100, 2)
            human_escalated_pct = round((escalations / total_inquiries) * 100, 2)

        return jsonify({
            "ai_resolved": ai_resolved_pct,
            "human_escalated": human_escalated_pct
        }), 200

    except Exception as e:
        logger.error(f"Error fetching complaint summary: {str(e)}")
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Route to get the resolution rate
@app.route('/api/resolution-rate', methods=['GET'])
def get_resolution_rate():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Get total inquiries
        cursor.execute("SELECT COUNT(*) AS total FROM inquiries")
        total_inquiries = cursor.fetchone()["total"] or 0

        # Get total escalations
        cursor.execute("SELECT COUNT(*) AS escalated FROM human_escalation")
        total_escalated = cursor.fetchone()["escalated"] or 0

        # Calculate AI-resolved
        ai_resolved = max(total_inquiries - total_escalated, 0)

        # Calculate resolution rate
        if total_inquiries == 0:
            resolution_rate = 0
        else:
            resolution_rate = round((ai_resolved / total_inquiries) * 100, 2)

        return jsonify({"resolution_rate": resolution_rate}), 200

    except Exception as e:
        logger.error(f"Resolution rate calculation failed: {str(e)}")
        return jsonify({"error": "Failed to calculate resolution rate."}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/api/human-escalations', methods=['GET'])
def get_human_escalations():
    try:    
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT caller_number, initiated_at, reason 
            FROM human_escalation
            ORDER BY initiated_at DESC
        """)
        results = cursor.fetchall()
        return jsonify(results), 200
    except Exception as e:
        logger.error(f"Error fetching human escalations: {e}")
        return jsonify({"error": "Failed to fetch human escalations"}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


@app.route('/api/claude', methods=['POST', 'OPTIONS'])
def claude_chat():
    """Handle chat messages with AI."""
    if request.method == 'OPTIONS':
        return handle_preflight()

    try:
        data = request.get_json()
        user_message = data.get('message')

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Generate AI response using the OpenAI client
        chat_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You represent ClearCall company. You are a helpful and knowledgeable AI assistant talking on behalf of ClearCall company staff. Keep responses concise and clear."},
                {"role": "user", "content": user_message}
            ]
        )

        ai_reply = chat_response.choices[0].message.content
        return jsonify({"reply": ai_reply}), 200

    except Exception as e:
        logger.error(f"Error in claude_chat: {str(e)}")
        return jsonify({"error": str(e)}), 500

def handle_preflight():
    response = jsonify({'message': 'OK'})
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With, Access-Control-Allow-Credentials')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin', '*'))
    return response

@app.route('/health')
def health_check():
    """Health check endpoint for monitoring."""
    try:
        # Test database connection
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT 1')
        cursor.close()
        conn.close()

        # Test S3 connection
        s3_client.list_buckets()

        return jsonify({
            "status": "healthy",
            "checks": {
                "database": "connected",
                "s3": "connected"
            },
            "timestamp": datetime.now().isoformat()
        }), 200
    except mysql.connector.Error as db_err:
        return jsonify({
            "status": "unhealthy",
            "error": f"Database error: {str(db_err)}",
            "timestamp": datetime.now().isoformat()
        }), 500
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)