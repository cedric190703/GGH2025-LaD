import React, { useState } from "react";

type InputPageProps = {
  darkMode: boolean;
  maxStringSize: number;
  onParsed: (data: TextData[]) => void;
  onQuizParsed: (quiz: QuizData[]) => void;
  fontText: boolean;
};

type TextData = {
  text: string;
  size: number;
  isBold: boolean;
};

type QuizData = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export const Input = ({
  darkMode,
  maxStringSize,
  onParsed,
  onQuizParsed,
  fontText, // Acceptez la prop ici
}: InputPageProps) => {
  const [textData, setTextData] = useState<TextData[]>([]);
  const [quizData, setQuizData] = useState<QuizData[]>([]);

  const textStyle = {
    fontFamily: fontText ? '"OpenDyslexic", sans-serif' : "inherit",
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const content = await file.text();
      parseTextFile(content, maxStringSize, file.name);
    }
  };

  const parseTextFile = (content: string, maxStringSize: number, fileName: string) => {
    if (fileName.endsWith('.md')) {
      parseMarkdown(content, maxStringSize);
    } else if (fileName.endsWith('.csv')) {
      parseCsv(content, maxStringSize);
    } else {
      parsePlainText(content, maxStringSize);
    }
  };

  const parseMarkdown = (markdown: string, maxStringSize: number) => {
    const lines = markdown.split("\n");
    const result: TextData[] = [];

    lines.forEach((line) => {
      const isBold = line.includes("**") || line.includes("__");
      const cleanedLine = line
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/(\*\*|__|\*|_|~~|`|#+)/g, "");

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

  const parsePlainText = (text: string, maxStringSize: number) => {
    const lines = text.split("\n");
    const result: TextData[] = [];

    lines.forEach((line) => {
      for (let i = 0; i < line.length; i += maxStringSize) {
        const chunk = line.slice(i, i + maxStringSize);
        result.push({
          text: chunk,
          size: chunk.length,
          isBold: false,
        });
      }
    });

    setTextData(result);
    onParsed(result);
    console.log("Parsed Plain Text Data:", result);
  };

  const parseCsv = (csv: string, maxStringSize: number) => {
    const lines = csv.split("\n");
    const result: TextData[] = [];

    lines.forEach((line) => {
      const columns = line.split(",");
      columns.forEach((column) => {
        for (let i = 0; i < column.length; i += maxStringSize) {
          const chunk = column.slice(i, i + maxStringSize);
          result.push({
            text: chunk,
            size: chunk.length,
            isBold: false,
          });
        }
      });
    });

    setTextData(result);
    onParsed(result);
    console.log("Parsed CSV Data:", result);
  };

  const handleQuizFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const content = await file.text();
      parseQuizFile(content, file.name);
    }
  };

  const parseQuizFile = (content: string, fileName: string) => {
    if (fileName.endsWith('.csv')) {
      parseCsvQuiz(content);
    } else {
      parsePlainTextQuiz(content);
    }
  };

  const parseCsvQuiz = (csv: string) => {
    const lines = csv.split("\n");
    const result: QuizData[] = [];

    lines.forEach((line) => {
      const parts = line.split("|").map((part) => part.trim());

      if (parts.length >= 3) {
        const question = parts[0];
        const options = parts[1].split(",").map((option) => option.trim());
        const correctAnswer = parseInt(parts[2], 10) - 1;

        result.push({
          question,
          options,
          correctAnswer,
        });
      }
    });

    setQuizData(result);
    onQuizParsed(result);
    console.log("Parsed CSV Quiz Data:", result);
  };

  const parsePlainTextQuiz = (content: string) => {
    const lines = content.split("\n");
    const result: QuizData[] = [];

    lines.forEach((line) => {
      const parts = line.split("|").map((part) => part.trim());

      if (parts.length >= 3) {
        const question = parts[0];
        const options = parts[1].split(",").map((option) => option.trim());
        const correctAnswer = parseInt(parts[2], 10) - 1;

        result.push({
          question,
          options,
          correctAnswer,
        });
      }
    });

    setQuizData(result);
    onQuizParsed(result);
    console.log("Parsed Plain Text Quiz Data:", result);
  };

  return (
    <div style={textStyle} className="p-6 max-w-2xl mx-auto">
      <div
        className={`rounded-xl p-6 ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-white border border-gray-200"
        } transition-colors duration-300`}
      >
        <h2 className="text-2xl font-bold mb-4">Charger un fichier Texte</h2>

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
                Cliquer pour charger un fichier
              </span>{" "}
              ou glisser
            </p>
            <p className="text-xs opacity-75 mt-1">Fichiers texte (.txt, .md, .csv)</p>
          </div>
          <input
            id="file-upload"
            type="file"
            accept=".txt, .md, .csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <h2 className="text-2xl font-bold mb-4 mt-6">Charger un fichier Quiz</h2>

        <label
          htmlFor="quiz-file-upload"
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
                Cliquer pour charger un fichier
              </span>{" "}
              ou glisser
            </p>
            <p className="text-xs opacity-75 mt-1">Fichiers Quiz (.txt, .csv)</p>
          </div>
          <input
            id="quiz-file-upload"
            type="file"
            accept=".txt, .csv"
            className="hidden"
            onChange={handleQuizFileChange}
          />
        </label>
      </div>
    </div>
  );
};