'use client';

import React, { useState, useEffect } from 'react';

interface TypingText {
  text: string;
  color: string;
}

const TypingTop = () => {
  const fullText: TypingText[] = [
    { text: 'Generate', color: 'text-primary' },
    { text: 'AI', color: 'text-primary' },
    { text: 'Planner', color: 'text-primary' },
  ];

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (index >= fullText.length) {
      setTimeout(() => setShowAll(true), 5000);
      return;
    }

    if (subIndex < fullText[index].text.length + 1) {
      setTimeout(() => {
        setSubIndex(subIndex + 1);
      }, 100);
    } else if (index < fullText.length - 1) {
      setTimeout(() => {
        setIndex(index + 1);
        setSubIndex(0);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowAll(true);
      }, 1000);
    }
  }, [subIndex, index, fullText]);

  return (
    <h1 className="text-xl">
      {showAll
        ? fullText.map((line, idx) => (
            <React.Fragment key={idx}>
              <span className={`font-maple ${line.color} text-xl`}>
                {line.text}
              </span>
              <br />
            </React.Fragment>
          ))
        : fullText.map((line, idx) => (
            <React.Fragment key={idx}>
              {idx === index && (
                <span className={`font-maple ${line.color} text-xl`}>
                  {line.text.substring(0, subIndex)}
                </span>
              )}
              <br />
            </React.Fragment>
          ))}
    </h1>
  );
};

export default TypingTop;
