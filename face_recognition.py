import boto3
from io import BytesIO
import os

# Set AWS credentials directly in the code (DO NOT hardcode in production)
aws_access_key_id = 'AKIAWMFUPGXZF7DDXZ4C'
aws_secret_access_key = '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'
region_name = 'us-east-1'

# Initialize the Rekognition client with the credentials
rekognition_client = boto3.client(
    'rekognition',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name
)

# Function to create a collection
def create_collection(collection_id):
    try:
        response = rekognition_client.create_collection(CollectionId=collection_id)
        print(f"Collection '{collection_id}' created successfully.")
        return response
    except rekognition_client.exceptions.ResourceAlreadyExistsException:
        print(f"Collection '{collection_id}' already exists.")
        return None

# Function to add a face to the collection
def add_face_to_collection(image_bytes, collection_id, name):
    try:
        response = rekognition_client.index_faces(
            CollectionId=collection_id,
            Image={'Bytes': image_bytes},
            ExternalImageId=name,
            DetectionAttributes=['ALL']
        )
        print(f"Added face to collection '{collection_id}' with ID {response['FaceRecords'][0]['Face']['FaceId']}")
        return response
    except Exception as e:
        print(f"Error adding face: {e}")
        return None

# Function to compare detected faces with faces in the collection
def compare_faces(collection_id, image_bytes):
    try:
        response = rekognition_client.search_faces_by_image(
            CollectionId=collection_id,
            Image={'Bytes': image_bytes},
            MaxFaces=1,
            FaceMatchThreshold=95
        )
        if response['FaceMatches']:
            matched_face = response['FaceMatches'][0]['Face']
            return matched_face['ExternalImageId']
        else:
            return None
    except Exception as e:
        print(f"Error comparing faces: {e}")
        return None

# Function to detect faces from an image
def detect_faces(image_bytes):
    try:
        response = rekognition_client.detect_faces(
            Image={'Bytes': image_bytes},
            Attributes=['ALL']
        )
        return response
    except Exception as e:
        print(f"Error detecting faces: {e}")
        return None
