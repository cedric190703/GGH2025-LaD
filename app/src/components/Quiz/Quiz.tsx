import React from 'react';

interface QuizProps {
  questions: { question: string; options: string[]; correctAnswer: number }[];
  onQuizComplete: (score: number, total: number) => void;
  fontText: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onQuizComplete, fontText, onClose, darkMode }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = React.useState(false);

  const handleAnswer = (selectedAnswer: number) => {
    setSelectedAnswer(selectedAnswer);
    setIsAnswerLocked(true);
  };

  const handleNext = () => {
    setScore((prevScore) => {
      const newScore = selectedAnswer === questions[currentQuestion].correctAnswer ? prevScore + 1 : prevScore;
      return newScore;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswerLocked(false);
    } else {
      onQuizComplete(score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0), questions.length);
    }
  };

  return (
    <div className={`relative p-6 rounded-lg shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} ${fontText ? 'font-dyslexic' : ''}`}>
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 shadow-md">
        ✕
      </button>

      {/* Question */}
      <div className="text-2xl font-bold text-center mb-6">{questions[currentQuestion].question}</div>

      {/* Options */}
      <div className="grid gap-3">
        {questions[currentQuestion].options.map((option, index) => {
          const isCorrect = index === questions[currentQuestion].correctAnswer;
          const isSelected = index === selectedAnswer;

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full py-3 text-lg font-medium rounded-lg transition-all duration-200 shadow-md ${
                isAnswerLocked
                  ? isSelected
                    ? isCorrect
                      ? 'bg-green-500 hover:bg-green-600' // Good answer, user selected it
                      : 'bg-red-500 hover:bg-red-600'    // Bad answer, user selected it
                    : isCorrect
                    ? 'bg-green-500 hover:bg-green-600'   // Correct answer, but not selected
                    : 'bg-gray-500 cursor-not-allowed'    // Incorrect answer, not selected
                  : darkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              disabled={isAnswerLocked && !isSelected}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {isAnswerLocked && (
        <button
          onClick={handleNext}
          className={`mt-6 w-full py-3 text-lg font-medium rounded-lg transition-all duration-200 shadow-md ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
        >
          Suivant
        </button>
      )}
    </div>
  );
};