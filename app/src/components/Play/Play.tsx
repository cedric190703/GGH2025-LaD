type PlayPageProps = {
  darkMode: boolean;
};

export const Play = ({ darkMode }: PlayPageProps) => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className={`rounded-xl p-6 ${
        darkMode 
          ? 'bg-gray-800 text-white' 
          : 'bg-white border border-gray-200'
      } transition-colors duration-300`}>
        <h2 className="text-2xl font-bold mb-4">Play Content</h2>
        <div className={`p-4 rounded-lg ${
          darkMode ? 'bg-gray-700' : 'bg-blue-50'
        }`}>
          <p className="mb-4">Interactive content area</p>
          <button className={`px-4 py-2 rounded-lg ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } transition-colors`}>
            Start Action
          </button>
        </div>
      </div>
    </div>
  );
};