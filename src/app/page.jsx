"use client";

import { Button } from "@nextui-org/react";
import {
  ArrowUUpLeft,
  Binoculars,
  Checks,
  Compass,
  Note,
} from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import Loading from "./loading";

const Page = () => {
  const session = useSession();
  const [index, setIndex] = useState(0);
  const date = new Date();
  const hours = date.getHours();
  const [isLoading, setIsLoading] = useState(true);

  const TEXTS = [
    "Task",
    "Reminder",
    "Deadline",
    "Idea",
    "Note",
    "Article",
    "Journal",
  ];

  const [stories, setStories] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/getStories");
      if (response.ok) {
        const data = await response.json();
        setStories(data.body);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
              <Button className="border-2 border-neutral-800 w-full h-16 flex flex-row justify-start hover:bg-orange-200 bg-transparent">
                <Checks size={32} color="#27272a" weight="bold" />
                To-Do List
              </Button>
            </Link>
            <Link href={`/notes`}>
              <Button className="border-2 border-neutral-800 w-full h-16 flex flex-row justify-start hover:bg-orange-200 bg-transparent">
                <Note size={32} color="#27272a" />
                Notes
              </Button>
            </Link>
            <Link href={`/stories`}>
              <Button className="border-2 border-neutral-800 w-full h-16 flex flex-row justify-start hover:bg-orange-200 bg-transparent">
                <Compass size={32} color="#27272a" />
                Stories
              </Button>
            </Link>
          </div>
          <div className="my-20">
            <div className="flex flex-row justify-center items-center">
              <h1 className="text-4xl mr-4">Discover other people stories</h1>
              <Binoculars size={64} color="#27272a" />
            </div>
            <div className="flex flex-col gap-4 w-3/4 mt-10 mx-auto">
              {stories.slice(0, 3).map((story, index) => {
                return (
                  <Link
                    href={`/story/${story.id}`}
                    key={index}
                    className="border-2 border-neutral-800/80 rounded-xl px-2 py-4 hover:bg-orange-200 transition-all duration-400"
                  >
                    <h1 className="font-semibold text-xl">{story.title}</h1>
                    <h3 className="text-sm">Story by {story.author}</h3>
                    <h3 className="mt-4">
                      {story.content.substring(0, 240) + "..."}
                    </h3>
                  </Link>
                );
              })}
            </div>
            <Link
              href={`/stories`}
              className="flex flex-row justify-center items-center gap-2 mt-8 hover:opacity-80 transition-all duration-400"
            >
              <h2 className="text-xl">Find more stories</h2>
              <ArrowUUpLeft size={32} color="#27272a" weight="bold" />
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
