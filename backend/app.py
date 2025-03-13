from flask import Flask, request, jsonify
import boto3
import json
import pymysql
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def read_secret():
    with open('./secrets.json') as f:
        secrets = json.load(f)
    return secrets

# AWS Configuration


# Initialize AWS Clients
iam_client = boto3.client("iam", region_name=AWS_REGION)
s3_client = boto3.client("s3", region_name=AWS_REGION)

def create_iam_user_group(plan):
    """Create an IAM User Group if it doesn't exist"""
    group_name = f"UserGroup-{plan}"
    try:
        iam_client.get_group(GroupName=group_name)
    except iam_client.exceptions.NoSuchEntityException:
        iam_client.create_group(GroupName=group_name)
    return group_name

def add_user_to_group(email, plan):
    """Add a user to an IAM group"""
    group_name = create_iam_user_group(plan)
    try:
        iam_client.create_user(UserName=email)
    except iam_client.exceptions.EntityAlreadyExistsException:
        pass  # User already exists
    iam_client.add_user_to_group(GroupName=group_name, UserName=email)

def create_s3_user_folder(email):
    """Create a user-specific folder in S3"""
    folder_name = f"{email}/"
    s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=folder_name)

def insert_user_into_rds(email, plan):
    """Insert user into RDS database"""
    connection = pymysql.connect(host=RDS_HOST, user=RDS_USER, password=RDS_PASSWORD, database=RDS_DB)
    cursor = connection.cursor()
    cursor.execute("INSERT INTO users (email, plan) VALUES (%s, %s)", (email, plan))
    connection.commit()
    connection.close()

@app.route('/')
def home():
    return jsonify({"message": "Backend is running!"})

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    plan = data.get("plan")
    if not email or plan not in ["Basic", "Pro", "Enterprise"]:
        return jsonify({"error": "Invalid email or plan"}), 400
    
    add_user_to_group(email, plan)
    create_s3_user_folder(email)
    insert_user_into_rds(email, plan)
    
    return jsonify({"message": "User signed up successfully", "email": email, "plan": plan})

if __name__ == "__main__":
    app.run(debug=True)
