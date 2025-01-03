import React, { useState } from "react";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { FormBox, Input, Button, PageHeader, Container } from "../styles/commonStyles";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LogoImage from "E:\\project-1(login-page)\\src\\pages\\facial.png"; // Adjust path accordingly
import styled from "styled-components";

// Styled components for the header
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 20px;
  background-color: #f4f4f9;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  height: 80px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
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
  background: linear-gradient(90deg, #ff8c00, #ff6347);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  transition: transform 0.3s, text-shadow 0.3s;

  &:hover {
    transform: scale(1.1);
    text-shadow: 0px 0px 10px rgba(255, 140, 0, 0.8);
  }
`;

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false); // Initially false
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = async (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);

    // Regular expression for validating email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check for valid email format
    if (!emailRegex.test(emailInput)) {
      setIsEmailValid(false); // Email is invalid if format is wrong
      setError("Please enter a valid email.");
    } else {
      setIsEmailValid(true); // Email is valid, but we need to check if it's already registered
      setError(""); // Clear error if format is valid
      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, emailInput);
        if (signInMethods.length > 0) {
          setError("Email is already registered. Please use another email.");
          setIsEmailValid(false); // Invalid if email is already registered
        } else {
          setError("");
        }
      } catch (error) {
        setError("Error checking email.");
        setIsEmailValid(false);
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (!isEmailValid || !email || !password) {
      setError("Please provide a valid, unregistered email and password.");
      return;
    }
  
    try {
      // Attempt to create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user);
  
      // Clear error and show success notification
      setError("");
      setShowNotification(true);
  
      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        setShowNotification(false); // Hide notification
        navigate("/login"); // Redirect to login page
      }, 3000);
    } catch (firebaseError) {
      // Handle Firebase errors more robustly
      if (firebaseError.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please use another email.");
      } else {
        setError("Error creating account. Please try again.");
      }
  
      // Show error notification
      setShowNotification(true);
  
      // Wait for a few seconds to display error notification
      setTimeout(() => {
        setShowNotification(false); // Hide the notification
      }, 3000);
    }
  };
  

  // Function to handle logo click (Redirect to homepage)
  const handleLogoClick = () => {
    navigate("/"); // Redirect to homepage (assuming it's "/")
  };

  return (
    <Container>
      {/* Logo and Text at the top of the page */}
      <Header>
        <LogoContainer onClick={handleLogoClick}>
          <Logo src={LogoImage} alt="Logo" />
          <LogoText>Facial Recognition</LogoText>
        </LogoContainer>
      </Header>

      <FormBox>
        <PageHeader>Signup</PageHeader>

        {/* Email input */}
        <form onSubmit={handleSignup}>
          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {/* Display error message below email input if email is invalid */}
          {!isEmailValid && email && (
            <div style={styles.errorText}>{error}</div>
          )}

          {/* Only show the password field if email is valid */}
          {isEmailValid && (
            <>
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit">Signup</Button>
            </>
          )}
        </form>

        {/* Notification Message */}
        {showNotification && (
          <div
            style={{
              ...styles.notification,
              backgroundColor: error === "This account already exists" ? "#f44336" : "#4caf50",
            }}
          >
            <p>{error ? error : "Signup successful! Redirecting to Login..."}</p>
          </div>
        )}
      </FormBox>
    </Container>
  );
};

const styles = {
  notification: {
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    animation: "fadeIn 1s ease-out",
  },
  errorText: {
    marginTop: "5px",
    fontSize: "12px",
    color: "#f44336", // Red color for the error text
  },
};

export default SignupForm;
