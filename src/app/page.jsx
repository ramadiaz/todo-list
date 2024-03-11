"use client";

import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

const Page = () => {
  const [index, setIndex] = useState(0);
  const date = new Date();
  const hours = date.getHours();

  const TEXTS = [
    "Task",
    "Reminder",
    "Deadline",
    "Idea",
    "Note",
    "Article",
    "Journal",
  ];

  const handleGreeting = () => {
    if (hours < 12) {
      return (
        <h1 className="text-5xl font-bold flex flex-row items-center justify-center">
          Good Morning
          <span className="text-8xl">⛅</span>
        </h1>
      );
    } else if (hours < 18) {
      return (
        <h1 className="text-5xl font-bold flex flex-row items-center justify-center">
          Good Afternoon
          <span className="text-8xl">🌞</span>
        </h1>
      );
    } else {
      return (
        <h1 className="text-5xl font-bold flex flex-row items-center justify-center">
          Good Evening
          <span className="text-8xl">🌙</span>
        </h1>
      );
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 4000);
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center py-16 gap-8">
        {handleGreeting()}
        <div className="flex flex-row text-4xl justify-center transition-all duration-300">
          <h1 className="mr-2 transition-all duration-300">
            Let's set up your{" "}
          </h1>
          <TextTransition springConfig={presets.wobbly}>
            {TEXTS[index % TEXTS.length]}
          </TextTransition>
          <h1>.</h1>
        </div>
      </div>
      <div>

      </div>
    </>
  );
};

export default Page;
