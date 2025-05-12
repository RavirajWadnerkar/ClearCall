from twilio.rest import Client
import json
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Twilio credentials from environment variables
account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
client = Client(account_sid, auth_token)

# Phone number to filter by (E.164 format)
phone_number = os.getenv('TWILIO_PHONE_NUMBER')

# Fetch call logs
calls = client.calls.list(to=phone_number)

# Get the current month and year for filtering
current_month = datetime.now().month
current_year = datetime.now().year

# Filter only completed calls
completed_calls = [
    {
        "from": call._from,
        "to": call.to,
        "status": call.status,
        "duration": call.duration,
        "start_time": str(call.start_time),
        "sid": call.sid
    }
    for call in calls
        if call.status == "completed" and call.start_time.month == current_month and call.start_time.year == current_year
]

# Save to JSON file
with open('completed_calls.json', 'w') as f:
    json.dump(completed_calls, f, indent=4)

print(f"Exported {len(completed_calls)} completed calls to completed_calls.json")
