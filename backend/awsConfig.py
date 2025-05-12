import boto3
import os
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get AWS credentials from environment variables
AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_BUCKET_NAME = os.getenv('AWS_BUCKET_NAME', 'one-piece-store')
AWS_REGION = os.getenv('AWS_REGION', 'us-east-2')

# Create an S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)

def upload_to_s3(file, bucket_name, object_name=None):
    """Upload a file to an S3 bucket."""
    if object_name is None:
        object_name = file.filename

    try:
        s3_client.upload_fileobj(file, bucket_name, object_name)
        return f"File uploaded successfully to {bucket_name}/{object_name}"
    except NoCredentialsError:
        return "Credentials not available"
    except PartialCredentialsError:
        return "Incomplete credentials provided"
    except Exception as e:
        return f"An error occurred: {e}"
