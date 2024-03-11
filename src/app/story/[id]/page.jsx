"use client";

import Loading from "@/app/loading";
import { useEffect, useState } from "react";

const Page = ({ params: { id } }) => {
  const [story, setStory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/getStory/${id}`);
      if (response.ok) {
        const data = await response.json();
        setStory(data.body);
        console.log({ data });
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-3/4 mx-auto my-12">
          <h1 className="text-3xl font-semibold">{story.title}</h1>
          <div className="flex flex-row justify-between">
            <h3 className="text-sm">Story by {story.author}</h3>
            <h3 className="text-sm">
              Published at{" "}
              {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
                new Date(story.createdAt)
              )}
            </h3>
          </div>
          <h3
            dangerouslySetInnerHTML={{
              __html: story.content.replace(/\n/g, "<br>"),
            }}
            className="text-justify py-8"
          ></h3>
        </div>
      )}
    </>
  );
};

export default Page;
