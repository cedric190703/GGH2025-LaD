type SettingsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  return (
    <div 
      className={`fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <nav className="space-y-2">
        <div className="hover:bg-gray-700 p-2 rounded cursor-pointer">Setting 1</div>
        <div className="hover:bg-gray-700 p-2 rounded cursor-pointer">Setting 2</div>
        <div className="hover:bg-gray-700 p-2 rounded cursor-pointer">Setting 3</div>
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