// Backend Code (Node.js + Express + SendGrid)
const express = require('express');
const bodyParser = require('body-parser');
const sendgrid = require('@sendgrid/mail');
const cors = require('cors');

const app = express();
const port = 5000;

sendgrid.setApiKey('');

// In-memory store for OTPs
const otpStore = {};

app.use(cors());
app.use(bodyParser.json());

// Route to send OTP
app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in memory
    otpStore[email] = otp;

    const message = {
        to: email,
        from: 'poonam81175@gmail.com', // Replace with your SendGrid verified sender email
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    sendgrid.send(message)
        .then(() => {
            res.json({ message: 'OTP sent successfully!' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Failed to send OTP.' });
        });
});

// Route to verify OTP
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    if (otpStore[email] === otp) {
        delete otpStore[email]; // Clear OTP after successful verification
        res.json({ message: 'OTP verified successfully!' });
    } else {
        res.status(400).json({ message: 'Invalid OTP.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
