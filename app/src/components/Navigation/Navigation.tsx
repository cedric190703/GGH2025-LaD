type NavigationProps = {
  onSettingsToggle: () => void;
  onPageChange: (page: 'input' | 'play') => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  currentPage: 'input' | 'play';
};

export const Navigation = ({ 
  onSettingsToggle, 
  onPageChange,
  darkMode,
  setDarkMode,
  currentPage
}: NavigationProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onSettingsToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
        >
          ☰
        </button>
        
        {/* Page Toggle Switch */}
        <div className="relative inline-block w-32 h-10 rounded-full bg-gray-200 dark:bg-gray-700">
          <button
            onClick={() => onPageChange('input')}
            className={`absolute left-0 top-0 w-1/2 h-full rounded-full transition-all duration-300 ${
              currentPage === 'input' 
                ? 'bg-blue-500 dark:bg-blue-600 transform scale-105' 
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Input
          </button>
          <button
            onClick={() => onPageChange('play')}
            className={`absolute right-0 top-0 w-1/2 h-full rounded-full transition-all duration-300 ${
              currentPage === 'play' 
                ? 'bg-blue-500 dark:bg-blue-600 transform scale-105' 
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Play
          </button>
        </div>
      </div>
      
      {/* Dark Mode Toggle */}
      <div className="flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {darkMode ? "Dark" : "Light"}
          </span>
        </label>
      </div>
    </div>
  );
};