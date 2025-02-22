type SettingsPanelProps = {
    isOpen: boolean;
    onClose: () => void;
    darkMode: boolean;
  };
  
  export const SettingsPanel = ({ isOpen, onClose, darkMode }: SettingsPanelProps) => {
    return (
      <div 
        className={`fixed left-0 top-0 h-full w-64 bg-gray-800 dark:bg-gray-900 text-white p-4 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <nav className="space-y-2">
          <div className="hover:bg-gray-700 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
            Profile Settings
          </div>
          <div className="hover:bg-gray-700 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
            Notifications
          </div>
          <div className="hover:bg-gray-700 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
            Privacy
          </div>
        </nav>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          ×
        </button>
      </div>
    );
};