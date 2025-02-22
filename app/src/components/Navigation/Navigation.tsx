import { useState } from "react";

type NavigationProps = {
  onSettingsToggle: () => void;
  onPageChange: (page: 'input' | 'play') => void;
};

export const Navigation = ({ onSettingsToggle, onPageChange }: NavigationProps) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="bg-white border-b p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onSettingsToggle}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          ☰
        </button>
        <button 
          onClick={() => onPageChange('input')}
          className="hover:bg-gray-100 px-4 py-2 rounded-lg"
        >
          Input
        </button>
        <button 
          onClick={() => onPageChange('play')}
          className="hover:bg-gray-100 px-4 py-2 rounded-lg"
        >
          Play
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={isToggled}
            onChange={(e) => setIsToggled(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900">
            {isToggled ? "Enabled" : "Disabled"}
          </span>
        </label>
      </div>
    </div>
  );
};