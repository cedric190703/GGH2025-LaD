import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  parsedData,
}: PlayPageProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const linePositions = useRef<{ offsetTop: number; height: number }[]>([]);
  const rafId = useRef<number | null>(null);
  const [baseFontSize, setBaseFontSize] = useState(16);

  // Handle window resize for base font size
  useEffect(() => {
    const handleResize = () => {
      const newSize = Math.min(Math.max(window.innerWidth * 0.02, 14), 24);
      setBaseFontSize(newSize);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cache line positions and update on resize
  const updateLinePositions = useCallback(() => {
    if (!containerRef.current) return;
    linePositions.current = lineRefs.current.map(line => ({
      offsetTop: line?.offsetTop || 0,
      height: line?.offsetHeight || 0,
    }));
  }, []);

  // Find closest line using binary search
  const findClosestIndex = useCallback((containerMiddle: number) => {
    let low = 0;
    let high = linePositions.current.length - 1;
    let closestIndex = 0;
    let minDistance = Infinity;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const pos = linePositions.current[mid];
      const lineMiddle = pos.offsetTop + pos.height / 2;
      const distance = Math.abs(lineMiddle - containerMiddle);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = mid;
      }

      if (lineMiddle < containerMiddle) low = mid + 1;
      else high = mid - 1;
    }

    // Check nearby positions to ensure accuracy
    for (let i = Math.max(0, closestIndex - 2); i <= Math.min(linePositions.current.length - 1, closestIndex + 2); i++) {
      const pos = linePositions.current[i];
      const lineMiddle = pos.offsetTop + pos.height / 2;
      const distance = Math.abs(lineMiddle - containerMiddle);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    return closestIndex;
  }, []);

  // Throttled scroll handler
  const updateCurrentLine = useCallback(() => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const containerHeight = containerRef.current.clientHeight;
    const containerMiddle = scrollTop + containerHeight / 2;
    setCurrentLine(findClosestIndex(containerMiddle));
  }, [findClosestIndex]);

  // Scroll listener with RAF throttling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateCurrentLine);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateCurrentLine]);

  // Update line positions on mount and resize
  useEffect(() => {
    updateLinePositions();
    const handleResize = () => updateLinePositions();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateLinePositions]);

  // Optimized auto-scroll with RAF
  useEffect(() => {
    if (!autoMode || !containerRef.current) return;

    let animationFrameId: number;
    let lastTime: number;

    const animateScroll = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      const scrollAmount = (speed * deltaTime) / 10; // Adjust divisor for finer control
      containerRef.current!.scrollTop += scrollAmount;

      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoMode, speed]);

  // Sound effect on line change
  useEffect(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentLine, soundEnabled]);

  // Haptic feedback on bold lines
  useEffect(() => {
    if (hapticFeedback && window.navigator.vibrate && parsedData[currentLine]?.isBold) {
      window.navigator.vibrate(100);
    }
  }, [currentLine, hapticFeedback, parsedData]);

  return (
    <div className={`w-full h-screen ${darkMode ? "text-white bg-black" : "text-black bg-white"}`}>
      <audio ref={audioRef} src="click.mp3" />
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto text-center scroll-smooth scrollbar-hide"
      >
        <div className="h-[50vh]"></div>
        {parsedData.map((line, index) => (
          <AnimatePresence key={index}>
            <motion.p
              ref={(el : any) => {
                lineRefs.current[index] = el;
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: index === currentLine ? 1 : 0.5, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`my-6 transition-all duration-500 ${
                index === currentLine
                  ? "text-8xl font-extrabold text-blue-500"
                  : index === currentLine - 1 || index === currentLine + 1
                  ? "text-5xl font-semibold text-gray-400"
                  : "text-2xl text-gray-600 opacity-60"
              } ${line.isBold ? "font-bold" : ""} ${fontText ? "font-dyslexic" : ""}`}
              style={{
                fontSize: `${baseFontSize}px`,
                transition: 'all 0.3s ease',
                ...(index === currentLine && {
                  fontSize: `${baseFontSize * 1.6}px`,
                  textShadow: "0px 0px 15px rgba(0, 0, 255, 0.5)",
                }),
                ...((index === currentLine - 1 || index === currentLine + 1) && {
                  fontSize: `${baseFontSize * 1.3}px`,
                }),
                fontFamily: fontText ? '"OpenDyslexic", sans-serif' : "inherit",
              }}
            >
              {line.text}
            </motion.p>
          </AnimatePresence>
        ))}
        <div className="h-[50vh]"></div>
      </div>
    </div>
  );
};