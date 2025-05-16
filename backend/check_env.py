import os
from dotenv import load_dotenv

def check_environment_variables():
    """Check if all required environment variables are set."""
    load_dotenv()
    
    required_vars = {
        'JWT': ['JWT_SECRET_KEY'],
        'Database': ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT'],
        'AWS': ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_BUCKET_NAME', 'AWS_REGION'],
        'OpenAI': ['OPENAI_API_KEY'],
        'Twilio': ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_PHONE_NUMBER']
    }
    
    missing_vars = {}
    
    for category, vars in required_vars.items():
        missing = [var for var in vars if not os.getenv(var)]
        if missing:
            missing_vars[category] = missing
    
    if missing_vars:
        print("\n❌ Missing environment variables:")
        for category, vars in missing_vars.items():
            print(f"\n{category}:")
            for var in vars:
                print(f"  - {var}")
        return False
    
    print("\n✅ All required environment variables are set!")
    return True

if __name__ == "__main__":
    check_environment_variables() 