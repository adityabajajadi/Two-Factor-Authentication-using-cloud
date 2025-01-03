import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import FPage3 from "E:\\project-1(login-page)\\src\\pages\\fpage3.jsx"; // Corrected path
import { useNavigate } from 'react-router-dom'; // Add this import

// Add these new styled components
const AdContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  position: absolute;
`;

const AdContent = styled.div`
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  text-align: center;
  max-width: 600px;
  color: #fff;
`;

const AdTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #ffa500, #ff6347);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AdPrice = styled.div`
  font-size: 3rem;
  margin: 20px 0;
  color: #ffa500;
  text-shadow: 0 0 10px rgba(255, 165, 0, 0.3);
`;

const AdFeatures = styled.ul`
  list-style: none;
  margin: 20px 0;
  padding: 0;
  li {
    margin: 10px 0;
    font-size: 1.2rem;
    &:before {
      content: "✨";
      margin-right: 10px;
    }
  }
`;

const AdButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  background: linear-gradient(45deg, #ffa500, #ff6347);
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 165, 0, 0.5);
  }
`;

const ParallaxText  = ({ texts, speed, stopParallax , textSwitchInterval = 5000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0); // Track the index of the current text
  const [offset, setOffset] = useState(0); // Track scroll offset
  const [isFaceRecognized, setIsFaceRecognized] = useState(false); // Track face recognition status
  const [progress, setProgress] = useState(0);
  const [showAd, setShowAd] = useState(false);

  // Handle scroll event only if stopParallax is false
  useEffect(() => {
    if (stopParallax) return; // Don't proceed if parallax is stopped

    const handleScroll = () => {
      setOffset(window.scrollY * speed); // Calculate offset based on scroll position and speed
    };

    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    // Clean up the event listener when component is unmounted or stopParallax changes
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, stopParallax]); // Depend on speed and stopParallax to re-run effect

  // Switch the current text every 5 seconds only if stopParallax is false
  useEffect(() => {
    if (stopParallax) return; // Don't change text if parallax is stopped

    const timer = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Change text every 5 seconds
    }, 5000);

    // Clear the interval when the component is unmounted or texts change
    return () => clearInterval(timer);
  }, [texts, stopParallax,  textSwitchInterval]); // Depend on texts and stopParallax

  const handleFaceRecognition = () => {
    // Simulate face recognition
    setIsFaceRecognized(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Add this effect for switching between content
  useEffect(() => {
    const contentTimer = setInterval(() => {
      setShowAd(prev => !prev);
    }, 15000); // Switch every 15 seconds

    return () => clearInterval(contentTimer);
  }, []);

  return (
    <div>
      <AnimatedBackground />
      <ParallaxWrapper
        style={{
          transform: `translateY(${offset}px)`, // Apply scroll offset to ParallaxWrapper
          transition: stopParallax ? "none" : "transform 0.1s ease-out",
        }}
      >
        <RightContentContainer style={{ opacity: showAd ? 0 : 1 }}>
          <ParallaxCard offset={offset * 0.5}>
            <TextItem>{texts[currentTextIndex]}</TextItem>
          </ParallaxCard>
        </RightContentContainer>
        <AdContainer isVisible={showAd}>
          <AdContent>
            <AdTitle>Enhance Your Security</AdTitle>
            <AdPrice>$199/year</AdPrice>
            <AdFeatures>
              <li>Advanced Face Recognition</li>
              <li>Multi-Factor Authentication</li>
              <li>24/7 Security Monitoring</li>
              <li>Unlimited User Access</li>
              <li>Enterprise-Grade Security</li>
            </AdFeatures>
            <AdButton onClick={() => window.location.href = '/purchase'}>
              Get Started Now
            </AdButton>
          </AdContent>
        </AdContainer>
        <FloatingElement style={{ top: '15%', right: '15%' }}>👤</FloatingElement>
        <FloatingElement style={{ top: '35%', right: '25%' }}>🔐</FloatingElement>
        <FloatingElement style={{ top: '55%', right: '15%' }}>🎯</FloatingElement>
        <FloatingElement style={{ top: '75%', right: '25%' }}>✨</FloatingElement>
        <FloatingElement style={{ top: '25%', right: '75%' }}>🔑</FloatingElement>
        <FloatingElement style={{ top: '45%', right: '65%' }}>🚀</FloatingElement>
        <FloatingElement style={{ top: '65%', right: '75%' }}>💫</FloatingElement>
        <FloatingElement style={{ top: '85%', right: '65%' }}>🌟</FloatingElement>
        <ProgressBar progress={progress} />
      </ParallaxWrapper>
    </div>
  );
};


// Update the styled components for FAQ
const FAQWidget = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #007bff, #00a8ff);
  color: white;
  padding: 15px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  transition: all 0.3s ease;
  font-size: 24px;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
  }
