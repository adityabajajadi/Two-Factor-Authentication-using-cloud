import styled from "styled-components";

// Centered container with a background color
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f9;
  font-family: 'Arial', sans-serif;
  padding: 0 20px;
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
`;

// Shared box for the form, will be used for both login and sign-up
export const FormBox = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Common form input
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

// Button style for form submission
export const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

// Error message style
export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

// Page Header for both login and sign-up pages
export const PageHeader = styled.h2`
  color: #333;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;


// --- Custom Styling for SignUpPage ---
// Additional styling can be added specifically for SignUpPage if needed
export const SignUpPageHeader = styled(PageHeader)`
  color: #1e90ff; /* Different color for Sign-Up page */
`;


// --- Custom Styling for LoginPage ---
// Additional styling can be added specifically for LoginPage if needed
export const LoginPageHeader = styled(PageHeader)`
  color: #ff6347; /* Different color for Login page */
`;
  