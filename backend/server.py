import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import mysql.connector
import traceback
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure app
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default_secret_key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Initialize extensions
CORS(app, resources={r"/*": {"origins": ["http://localhost:8080", "http://127.0.0.1:8080"]}}, supports_credentials=True)
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
        print("Attempting to connect to the database with the following configuration:")
        print(f"Host: {db_config['host']}, Port: {db_config['port']}, User: {db_config['user']}, Database: {db_config['database']}")
        connection = mysql.connector.connect(**db_config)
        print("Database connection successful.")
        return connection
    except mysql.connector.Error as err:
        print(f"Database connection failed: {err}")
        raise

# Route for root URL
@app.route('/')
def home():
    # Added debug statement to check if the root route is intercepting requests
    print("Root route hit")
    return render_template('index.html')

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)