`;

const FAQPopup = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 9999; // Increase z-index
  max-width: 400px;
  backdrop-filter: blur(10px);
  transform: translateY(${props => props.show ? '0' : '20px'});
  opacity: ${props => props.show ? '1' : '0'};
  transition: all 0.3s ease;
  pointer-events: ${props => props.show ? 'all' : 'none'}; // Add this line
`;

const FAQTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #007bff;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FAQItem = styled.div`
  border-left: 3px solid #007bff;
  padding: 10px 15px;
  background: rgba(0, 123, 255, 0.05);
  border-radius: 0 8px 8px 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 123, 255, 0.1);
    transform: translateX(5px);
  }
`;

const FAQQuestion = styled.h5`
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 600;
`;

const FAQAnswer = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ParallaxWrapper = styled.div`
  position: relative;
  font-size: 2rem;
  font-weight: bold;
  color: #ff6347;
  transition: transform 0.1s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust based on your needs */
`;

const TextContainer = styled.div`
  position: fixed;
  width:1000px;
`;

const TextItem = styled.div`
  opacity: 1; // Changed from 0 to 1
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  line-height: 1.6;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 20px;
  
  // Remove the fadeIn/fadeOut animations if they're causing issues
  animation: glow 2s ease-in-out infinite;
  
  @keyframes glow {
    0% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); }
    50% { text-shadow: 0 0 20px rgba(255, 165, 0, 0.5); }
    100% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); }
  }
`;

const ParallaxCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 40px;
  margin: 20px auto;
  width: 100%;
  max-width: 800px;
  opacity: 1; // Ensure the card is visible
  transform: translateY(${props => props.offset}px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02) translateY(${props => props.offset}px);
    box-shadow: 0 0 30px rgba(255, 165, 0, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: transparent; // Change this line from the gradient to transparent
  opacity: 0.8;
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    
    animation: pulse 8s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  animation: float 6s ease-in-out infinite;
  opacity: 0.7;
  font-size: 2rem;
  filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.3));
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    transform: scale(1.2);
    filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.5));
  }
  
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 200px;
  height: 5px;
  background: rgba(255,255,255,0.2);
  border-radius: 5px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: #ffa500;
    transition: width 0.3s ease;
  }
`;

const RightContentContainer = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2; // Increase z-index to ensure content is above background
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Add these new styled components after your existing styled components
const FeedbackWidget = styled.div`
  position: absolute;
  top: 15px;
  left: 980px;
  z-index: 1001;
  cursor: pointer;
  padding: 10px;
  color: #fff;
  font-size: 3rem; // Increased from 2rem
  display: flex;
  align-items: center;
  gap: 8px;
  filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.3));
  
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.5));
  }
`;

const FeedbackContainer = styled.div`
  position: absolute;
  top: 70px;
  left: 850px;
  background: rgba(255, 255, 255, 0.95);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 350px;
  transform-origin: top right;
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0)'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FeedbackInput = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 15px;
  margin: 15px 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  resize: none;
  font-family: inherit;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  
  &:focus {
    outline: none;
    border-color: #ffa500;
    box-shadow: 0 0 10px rgba(255, 165, 0, 0.2);
  }
`;

const FeedbackButton = styled.button`
  
  padding: 8px 16px;
  background: linear-gradient(45deg, #ffa500, #ff6347);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 10px rgba(255, 165, 0, 0.3);
  }
`;

// Add these new styled components
const HamburgerMenu = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1001;
  cursor: pointer;
  padding: 10px;
  
  div {
    width: 30px;
    height: 3px;
    background: #fff;
    margin: 6px 0;
    border-radius: 3px;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(255, 165, 0, 0.3);
  }

  &:hover div {
    background: #ffa500;
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 10px 0;
  min-width: 200px;
  transform-origin: top right;
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0)'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease;
  z-index: 1000;
`;

const MenuItem = styled.div`
  color: #fff;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 165, 0, 0.2);
    padding-left: 25px;
  }
