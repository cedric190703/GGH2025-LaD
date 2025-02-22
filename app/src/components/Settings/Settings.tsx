import React from 'react';

type SettingsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  fontText: boolean;
  onFontText: (value: boolean) => void;
  hapticFeedback: boolean;
  onHapticChange: (value: boolean) => void;
  soundEnabled: boolean;
  onSoundChange: (value: boolean) => void;
  autoMode: boolean;
  onAutoChange: (value: boolean) => void;
  speed: number;
  onSpeedChange: (value: number) => void;
};

export const SettingsPanel = ({
  isOpen,
  onClose,
  darkMode,
  fontText,
  onFontText,
  hapticFeedback,
  onHapticChange,
  soundEnabled,
  onSoundChange,
  autoMode,
  onAutoChange,
  speed,
  onSpeedChange,
}: SettingsPanelProps) => {

  const textStyle = {
    fontFamily: fontText ? '"OpenDyslexic", sans-serif' : "inherit",
  };

  return (
    <div
      style={textStyle}
      className={`fixed left-0 top-0 h-full w-64 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-800'
      } text-white p-4 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
        <h2 className="text-xl font-bold">Settings</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full border border-gray-600 hover:border-gray-400 transition-colors focus:outline-none"
          aria-label="Close Settings"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <nav className="space-y-6">
        {/* Font Size Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Police dyslexique</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={fontText}
              onChange={(e) => onFontText(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Haptic Feedback Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Effet haptique</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={hapticFeedback}
              onChange={(e) => onHapticChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Sound Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Effet bruit</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => onSoundChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Auto Mode Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Lecture automatique</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoMode}
              onChange={(e) => onAutoChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Speed Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Vitesse de lecture</span>
            <span>{speed}x</span>
          </div>
          <input
            type="range"
            min="0.25"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </nav>
    </div>
  );
};