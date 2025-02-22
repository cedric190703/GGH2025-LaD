import { useState, useEffect, useRef } from "react";

type PlayPageProps = {
  darkMode: boolean;
};

export const Play = ({ darkMode }: PlayPageProps) => {
  const lyrics = [
    "First line of the song",
    "Second line of the song",
    "Third line of the song",
    "Fourth line of the song",
    "Fifth line of the song",
    "Sixth line of the song",
    "Seventh line of the song",
    "Eighth line of the song",
    "Ninth line of the song",
    "Tenth line of the song",
    "Eleventh line of the song",
    "Twelfth line of the song",
    "Thirteenth line of the song",
    "Fourteenth line of the song",
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // Function to update currentLine based on scroll position
  const updateCurrentLine = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerMiddle = containerRect.top + containerRect.height / 2;

    let closestIndex = 0;
    let minDistance = Number.MAX_VALUE;

    lineRefs.current.forEach((line, index) => {
      if (line) {
        const rect = line.getBoundingClientRect();
        const lineMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(lineMiddle - containerMiddle);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      }
    });

    // If near the bottom, set the last line as active
    if (container.scrollHeight - container.scrollTop <= container.clientHeight + 20) {
      closestIndex = lyrics.length - 1;
    }

    setCurrentLine(closestIndex);
  };

  // Attach scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateCurrentLine);
    return () => {
      container.removeEventListener("scroll", updateCurrentLine);
    };
  }, []);

  return (
    <div className={`w-full h-screen ${darkMode ? "text-white bg-black" : "text-black bg-white"}`}>
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto text-center scroll-smooth scrollbar-hide"
      >
        <div className="h-[50vh]"></div> {/* Empty space at the top */}
        {lyrics.map((line, index) => (
          <p
            key={index}
            ref={(el) => {
              lineRefs.current[index] = el;
            }}
            className={`my-6 transition-all duration-300 ${
              index === currentLine ? "text-2xl font-bold text-blue-500" : "text-base opacity-60"
            }`}
          >
            {line}
          </p>
        ))}
        <div className="h-[50vh]"></div> {/* Empty space at the bottom */}
      </div>
    </div>
  );
};