`;

const App = () => {
  const [step, setStep] = useState(0); // Start with welcome screen step
  const [mode, setMode] = useState(null); // Tracks 'Register' or 'Recognize'
  const [name, setName] = useState(""); // Stores the name for registration
  const [result, setResult] = useState(null); // Backend result
  const [error, setError] = useState(null); // Error messages
  const [cameraStarted, setCameraStarted] = useState(false); // Tracks if the camera is active
  const [isRecognizePressed, setIsRecognizePressed] = useState(false); // To disable button after recognition attempt
  const videoRef = useRef(null); // Reference to video element
  const canvasRef = useRef(null); // Reference to canvas for capturing images
  const [feedback, setFeedback] = useState("");
  const [showFAQ, setShowFAQ] = useState(false);
  const [stopParallax, setStopParallax] = useState(false); 
  const [isRecognitionSuccessful, setIsRecognitionSuccessful] = useState(false);
  const navigate = useNavigate(); // Add this hook
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add this to your App component's state

  const handleRecog = () => {
    // Your recognition logic here
    console.log("Recognition started...");

    // Stop the parallax effect when the handleRecog button is clicked
    setStopParallax(true);
  };

  // Start camera
  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraStarted(true);
        }
      })
      .catch((err) => {
        setError("Camera access is required.");
      });
  };
 
  const submitFeedback = () => {
    if (feedback.trim()) {
      alert("Thank you for your feedback!");
      setFeedback("");
    } else {
      alert("Please enter your feedback before submitting.");
    }
  };

  // FAQ toggle handler
  const toggleFAQ = () => {
    console.log('FAQ toggled', !showFAQ); // Add this for debugging
    setShowFAQ(prevState => !prevState);
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraStarted(false);
    }
  };

  // Capture image from the video
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg").split(",")[1]; // Base64 string
    }
    return null;
  };

  // Handle face registration
  const handleRegistration = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    const imageBase64 = captureImage();
    if (!imageBase64) {
      setError("Image capture failed. Please try again.");
      return;
    }
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/add-face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image: imageBase64 }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult("Registration successful!");
        stopCamera();
        setStep(3);
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (e) {
      setError("Server error during registration.");
    }
  };

  // Handle face recognition
  const handleRecognition = async () => {
    setIsRecognizePressed(true); // Disable the button after press
    const imageBase64 = captureImage();
    if (!imageBase64) {
      setError("Image capture failed. Please try again.");
      setIsRecognizePressed(false);
      return;
    }
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/recognize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      });
      const data = await response.json();
      if (response.ok && data.name) {
        setResult(`Welcome back, ${data.name}!`);
        setIsRecognitionSuccessful(true);
        stopCamera();
        // Redirect to FPage3 after successful recognition
        navigate('/fpage3');
      } else {
        setResult("Face not recognized.");
        setIsRecognitionSuccessful(false);
        setIsRecognizePressed(false);
      }
    } catch (e) {
      setError("Server error during recognition. Please try again.");
      setIsRecognitionSuccessful(false);
      setIsRecognizePressed(false);
    }
  };

  const resetProcess = () => {
    setStep(1);
    setMode(null);
    setName("");
    setResult(null);
    setError(null);
    setIsRecognizePressed(false); // Reset recognition button state
  };

  // Timeout for welcome page before showing options
  useEffect(() => {
    if (step === 0) {
      setTimeout(() => setStep(1), 10000); // Show the welcome screen for 5 seconds
    }
  }, [step]);

  // Inject the fade-in animation dynamically
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const fadeInKeyframes = `
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
    `;
    styleSheet.insertRule(fadeInKeyframes, styleSheet.cssRules.length);
  }, []);

  // Add this handler function
  const handleFeedbackSubmit = () => {
    if (feedbackText.trim()) {
      alert("Thank you for your feedback!");
      setFeedbackText("");
      setShowFeedback(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Section */}
      
      <div style={styles.left}>
      <div style={styles.logoContainer}>
      <LogoContainer>
      <LogoImage src="facial.png" alt="Logo" />

      <LogoText>Facial Authentication</LogoText>
      </LogoContainer>
      </div>
        <h1 style={styles.title}>Face Authentication</h1>
        {step === 0 && (
          <div style={styles.welcomeScreen}>
            <p>Welcome to the Face Authentication System!</p>
          </div>
        )}
        {step === 1 && (
          <div style={styles.optionSection}>
            <p>Step 1: What would you like to do?</p>
            <button
              onClick={() => {
                handleRecog();
                setMode("register");
                setStep(2);
                startCamera();
              }}
              style={styles.button}
            >
              Register as a New User
            </button>
            <button
              onClick={() => {
                handleRecog();
                setMode("recognize");
                setStep(2);
                startCamera();
              }}
              style={styles.button}
            >
              Recognize Face
            </button>
          </div>
        )}
        {step === 2 && mode === "register" && (
          <div style={styles.registerSection}>
            <p>Step 2: Enter Your Name</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
            <p>Step 3: Capture Your Face</p>
            <div style={styles.cameraWrapper}>
              <div style={styles.cameraBox}>
                <video ref={videoRef} autoPlay style={styles.video}></video>
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
              </div>
            </div>
            <button onClick={handleRegistration} style={styles.button}>
              Register Face
            </button>
          </div>
        )}
        {step === 2 && mode === "recognize" && (
          <div style={styles.recognizeSection}>
            <p>Step 2: Capture Your Face</p>
            <div style={styles.cameraWrapper}>
              <div style={styles.cameraBox}>
                <video ref={videoRef} autoPlay style={styles.video}></video>
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
              </div>
            </div>
            <button
              onClick={handleRecognition}
              style={styles.button}
              disabled={isRecognizePressed}
            >
              {isRecognizePressed ? "Processing..." : "Recognize Face"}
            </button>
          </div>
        )}
        {step === 3 && (
          <div style={styles.resultSection}>
            <p>Step 3: Result</p>
            {result && <p style={styles.result}>{result}</p>}
            {!isRecognitionSuccessful && (
              <button onClick={resetProcess} style={styles.button}>
                Try Again
              </button>
            )}
          </div>
        )}
        {error && <p style={styles.error}>{error}</p>}

        {/* Navigation Dots */}
        <div style={styles.navigationDots}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                ...(step === i ? styles.activeDot : {}),
              }}
            />
          ))}
        </div>
        

      </div>

      {/* Right Section */}
      <div style={styles.right}>
      <div style={styles.right}>
      <ParallaxWrapper>
      <ParallaxText
  texts={[
    "Imagine a world where your face alone grants you access.",
    "No more remembering passwords or dealing with login hassles.",
    "Just look and go, with face authentication.",
    "Technology is not just changing our world; it is transforming our reality.",
    "The future is not something we enter, it's something we create.",
    "Every step we take in technology brings us closer to unlocking human potential.",
    "The digital revolution is not coming; it's already here, reshaping the way we live.",
    "In the age of AI, the only limit to our progress is our imagination.",
    "Innovation is the spark that lights the fire of progress.",
    "What if every interaction you had could be personalized in real-time by AI?",
    "The lines between physical and digital spaces are fading; the future is hybrid.",
    "The ability to predict and understand human behavior will define the next century.",
    "The future of work is not about jobs; it's about empowerment through technology.",
    "In a world driven by data, insight becomes the currency of the future.",
    "Technology will make the impossible possible—it's just a matter of time.",
    "Artificial intelligence will not replace us, but it will redefine what we can achieve.",
    "With each innovation, we evolve beyond what we thought possible.",
    "The greatest breakthrough in human history may still lie ahead.",
    "Change is the only constant; the future is shaped by those who embrace it.",
    "In a future driven by data, knowledge will be the key to unlocking new realities.",
    "What if technology could understand our needs before we even speak them?",
    "The only limit to the future of technology is the human imagination.",
    "Imagine a world where the technology you use is so intuitive it fades into the background of your life.",
    "The future of communication is not just about sending messages, but about understanding each other without words.",
    "As technology advances, so does our ability to reach new heights, together."
  ]}
  speed={0.3} stopParallax={stopParallax} 
/></ParallaxWrapper>

</div>

        <div>
          {/* {step === 1 && <p>Choose an option to get started.</p>} */}
          {/*step === 2 && mode === "register" && <p>Register by capturing your face.</p>*/}
          {/*step === 2 && mode === "recognize" && <p>Recognize your face to continue.</p>*/}
          {/*step === 3 && <p>{result || "No match found."}</p>*/}
        </div>
        <FeedbackWidget onClick={() => setShowFeedback(!showFeedback)}>
          💭
        </FeedbackWidget>
        
        <FeedbackContainer isOpen={showFeedback}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '1.3rem' }}>Feedback</h3>
          <FeedbackInput
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Share your thoughts with us..."
          />
          <FeedbackButton onClick={handleFeedbackSubmit}>
            Submit Feedback
          </FeedbackButton>
        </FeedbackContainer>
        <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </HamburgerMenu>

        <MenuDropdown isOpen={isMenuOpen}>
          <MenuItem onClick={() => navigate('/dashboard')}>Dashboard</MenuItem>
          <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
          <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
          <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
        </MenuDropdown>
      </div>

      {/* Move FAQ Widget here, outside of left section */}
      <FAQWidget onClick={toggleFAQ}>?</FAQWidget>
      {showFAQ && (
        <FAQPopup show={showFAQ}>
          <FAQTitle>Frequently Asked Questions</FAQTitle>
          <FAQList>
            <FAQItem>
              <FAQQuestion>Why use facial authentication?</FAQQuestion>
              <FAQAnswer>
                Facial authentication provides a secure, convenient, and touchless way to verify your identity. It's faster than traditional methods and harder to compromise.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>How secure is this feature?</FAQQuestion>
              <FAQAnswer>
                Our system uses advanced AI and deep learning algorithms to ensure high accuracy and prevent spoofing attempts. Your facial data is encrypted and securely stored.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>What happens to my facial data?</FAQQuestion>
              <FAQAnswer>
                Your facial data is encrypted, stored securely, and never shared with third parties. You can request deletion of your data at any time.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>What if my face isn't recognized?</FAQQuestion>
              <FAQAnswer>
                Don't worry! You can always try again with better lighting and a clear face position, or use alternative authentication methods.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Can someone use my photo to login?</FAQQuestion>
              <FAQAnswer>
                No, our system includes liveness detection to ensure that only real, present faces can authenticate, preventing photo-based attacks.
              </FAQAnswer>
            </FAQItem>
          </FAQList>
        </FAQPopup>
      )}
    </div>
  );
};

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;  // Adjust the distance from the top of the page
  left: 20px; // Adjust the distance from the left of the page
  display: flex;
  align-items: center;
  z-index: 1000; // Ensure the logo is always visible on top of other content
`;

