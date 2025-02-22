import React, { useState } from "react";

type InputPageProps = {
  darkMode: boolean;
  maxStringSize: number; // Maximum size of each string
  onParsed: (data: TextData[]) => void;
};

type TextData = {
  text: string;
  size: number;
  isBold: boolean;
};

export const Input = ({
    darkMode, 
    maxStringSize, 
    onParsed
  }: InputPageProps) => {
  const [textData, setTextData] = useState<TextData[]>([]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const content = await file.text();
      parseMarkdown(content, maxStringSize);
    }
  };

const parseMarkdown = (markdown: string, maxStringSize: number) => {
  const lines = markdown.split("\n");
  const result: TextData[] = [];

  lines.forEach((line) => {
    // Check if the line contains bold tags (** or __)
    const isBold = line.includes("**") || line.includes("__");

    // Process Markdown tags in two steps:
    const cleanedLine = line
      // 1. Remove links but keep text inside []
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")  // Converts [text](url) -> text
      // 2. Remove other Markdown syntax
      .replace(/(\*\*|__|\*|_|~~|`|#+)/g, "");

    // Split the cleaned text into chunks
    for (let i = 0; i < cleanedLine.length; i += maxStringSize) {
      const chunk = cleanedLine.slice(i, i + maxStringSize);
      result.push({
        text: chunk,
        size: chunk.length,
        isBold,
      });
    }
  });

  setTextData(result);
  onParsed(result);
  console.log("Parsed Markdown Data:", result);
};

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div
        className={`rounded-xl p-6 ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-white border border-gray-200"
        } transition-colors duration-300`}
      >
        <h2 className="text-2xl font-bold mb-4">Upload Markdown File</h2>

        {/* Custom File Input */}
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
            darkMode
              ? "border-gray-600 hover:border-gray-500"
              : "border-gray-300 hover:border-gray-400"
          } transition-colors duration-300`}
        >
          <div className="flex flex-col items-center justify-center">
            <svg
              className={`w-8 h-8 mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <p className="text-sm">
              <span
                className={`font-semibold ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs opacity-75 mt-1">Markdown files only</p>
          </div>
          <input
            id="file-upload"
            type="file"
            accept=".md"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        
        {/*textData.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Parsed Markdown</h3>
            <div className="space-y-2">
              {textData.map((data, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <p>
                    <span className="font-medium">Text:</span> {data.text}
                  </p>
                  <p>
                    <span className="font-medium">Size:</span> {data.size}
                  </p>
                  <p>
                    <span className="font-medium">Bold:</span>{" "}
                    {data.isBold ? "Yes" : "No"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )*/}
      </div>
    </div>
  );
};
