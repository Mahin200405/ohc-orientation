// User related types
export interface User {
  user_id: string;
  email: string;
  name: string;
  picture?: string;
}

// Question related types
export interface QuestionOption {
  text: string;
  image?: string;
}

export interface Question {
  id: string;
  q: string;
  image?: string; // Optional question image
  a: string[] | QuestionOption[]; // Support both simple strings and image options
  c: number; // Correct answer index
  points?: number; // Optional points for this question
}

// App state types
export type AppStep = "login" | "quiz" | "result" | "leaderboard";