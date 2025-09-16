import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

// Components
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Leaderboard from "./components/Leaderboard";

// Data
import { questions } from "./data/questions";

// Define types directly in App.tsx to avoid import issues
interface User {
  user_id: string;
  email: string;
  name: string;
  picture?: string;
}

type AppStep = "login" | "quiz" | "result" | "leaderboard";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [hasTakenQuiz, setHasTakenQuiz] = useState(false);
  const [step, setStep] = useState<AppStep>("login");
  const [points, setPoints] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Google Client ID from environment
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Check quiz status when user logs in
  useEffect(() => {
    if (user) {
      checkQuizStatus();
    }
  }, [user]);

  const checkQuizStatus = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/user/has-taken-quiz`, {
        params: { user_email: user.email },
      });
      
      setHasTakenQuiz(res.data.has_taken);
      setStep(res.data.has_taken ? "leaderboard" : "quiz");
    } catch (err) {
      console.error("Failed to check quiz status:", err);
      setError("Failed to check quiz status. Please try again.");
      setStep("quiz"); // Default to quiz if check fails
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setError(null);
  };

  const handleQuizComplete = (pts: number, time: number) => {
    setPoints(pts);
    setTimeTaken(time);
    setStep("result");
  };

  const handleResultSubmitted = () => {
    setHasTakenQuiz(true);
    setStep("leaderboard");
  };

  const handleRetry = () => {
    setError(null);
    if (user) {
      checkQuizStatus();
    } else {
      setStep("login");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
          <p className="text-purple-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show Google Client ID error
  if (!googleClientId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">🔧</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Configuration Error</h2>
          <p className="text-gray-600 mb-6">Google Client ID is missing. Please check your environment configuration.</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="min-h-screen">
        {step === "login" && (
          <Login 
            onLogin={handleLogin} 
            hasTakenQuiz={hasTakenQuiz} 
            uniLogo="/assets/uni_logo.svg" 
            clubLogo="/assets/club_logo.svg" 
          />
        )}
        
        {step === "quiz" && (
          <Quiz 
            questions={questions} 
            onComplete={handleQuizComplete} 
            uniLogo="/assets/uni_logo.svg" 
            clubLogo="/assets/club_logo.svg" 
          />
        )}
        
        {step === "result" && user && (
          <Result 
            userId={user.user_id} 
            points={points} 
            timeTaken={timeTaken} 
            onSubmitted={handleResultSubmitted} 
            uniLogo="/assets/uni_logo.svg" 
            clubLogo="/assets/club_logo.svg" 
          />
        )}
        
        {step === "leaderboard" && user && (
          <Leaderboard 
            userEmail={user.email} 
            uniLogo="/assets/uni_logo.svg" 
            clubLogo="/assets/club_logo.svg" 
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;