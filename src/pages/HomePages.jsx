import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa"; // Import dropdown icon from React Icons

// Import images from the system
import FacialImage from "E:\\project-1(login-page)\\src\\pages\\Facial.jpg"; // Adjust the path as per your project structure
import LogoImage from "E:\\project-1(login-page)\\src\\pages\\facial.png";    // Adjust the path as per your project structure

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
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

const HomePageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPartition = styled.div`
  flex: 1;
  background: url(${FacialImage}) no-repeat center center;
  background-size: cover;
`;

const RightPartition = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f9;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 20px;
  margin-left:30px;
  padding: 0 20px;
`;

const Logo = styled.img`
  height: 50px;
  cursor: pointer;
   &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0); /* Subtle shadow effect */
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.div`
  font-size: 24px;
  color: #333;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e8e8e8;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 10px; /* Adjusted from -20px to 10px to bring it within view */
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 10;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 30px;
  text-align: center;
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  font-size: 18px;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; /* Space between buttons */
`;

const HomePage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <HomePageContainer>
      {/* Left Partition */}
      <LeftPartition />

      {/* Right Partition */}
      <RightPartition>
        {/* Header with Logo and Dropdown */}
        <Header>
          <LogoContainer>
            {/* Wrap Logo image with Link to Home page */}
            <Link to="/">
              <Logo src={LogoImage} alt="Logo" />
            </Link>
            <LogoText>Facial Recognition</LogoText>
          </LogoContainer>
          <DropdownContainer>
            <DropdownButton onClick={toggleDropdown}>
              <FaBars /> {/* Dropdown icon */}
            </DropdownButton>
            <DropdownMenu isOpen={dropdownOpen}>
              <DropdownItem to="/support">Support</DropdownItem>
              <DropdownItem to="/services">Services</DropdownItem>
            </DropdownMenu>
          </DropdownContainer>
        </Header>

        {/* Main Content */}
        <Title>Welcome to the Official Website</Title>
        <Description>Please log in or sign up to continue to use our Services.</Description>
        <ButtonContainer>
          <Link to="/login">
            <StyledButton>Login</StyledButton>
          </Link>
          <Link to="/signup">
            <StyledButton>Signup</StyledButton>
          </Link>
        </ButtonContainer>
      </RightPartition>
    </HomePageContainer>
  );
};

export default HomePage;
