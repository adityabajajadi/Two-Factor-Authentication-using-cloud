// Frontend Code (React with Animation Library - Confetti)
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const App = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const { width, height } = useWindowSize();

  const sendOtp = async () => {
    const response = await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    setResponseMessage(result.message);
  };

  const verifyOtp = async () => {
    const response = await fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const result = await response.json();
    setResponseMessage(result.message);
    if (result.message === "OTP verified successfully!") {
      setIsOtpVerified(true);
    }
  };

  useEffect(() => {
    if (isOtpVerified) {
      setTimeout(() => {
        window.location.href = '/'; // Replace '/' with your main page route
      }, 5000);
    }
  }, [isOtpVerified]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
      background: isOtpVerified ? "#282c34" : "#f5f5f5",
      color: isOtpVerified ? "#fff" : "#000",
    }}>
      {isOtpVerified && <Confetti width={width} height={height} />}
      {!isOtpVerified ? (
        <div style={{ textAlign: "center", maxWidth: "400px", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
          <h1>OTP Verification</h1>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "8px" }}>Enter your email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              style={{ padding: "10px", width: "100%", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <button
              onClick={sendOtp}
              style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Send OTP
            </button>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="otp" style={{ display: "block", marginBottom: "8px" }}>Enter OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter OTP"
              style={{ padding: "10px", width: "100%", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <button
              onClick={verifyOtp}
              style={{ padding: "10px 20px", background: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Verify OTP
            </button>
          </div>

          {responseMessage && <p style={{ color: responseMessage.includes("success") ? "green" : "red" }}>{responseMessage}</p>}
        </div>
      ) : (
        <h1 style={{ color: 'white' }}>Congratulations! OTP Verified Successfully!</h1>
      )}
    </div>
  );
};

export default App;
