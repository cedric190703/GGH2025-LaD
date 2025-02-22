import { useState } from "react";
import { Navigation } from "./components/Navigation/Navigation";
import { SettingsPanel } from "./components/Settings/Settings";
import { Input } from "./components/Input/Input";
import { Play } from "./components/Play/Play";
import { Quiz } from "./components/Quiz/Quiz";

type TextData = {
  text: string;
  size: number;
  isBold: boolean;
};

type QuizData = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'input' | 'play'>('input');
  const [darkMode, setDarkMode] = useState(false);

  // Settings variables
  const [fontText, setFontText] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoMode, setAutoMode] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [parsedData, setParsedData] = useState<TextData[]>([]);
  const [quizData, setQuizData] = useState<QuizData[]>([]);

  // Etat pour afficher la modale du Quiz
  const [showQuizModal, setShowQuizModal] = useState(false);

  const handleParsedData = (data: TextData[]) => {
    console.log("Received parsed data:", data);
    setParsedData(data);
  };

  const handleQuizParsed = (data: QuizData[]) => {
    console.log("Received quiz data:", data);
    setQuizData(data);
  };

  const handleQuizToggle = () => {
    setShowQuizModal(!showQuizModal);
  };

  return (
    <div className={`h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navigation
          onSettingsToggle={() => setIsSettingsOpen(!isSettingsOpen)}
          onPageChange={setCurrentPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentPage={currentPage}
          onQuizToggle={handleQuizToggle}
          hasQuizData={quizData.length > 0}
          fontText={fontText}
        />

        <div className="flex-1 flex flex-col overflow-auto transition-margin duration-300">
          <div className="flex-1 overflow-auto p-4">
            {currentPage === 'input' ? (
              <Input
                darkMode={darkMode}
                maxStringSize={80}
                onParsed={handleParsedData}
                onQuizParsed={handleQuizParsed}
                fontText={fontText}
              />
            ) : (
              <Play
                darkMode={darkMode}
                fontText={fontText}
                hapticFeedback={hapticFeedback}
                soundEnabled={soundEnabled}
                autoMode={autoMode}
                speed={speed}
                parsedData={parsedData}
              />
            )}
          </div>
        </div>

        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          darkMode={darkMode}
          fontText={fontText}
          onFontText={setFontText}
          hapticFeedback={hapticFeedback}
          onHapticChange={setHapticFeedback}
          soundEnabled={soundEnabled}
          onSoundChange={setSoundEnabled}
          autoMode={autoMode}
          onAutoChange={setAutoMode}
          speed={speed}
          onSpeedChange={setSpeed}
        />

        {showQuizModal && quizData.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
              <Quiz
                questions={quizData}
                onQuizComplete={(score, total) => {
                  alert(`Quiz completed! Score: ${score} / ${total}`);
                  setShowQuizModal(false);
                }}
                fontText={fontText}
                onClose={handleQuizToggle}
                darkMode={darkMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}