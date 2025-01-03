// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // exports.helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });

// Import necessary modules
// Importing required functions from Firebase and Firebase Functions
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
admin.initializeApp();

// Firebase Cloud Messaging (FCM) setup for sending notifications
const messaging = admin.messaging();

// Function to send push notifications to a specific user
exports.sendPushNotification = onRequest(async (req, res) => {
  try {
    const {token, title}=req.body;
    if (!token||!title) {
      return res.status(400).send("Token, title, and body are required.");
    }

    // Constructing the message payload
    const message = {
      notification: {
        title: title,
      },
      token: token,
    };

    // Sending the message using Firebase Cloud Messaging
    const response = await messaging.send(message);
    logger.info("Successfully sent message:", response);
    return res.status(200).send("Notification sent successfully.");
  } catch (error) {
    logger.error("Error sending notification:", error);
    return res.status(500).send("Failed to send notification.");
  }
});
