"use client";

import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Page = () => {
  const session = useSession();
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

  return (
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
  );
};

export default Page;