// Styled component for the logo text with gradient and glow effect
const LogoText = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-left: 5px;
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

// Styled component for the logo image
const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0); /* Subtle shadow effect */
  }
`;

// Styles (with glowing effect on left section boundary)
const styles = {
 
  container: {
    display: "flex",
    height: "100vh",
    opacity: 0, // Start with the container hidden
    animation: "fadeIn 1s forwards", // Apply fade-in effect to the entire container
    backgroundImage: "url('background.jpg')", // Add a background image
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  left: {
    flex: 1,
    boxShadow: "0 0 15px rgba(255, 165, 0, 0.7)",
    backgroundColor: "rgba(244, 244, 249, 0.9)", // Add slight transparency
    borderRight: "5px solid #ffa500",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    opacity: 0,
    animation: "fadeIn 1.5s forwards",
    animationDelay: "0.5s",
  },
  right: {
    flex: 1,
    backgroundColor: "rgba(127, 231, 225, 0.91)", // Change this line from rgba(173, 216, 230, 0.9) to transparent
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    opacity: 0,
    animation: "fadeIn 1.5s forwards",
    animationDelay: "0.7s",
  },
  title: {
    fontSize: "2.5rem", // Slightly larger title
    marginBottom: "20px",
    color: "#ffa500", // Title color matching glow effect
    animation: "fadeIn 2s forwards",
    animationDelay: "1s",
  },
  button: {
    margin: "10px",
    padding: "12px 24px", // Adjust padding for a better feel
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    backgroundColor: "#ffa500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 0 10px rgba(255, 165, 0, 0.7)", // Glow effect on buttons
    opacity: 0,
    animation: "fadeIn 1.5s forwards",
    animationDelay: "1.2s",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "80%",
    opacity: 0,
    animation: "fadeIn 1.5s forwards",
    animationDelay: "1.4s",
  },
  welcomeScreen: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#333",
    opacity: 0,
    animation: "fadeIn 2s forwards",
    animationDelay: "0.5s",
  },
  result: {
    fontSize: "1.2rem",
    color: "#333",
    opacity: 0,
    animation: "fadeIn 2s forwards",
    animationDelay: "1.6s",
  },
  navigationDots: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    opacity: 0,
    animation: "fadeIn 1.5s forwards",
    animationDelay: "1.8s",
  },
  dot: {
    width: "10px",
    height: "10px",
    margin: "0 5px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
    transition: "all 0.3s ease",
  },
  activeDot: {
    backgroundColor: "#ffa500",
    boxShadow: "0 0 10px #ffa500",
  },
  error: {
    color: "red",
    marginTop: "10px",
    opacity: 0,
    animation: "fadeIn 2s forwards",
    animationDelay: "2s",
  },
  cameraWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
    opacity: 0,
    animation: "fadeIn 2s forwards",
    animationDelay: "1.2s",
  },
  cameraBox: {
    width: "50%",
    height: "auto",
    justifyContent: "center",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "20px",
    boxShadow: "0 0 15px rgba(255, 165, 0, 0.7)",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  canvas: {
    display: "none",
  },
};

export default App;

