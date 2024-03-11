"use client";

import { Button } from "@nextui-org/react";
import { Checks, Compass, Note } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

const Page = () => {
  const session = useSession();
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
          Good Morning {session?.data?.user?.name}!
          <span className="text-8xl">⛅</span>
        </h1>
      );
    } else if (hours < 18) {
      return (
        <h1 className="text-5xl font-bold flex flex-row items-center justify-center">
          Good Afternoon {session?.data?.user?.name}!
          <span className="text-8xl">🌞</span>
        </h1>
      );
    } else {
      return (
        <h1 className="text-5xl font-bold flex flex-row items-center justify-center">
          Good Evening {session?.data?.user?.name}!
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
      <div className="w-3/4 mx-auto flex flex-col gap-4">
        <Link href={`/todos`}>
          <Button
            className="border-2 border-neutral-800 w-full h-16 flex flex-row justify-start hover:bg-orange-200 bg-transparent"
          >
            <Checks size={32} color="#27272a" weight="bold" />
            To-Do List
          </Button>
        </Link>
        <Link href={`/notes`}>
          <Button
            className="border-2 border-neutral-800 w-full h-16 flex flex-row justify-start hover:bg-orange-200 bg-transparent"
          >
            <Note size={32} color="#27272a" />
            Notes
          </Button>
        </Link>
        <Link href={`/stories`}>
          <Button
            className="border-2 border-neutral-800 w-full h-16 flex flex-row justify-start hover:bg-orange-200 bg-transparent"
          >
            <Compass size={32} color="#27272a" />
            Stories
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Page;
