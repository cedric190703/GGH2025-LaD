import { useState } from "react";
import { Navigation } from "./components/Navigation/Navigation";
import { SettingsPanel } from "./components/Settings/Settings";
import { Input } from "./components/Input/Input";
import { Play } from "./components/Play/Play";

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'input' | 'play'>('input');

  return (
    <div className="flex h-screen">
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
      />

      <div className={`flex-1 flex flex-col overflow-auto transition-margin duration-300 ${
        isSettingsOpen ? 'ml-64' : 'ml-0'
      }`}>
        <Navigation 
          onSettingsToggle={() => setIsSettingsOpen(!isSettingsOpen)}
          onPageChange={(page: 'input' | 'play') => setCurrentPage(page)}
        />
        
        <div className="flex-1 overflow-auto">
          {currentPage === 'input' ? <Input /> : <Play />}
        </div>
      </div>
    </div>
  );
}