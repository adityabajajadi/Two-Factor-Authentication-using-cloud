# config/aws_config.py

import boto3

# Your AWS credentials (replace with your actual credentials)
aws_access_key_id = 'AKIAWMFUPGXZF7DDXZ4C'
aws_secret_access_key = 'Rc74CYQcixvg3TrlsxtfH2dSOD79pFATRjtyx+Uc'
region_name = 'us-east-1'

# Initialize the Rekognition client
rekognition_client = boto3.client(
    'rekognition',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name
)
