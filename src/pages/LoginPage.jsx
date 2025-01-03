import React from "react";
import LoginForm from "../components/LoginForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Container, PageHeader } from "../styles/commonStyles";

const LoginPage = () => {
  const handleLoginSubmit = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful!");
      // Redirect user to another page or show success message
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Container>
      <div>
        <PageHeader>Login</PageHeader>
        <LoginForm onSubmit={handleLoginSubmit} />
      </div>
    </Container>
  );
};

export default LoginPage;


// import React from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase/firebase";
// import { Container, PageHeader } from "../styles/commonStyles";
// import { useNavigate } from "react-router-dom";  // Import useNavigate
// import page2 from "../components/page2";
// const LoginPage = () => {
//   const navigate = useNavigate();  // Initialize useNavigate

//   const handleLoginSubmit = async (email, password) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log("Login successful!");
//       navigate("/app");  // Redirect to /app after successful login
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   };

//   return (
//     <Container>
//       <div>
//         <PageHeader>Login</PageHeader>
//         <LoginForm onSubmit={handleLoginSubmit} />
//       </div>
//     </Container>
//   );
// };

// export default LoginPage;
