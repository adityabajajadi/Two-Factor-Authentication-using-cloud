import React from "react";
import SignUpForm from "../components/SignUpForm"; // Import the SignUpForm component
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Firebase authentication
import { Container, PageHeader, FormContainer } from "../styles/commonStyles"; // Styles for the page

const SignUpPage = () => {
  // Handle sign-up form submission
  const handleSignUpSubmit = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Sign-up successful!");
      // Redirect or show success message
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <Container>
      <FormContainer>
        <PageHeader>Sign Up</PageHeader>
        <SignUpForm onSubmit={handleSignUpSubmit} /> {/* Pass the handler function */}
      </FormContainer>
    </Container>
  );
};

export default SignUpPage;
