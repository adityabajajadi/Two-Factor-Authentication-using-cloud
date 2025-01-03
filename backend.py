import os
import base64
import io
import uuid
from PIL import Image
import numpy as np
import cv2
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import dlib

# AWS Rekognition and Face Detection Setup
rekognition_client = boto3.client('rekognition', region_name='us-east-1')
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("E:\project-2(face-authentication)\public\shape_predictor_68_face_landmarks.dat")

# Constants
COLLECTION_ID = "FaceRecognitionCollection"
UPLOAD_FOLDER = 'faces'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
CORS(app)

def image_to_bytes(image):
    """Convert PIL Image to bytes for AWS Rekognition"""
    with io.BytesIO() as byte_io:
        image.save(byte_io, format="JPEG")
        byte_io.seek(0)
        return byte_io.read()

def detect_face_quality(image_bytes):
    """Additional face quality check"""
    try:
        response = rekognition_client.detect_faces(
            Image={'Bytes': image_bytes},
            Attributes=['ALL']
        )
        
        if not response['FaceDetails']:
            return False
        
        face = response['FaceDetails'][0]
        
        # Quality checks
        confidence = face.get('Confidence', 0)
        pose = face.get('Pose', {})
        
        return (
            confidence > 80 and 
            abs(pose.get('Yaw', 0)) < 30 and 
            abs(pose.get('Pitch', 0)) < 30
        )
    except Exception as e:
        print(f"Face detection error: {e}")
        return False

def compare_faces_in_collection(image_bytes):
    """Compare face with existing collection"""
    try:
        response = rekognition_client.search_faces_by_image(
            CollectionId=COLLECTION_ID,
            Image={'Bytes': image_bytes},
            MaxFaces=1,
            FaceMatchThreshold=85
        )
        
        if response['FaceMatches']:
            return response['FaceMatches'][0]['Face']['ExternalImageId']
        return None
    except Exception as e:
        print(f"Face comparison error: {e}")
        return None

@app.route('/recognize', methods=['POST'])
def recognize_face():
    try:
        # Decode base64 image
        image_data = base64.b64decode(request.json['image'])
        image = Image.open(io.BytesIO(image_data))
        
        # Convert to bytes for AWS Rekognition
        image_bytes = image_to_bytes(image)
        
        # Check face quality
        if not detect_face_quality(image_bytes):
            return jsonify({'error': 'Poor face image quality'}), 400
        
        # Perform face recognition
        matched_name = compare_faces_in_collection(image_bytes)
        
        if matched_name:
            return jsonify({'name': matched_name})
        else:
            return jsonify({'name': None})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/add-face', methods=['POST'])
def add_new_face():
    try:
        name = request.json['name']
        image_data = base64.b64decode(request.json['image'])
        image = Image.open(io.BytesIO(image_data))
        
        # Convert to bytes for AWS Rekognition
        image_bytes = image_to_bytes(image)
        
        # Check face quality
        if not detect_face_quality(image_bytes):
            return jsonify({'status': 'error', 'message': 'Poor face image quality'}), 400
        
        # Save image with unique filename
        filename = os.path.join(UPLOAD_FOLDER, f"{name}_{uuid.uuid4()}.jpg")
        image.save(filename)
        
        # Add to Rekognition collection
        rekognition_client.index_faces(
            CollectionId=COLLECTION_ID,
            Image={'Bytes': image_bytes},
            ExternalImageId=name,
            DetectionAttributes=['ALL']
        )
        
        return jsonify({'status': 'success', 'message': 'Face added successfully'})
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/create-collection', methods=['POST'])
def create_collection():
    try:
        # Try to describe collection, if not exists, create it
        try:
            rekognition_client.describe_collection(CollectionId=COLLECTION_ID)
            return jsonify({'status': 'exists', 'message': 'Collection already exists'})
        except rekognition_client.exceptions.ResourceNotFoundException:
            rekognition_client.create_collection(CollectionId=COLLECTION_ID)
            return jsonify({'status': 'success', 'message': 'Collection created successfully'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    # Ensure collection exists on startup
    try:
        rekognition_client.describe_collection(CollectionId=COLLECTION_ID)
    except rekognition_client.exceptions.ResourceNotFoundException:
        rekognition_client.create_collection(CollectionId=COLLECTION_ID)
    
    app.run(debug=True, port=5000)