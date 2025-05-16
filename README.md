# ClearCall

A modern web application for processing voice complaints using AI-powered transcription and response generation.

## 🚀 Features

- 🎤 Voice Complaint Processing: Upload and process voice recordings
- 🤖 AI-Powered Transcription: Accurate speech-to-text conversion
- 💬 Automated Response Generation: AI-generated responses to complaints
- 🔒 Secure File Storage: AWS S3 integration for secure file handling
- 👤 User Authentication: Secure login and account management
- 📱 Responsive Design: Seamless experience across all devices

## 🛠️ Tech Stack

### Backend
- **Framework:** Flask (Python)
- **Database:** MySQL
- **Authentication:** JWT
- **Cloud Storage:** AWS S3
- **AI Services:** OpenAI API
- **Voice Services:** Twilio

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Query

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- MySQL 8+
- AWS Account
- OpenAI API Key
- Twilio Account

## 🔧 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ClearCall.git
   cd ClearCall
   ```

2. **Set Up Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set Up Frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Configure Environment**
   Create a `.env` file in the backend directory with:

   ```env
   # JWT Configuration
   JWT_SECRET_KEY=your_jwt_secret

   # Database Configuration
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=clearcall
   DB_PORT=3306

   # AWS Configuration
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_BUCKET_NAME=your_bucket_name
   AWS_REGION=your_aws_region

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key

   # Twilio Configuration
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_token
   TWILIO_PHONE_NUMBER=your_twilio_phone
   ```

## 💻 Development

1. **Start Backend Server**
   ```bash
   cd backend
   python main.py
   ```
   The backend will run on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:8000`

## 🔐 Security Features

- JWT Authentication for secure API access
- Password Hashing using bcrypt
- Rate Limiting to prevent abuse
- CORS Protection for API security
- Input Validation for all requests
- Secure File Upload handling
- HTTP Security Headers

## 📡 API Endpoints

### Authentication
- `POST /auth/signup` - Create new account
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "phone": "string"
  }
  ```

- `POST /auth/login` - User login
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Voice Processing
- `POST /voice/upload` - Upload voice file
  - Accepts multipart/form-data
  - File size limit: 10MB
  - Supported formats: .mp3, .wav, .m4a

- `POST /voice/process` - Process complaint
  ```json
  {
    "file_path": "string",
    "user_id": "number"
  }
  ```

### User Management
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update profile

## 📈 Monitoring

The application includes several monitoring features:
- Health Check endpoint (`/health`)
- Error Logging with levels
- Performance Metrics
- Rate Limit Monitoring
- File Upload Tracking

## 📄 License

[Your License]

## 🆘 Support

For support, email [your-email@example.com]
