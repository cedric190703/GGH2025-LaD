import { useState, useEffect, useRef, useCallback } from "react";

type TextData = {
  text: string;
  size: number;
  isBold: boolean;
};

type PlayPageProps = {
  darkMode: boolean;
  fontText: boolean;
  hapticFeedback: boolean;
  soundEnabled: boolean;
  autoMode: boolean;
  speed: number;
  parsedData: TextData[];
};

export const Play = ({
  darkMode,
  fontText,
  hapticFeedback,
  soundEnabled,
  autoMode,
  speed,
  parsedData
}: PlayPageProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoScrollRef = useRef<number | null>(null);

  const updateCurrentLine = useCallback(() => {
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
      closestIndex = parsedData.length - 1;
    }

    setCurrentLine(closestIndex);
  }, [parsedData]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateCurrentLine);
    return () => {
      container.removeEventListener("scroll", updateCurrentLine);
    };
  }, [updateCurrentLine]);

  useEffect(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentLine, soundEnabled]);

  useEffect(() => {
    if (hapticFeedback && window.navigator.vibrate) {
      window.navigator.vibrate(100); // Vibrate for 100ms
    }
  }, [currentLine, hapticFeedback]);

  useEffect(() => {
    if (autoMode) {
      const scrollContainer = () => {
        if (containerRef.current) {
          containerRef.current.scrollTop += speed * 2; // Increase the scroll amount
        }
      };

      autoScrollRef.current = window.setInterval(scrollContainer, 50); // Decrease the interval

      return () => {
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current);
        }
      };
    }
  }, [autoMode, speed]);

  return (
    <div className={`w-full h-screen ${darkMode ? "text-white bg-black" : "text-black bg-white"}`}>
      <audio ref={audioRef} src="click.mp3" />
      <div
        ref={containerRef}
        className={`w-full h-full overflow-y-auto text-center scroll-smooth scrollbar-hide ${
          fontText ? "font-dyslexic" : ""
        }`}
      >
        <div className="h-[50vh]"></div> {/* Empty space at the top */}
        {parsedData.map((line, index) => (
          <p
            key={index}
            ref={(el) => {
              lineRefs.current[index] = el;
            }}
            className={`my-6 transition-all duration-500 ${
              index === currentLine
                ? "text-6xl font-black text-blue-500 scale-150 shadow-xl animate-bounce"
                : "text-base opacity-60"
            } ${line.isBold ? 'font-bold' : ''} ${
              index === currentLine - 1 || index === currentLine + 1
                ? "text-lg opacity-80"
                : "text-sm opacity-40"
            }`}
            style={{
              fontSize: `${line.size}px`,
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              transform: index === currentLine ? 'scale(1.5)' : 'scale(1)',
            }}
          >
            {line.text}
          </p>
        ))}
        <div className="h-[50vh]"></div> {/* Empty space at the bottom */}
      </div>
    </div>
  );
};