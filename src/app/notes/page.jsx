"use client";

import Loading from "@/app/loading";
import NotePreview from "@/components/utilities/NotePreview";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Page = () => {
  const session = useSession();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!data.title || !data.content) return;
    await fetch("/api/v1/pushNotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          ...data,
          userId: session.data.user.id,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    setData({ title: "", content: "" });
  };

  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/v1/getNotes/${session.data?.user?.id}`, { next: { revalidate: 3 } }
      );
      await console.log(session.data?.user?.id);

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [session.data]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center">
          <div className="my-8 flex justify-center">
            <Button radius="sm">+ Add new note</Button>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mx-auto w-3/4">
            {notes?.body?.map((note, index) => {
              return (
                <NotePreview
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  key={index}
                />
              );
            })}
          </div>

          <form onSubmit={handleAddNote}>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
            />
            <input
              type="text"
              name="content"
              value={data.content}
              onChange={(e) => {
                setData({ ...data, content: e.target.value });
              }}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Page;
