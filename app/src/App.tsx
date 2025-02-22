import { useState } from "react";
import { Navigation } from "./components/Navigation/Navigation";
import { SettingsPanel } from "./components/Settings/Settings";
import { Input } from "./components/Input/Input";
import { Play } from "./components/Play/Play";

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'input' | 'play'>('input');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <SettingsPanel 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)}
          darkMode={darkMode}
        />

        <div className={`flex-1 flex flex-col overflow-auto transition-margin duration-300 ${
          isSettingsOpen ? 'ml-64' : 'ml-0'
        }`}>
          <Navigation 
            onSettingsToggle={() => setIsSettingsOpen(!isSettingsOpen)}
            onPageChange={setCurrentPage}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            currentPage={currentPage}
          />
          
          <div className="flex-1 overflow-auto p-4">
            {currentPage === 'input' ? 
              <Input darkMode={darkMode} /> : 
              <Play darkMode={darkMode} />}
          </div>
        </div>
      </div>
    </div>
  );
}