"use client";

import NoteModal from "@/components/utilities/NoteModal";
import NotePreview from "@/components/utilities/NotePreview";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Page = () => {
  const session = useSession();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      body: JSON.stringify({ data: {
        ...data,
        userId: session.data.user.id
      }}),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    setData({ title: "", content: "" });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/v1/getNotes/${session.data.user.id}`
        );
        await console.log(session.data.user.id)
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    setIsLoading(false);

    console.log({ notes });
  }, [session.data]);

  return (
    <div className="flex flex-col justify-center">
      <div className="w-max mx-auto mt-8">
        <Button radius="sm">+ Add new note</Button>
      </div>
      <div className="flex gap-4 mx-auto max-w-3/4">
        {notes?.body?.map((note, index) => {
          return (
            <NotePreview
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
      <NoteModal />
    </div>
  );
};

export default Page;
