import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { FormBox, Input, Button, ErrorMessage, PageHeader, Container } from "../styles/commonStyles"; // Fixed imports
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import logo image
import LogoImage from "E:\\project-1(login-page)\\src\\pages\\facial.png"; // Adjust path accordingly

// Styled components for the header
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 20px;
  background-color: #f4f4f9;
  position: absolute; /* Position it at the top */
  top: 0; /* Align it at the top */
  left: 0;
  z-index: 10;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 50px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    text-shadow: 0px 0px 10px rgba(255, 140, 0, 0.8);
  }
`;

const LogoText = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-left: 15px;
  background: linear-gradient(90deg, #ff8c00, #ff6347); /* Gradient effect */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  transition: transform 0.3s, text-shadow 0.3s;

  &:hover {
    transform: scale(1.1);
    text-shadow: 0px 0px 10px rgba(255, 140, 0, 0.8);
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false); // State to show notification
  const [notificationMessage, setNotificationMessage] = useState(""); // To set the message dynamically
  const [notificationType, setNotificationType] = useState(""); // To differentiate success/error notifications
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user);
      setError(""); // Clear any error

      // Show success notification
      setNotificationMessage("Login successful! Redirecting...");
      setNotificationType("success"); // Set notification type to success
      setShowNotification(true);

      // Wait for 2 seconds before redirecting to an empty page
      setTimeout(() => {
        setShowNotification(false); // Hide notification
         navigate("/app"); // Redirect to empty page
      }, 2000); // 2000ms = 2 seconds delay
    } catch (error) {
      setNotificationMessage("Invalid email or password. Please try again.");
      setNotificationType("error"); // Set notification type to error
      setShowNotification(true);
    }
  };

  return (
    <Container>
      {/* Header with Logo and Text */}
      <Header>
        <LogoContainer>
          {/* Wrap Logo image with Link to Home page */}
          <Link to="/">
            <Logo src={LogoImage} alt="Logo" />
          </Link>
          <LogoText>Facial Recognition</LogoText>
        </LogoContainer>
      </Header>

      {/* Form Box */}
      <FormBox style={{ marginTop: "100px" }}> {/* Added marginTop to push the form down */}
        <PageHeader>Login</PageHeader>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </form>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {/* Notification Message */}
        {showNotification && (
          <div style={styles.notification(notificationType)}>
            <p>{notificationMessage}</p>
          </div>
        )}
      </FormBox>
    </Container>
  );
};

const styles = {
  notification: (type) => ({
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: type === "success" ? "#4caf50" : "#f44336", // Green for success, Red for error
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    animation: "fadeIn 1s ease-out", // Add animation for fade-in effect
  }),
};

export default LoginForm;
