import React, { useState } from "react";

type QuizProps = {
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  onQuizComplete: (score: number, total: number) => void;
  fontText: boolean;
  onClose: () => void;
  darkMode: boolean;
};

export const Quiz: React.FC<QuizProps> = ({
  questions,
  onQuizComplete,
  fontText,
  onClose,
  darkMode,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  if (questions.length === 0) {
    return null;
  }

  const handleOptionClick = (index: number) => {
    if (selectedOption === null) {
      setSelectedOption(index);
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const isCorrect = selectedOption === questions[currentQuestionIndex].correctAnswer;
      const newScore = isCorrect ? score + 1 : score;
      const newUserAnswers = [...userAnswers, selectedOption];

      setUserAnswers(newUserAnswers);
      setScore(newScore);

      if (currentQuestionIndex === questions.length - 1) {
        setShowResults(true);
        onQuizComplete(newScore, questions.length);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResults(false);
    setUserAnswers([]);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (showResults) {
    return (
      <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <h2 className="text-2xl font-bold mb-4">Résultats du Quiz</h2>
        <div className="mb-6">
          <p className="text-lg font-semibold">
            Score final: {score}/{questions.length}
          </p>
          <p className="text-sm opacity-75">
            ({Math.round((score / questions.length) * 100)}%)
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div key={index} className="border-b pb-4">
                <h3 className="font-medium mb-2">
                  Question {index + 1}: {question.question}
                </h3>

                <div className="space-y-1">
                  {question.options.map((option, optionIndex) => {
                    let bgColor = darkMode ? "bg-gray-700" : "bg-gray-100";
                    let borderColor = "";

                    if (optionIndex === question.correctAnswer) {
                      bgColor = "bg-green-100 dark:bg-green-800";
                      borderColor = "border-2 border-green-500";
                    }
                    if (optionIndex === userAnswer) {
                      bgColor = isCorrect
                        ? "bg-green-100 dark:bg-green-800"
                        : "bg-red-100 dark:bg-red-800";
                      borderColor = isCorrect
                        ? "border-2 border-green-500"
                        : "border-2 border-red-500";
                    }

                    return (
                      <div
                        key={optionIndex}
                        className={`p-2 rounded ${bgColor} ${borderColor}`}
                      >
                        {option}
                        {optionIndex === question.correctAnswer && (
                          <span className="ml-2 text-green-500">✓</span>
                        )}
                        {optionIndex === userAnswer && !isCorrect && (
                          <span className="ml-2 text-red-500">✗</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 flex-1"
          >
            Fermer
          </button>
          <button
            onClick={handleRetry}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex-1"
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Question {currentQuestionIndex + 1}/{questions.length}</h2>
        <span className="text-lg font-semibold">
          Score: {score}/{questions.length}
        </span>
      </div>

      <p className="text-lg mb-6">{currentQuestion.question}</p>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = index === currentQuestion.correctAnswer;
          const isSelected = index === selectedOption;

          let bgColor = darkMode ? "bg-gray-700" : "bg-gray-100";
          if (selectedOption !== null) {
            if (isCorrect) {
              bgColor = "bg-green-100 dark:bg-green-800";
            } else if (isSelected) {
              bgColor = "bg-red-100 dark:bg-red-800";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={selectedOption !== null}
              className={`w-full text-left p-3 rounded-lg transition-all ${bgColor} ${
                selectedOption === null
                  ? "hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                  : "cursor-default"
              } ${selectedOption !== null && isCorrect ? "border-2 border-green-500" : ""}`}
            >
              {option}
              {isSelected && !isCorrect && (
                <span className="ml-2 text-red-500">✗</span>
              )}
              {isCorrect && selectedOption !== null && (
                <span className="ml-2 text-green-500">✓</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 flex-1"
        >
          Fermer
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex < questions.length - 1 ? "Suivant" : "Terminer"}
        </button>
      </div>
    </div>
  );
};