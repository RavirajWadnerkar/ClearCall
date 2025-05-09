# Update the database configuration to pull values from the .env file
from dotenv import load_dotenv
load_dotenv()

db_config = {
    "host": os.getenv('DB_HOST', 'localhost'),
    "user": os.getenv('DB_USER', 'root'),
    "password": os.getenv('DB_PASSWORD', ''),
    "database": os.getenv('DB_NAME', 'clearcall'),
    "port": int(os.getenv('DB_PORT', 3306))
}