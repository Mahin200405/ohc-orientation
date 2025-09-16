// Add this to the top of your Quiz.tsx component
import  { useState, useEffect } from "react";
import type { Question, QuestionOption } from "../types";

interface QuizProps {
  questions: Question[];  // Updated to use the new Question type
  onComplete: (points: number, time: number) => void;
  uniLogo: string;
  clubLogo: string;
}

export default function Quiz({ questions, onComplete, uniLogo, clubLogo }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  
  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleQuizEnd();
    }
  }, [timeLeft]);

  const handleQuizEnd = () => {
    const timeTaken = (Date.now() - startTime) / 1000;
    onComplete(score, timeTaken);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const currentQ = questions[currentQuestion];
    let points = 0;
    
    // Calculate points
    if (selectedAnswer === currentQ.c) {
      points = currentQ.points || 10; // Default 10 points if not specified
      setScore(prev => prev + points);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleQuizEnd();
    }
  };

  // Helper function to render question options
  const renderOption = (option: string | QuestionOption, index: number) => {
    const isImageOption = typeof option === 'object';
    const optionText = isImageOption ? option.text : option;
    const optionImage = isImageOption ? option.image : undefined;

    return (
      <button
        key={index}
        onClick={() => handleAnswerSelect(index)}
        className={`
          w-full p-4 rounded-lg border-2 transition-all duration-200 text-left
          ${selectedAnswer === index 
            ? 'border-blue-500 bg-blue-50 shadow-md' 
            : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
          }
          ${isImageOption ? 'min-h-[100px]' : ''}
        `}
      >
        <div className="flex items-center gap-4">
          <span className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold
            ${selectedAnswer === index ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}
          `}>
            {String.fromCharCode(65 + index)}
          </span>
          
          <div className="flex-1">
            <p className="font-medium text-gray-800">{optionText}</p>
            {optionImage && (
              <div className="mt-2">
                <img 
                  src={optionImage} 
                  alt={`Option ${optionText}`}
                  className="max-w-full h-16 object-contain rounded border"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </button>
    );
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      {/* Header */}
      <header className="flex justify-between items-center max-w-4xl mx-auto mb-8">
        <img src={uniLogo} alt="University Logo" className="h-12" />
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-700">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="text-sm text-gray-600">
            Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <img src={clubLogo} alt="Club Logo" className="h-12" />
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Question Text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {currentQ.q}
          </h2>
          
          {/* Question Image (if present) */}
          {currentQ.image && (
            <div className="mb-6 flex justify-center">
              <img 
                src={currentQ.image}
                alt="Question illustration"
                className="max-w-full max-h-96 object-contain rounded-lg shadow-md border"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.a.map((option, index) => renderOption(option, index))}
        </div>

        {/* Points indicator */}
        <div className="flex justify-between items-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            💎 {currentQ.points || 10} points
          </span>
          
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`
              px-6 py-2 rounded-lg font-semibold transition-all duration-200
              ${selectedAnswer !== null 
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}