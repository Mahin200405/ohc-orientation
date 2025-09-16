// import React from "react";
import axios from "axios";

interface ResultProps {
  userId: string;
  points: number;
  timeTaken: number;
  onSubmitted: () => void;
  uniLogo: string;
  clubLogo: string;
}

export default function Result({ userId, points, timeTaken, onSubmitted, uniLogo, clubLogo }: ResultProps) {
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/result", {
        user_id: userId,
        points,
        time_taken: timeTaken,
      });
      alert("Result submitted!");
      onSubmitted();
    } catch {
      alert("Failed to submit result.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <header className="flex justify-between max-w-4xl w-full mb-8">
        <img src={uniLogo} alt="University Logo" className="h-12" />
        <img src={clubLogo} alt="Club Logo" className="h-12" />
      </header>

      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Quiz Completed!</h2>
        <p className="text-xl mb-2">Points: {points}</p>
        <p className="text-xl mb-8">Time Taken: {Math.round(timeTaken)} seconds</p>

        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded font-semibold"
          type="button"
        >
          Submit Results
        </button>
      </div>
    </div>
  );
}
