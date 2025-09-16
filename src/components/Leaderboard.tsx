import React, { useEffect, useState } from "react";
import axios from "axios";

interface LeaderboardEntry {
  name: string;
  points: number;
  time_taken: number;
}

interface LeaderboardProps {
  userEmail: string;
  uniLogo: string;
  clubLogo: string;
}

export default function Leaderboard({ userEmail, uniLogo, clubLogo }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await axios.get("http://localhost:8000/leaderboard");
        setEntries(res.data);
      } catch {
        alert("Failed to load leaderboard");
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <header className="flex justify-between max-w-5xl w-full mb-8">
        <img src={uniLogo} alt="University Logo" className="h-12" />
        <img src={clubLogo} alt="Club Logo" className="h-12" />
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-purple-700">Leaderboard</h2>

        {entries.length === 0 ? (
          <p>No scores yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Points</th>
                <th className="py-2 px-4">Time (seconds)</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, idx) => (
                <tr key={idx} className={entry.name === userEmail ? "bg-yellow-100" : "bg-white"}>
                  <td className="border-b border-gray-300 py-2 px-4">{entry.name}</td>
                  <td className="border-b border-gray-300 py-2 px-4">{entry.points}</td>
                  <td className="border-b border-gray-300 py-2 px-4">{Math.round(entry.time_taken)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
