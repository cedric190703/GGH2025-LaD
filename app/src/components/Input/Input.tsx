type InputPageProps = {
    darkMode: boolean;
  };
  
  export const Input = ({ darkMode }: InputPageProps) => {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className={`rounded-xl p-6 ${
          darkMode 
            ? 'bg-gray-800 text-white' 
            : 'bg-white border border-gray-200'
        } transition-colors duration-300`}>
          <h2 className="text-2xl font-bold mb-4">Input Content</h2>
          <input 
            type="text" 
            placeholder="Enter something..."
            className={`w-full p-3 rounded-lg ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 focus:ring-blue-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } focus:outline-none focus:ring-2`}
          />
          <div className="mt-4 space-y-2">
            <p className="text-sm opacity-75">Example input section</p>
          </div>
        </div>
      </div>
    );
};