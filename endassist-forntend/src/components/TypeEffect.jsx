import React, { useState, useEffect } from "react";

const TypingEffect = ({ text, typingSpeed = 100, startDelay = 500 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Reset state when text prop changes
    setDisplayedText("");
    setCurrentIndex(0);
    setIsTyping(true);
  }, [text]);

  useEffect(() => {
    let timeout;

    // Start with a delay
    if (currentIndex === 0 && !isTyping) {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, startDelay);
      return () => clearTimeout(timeout);
    }

    // Type the text character by character
    if (isTyping && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);
    } else if (currentIndex >= text.length) {
      setIsTyping(false);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isTyping, text, typingSpeed, startDelay]);

  return (
    <div className="typing-effect">
      <span style={{ fontSize: "30px", fontWeight: "bold" }}>
        {displayedText}
      </span>
      <span className="cursor" style={{ fontSize: "30px", fontWeight: "bold" }}>
        |
      </span>
      <style jsx>{`
        .typing-effect {
          display: inline-block;
        }
        .cursor {
          display: inline-block;
          width: 2px;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default TypingEffect;
