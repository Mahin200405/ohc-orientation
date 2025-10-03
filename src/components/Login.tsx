// import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import axios from "axios";

interface LoginProps {
  onLogin: (user: any) => void;
  hasTakenQuiz: boolean;
  uniLogo: string;
  clubLogo: string;
}

export default function Login({ onLogin, hasTakenQuiz, uniLogo, clubLogo }: LoginProps) {
  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) return alert("Google login failed");
    try {
      const res = await axios.post("https://ohc-backend.onrender.com/auth/google", {
        token: response.credential,
      });
      onLogin(res.data);
    } catch {
      alert("Backend login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <header className="flex justify-between max-w-4xl w-full mb-10">
        <img src={uniLogo} alt="University Logo" className="h-12" />
        <img src={clubLogo} alt="Club Logo" className="h-12" />
      </header>

      <h1 className="text-4xl font-extrabold text-purple-700 mb-8">Club Orientation Quiz</h1>

      {hasTakenQuiz ? (
        <p className="text-red-600 font-semibold">You have already taken the quiz. Please check the leaderboard.</p>
      ) : (
        <GoogleLogin onSuccess={handleSuccess} onError={() => alert("Google login failed")} />
      )}
    </div>
  );
}
