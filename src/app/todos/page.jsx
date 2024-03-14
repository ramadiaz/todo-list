"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { Button, Checkbox } from "@nextui-org/react";
import { Trash } from "@phosphor-icons/react";

const Page = () => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/v1/getTodos/${session.data?.user?.id}`,
        { next: { revalidate: 3 } }
      );
      const data = await response.json();
      setTodos(data.body);
      console.log({ data });
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleAddTodo = async () => {
    await fetch("/api/v1/pushTodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          title: "New Task",
          userId: userId,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    fetchData();
  };

  const handleDelete = async ( id ) => {
    await fetch(`/api/v1/deleteTodos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    fetchData();
  };

  const handleToggleComplete = async (todoId) => {
    const updatedTodo = {
      ...todos.find((todo) => todo.id === todoId),
      completed: !todos.find((todo) => todo.id === todoId).completed,
    };
    await fetch(`/api/v1/updateTodo/${todoId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    fetchData();
  };

  useEffect(() => {
    setUserId(session.data?.user.id);
    fetchData();
  }, [session.data]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center">
          <div className="my-8 flex justify-center">
            <Button
              onClick={() => handleAddTodo()}
              radius="sm"
              className="bg-orange-200"
            >
              + Add new task
            </Button>
          </div>
          <div className="w-[800px] mx-auto flex flex-col gap-8">
            {todos.map((todo, index) => {
              return (
                <>
                  <Checkbox
                    defaultSelected={todo.completed}
                    lineThrough
                    key={index}
                    onChange={() => handleToggleComplete(todo.id)}
                  >
                    {todo.title}
                  </Checkbox>
                  <button onClick={() => handleDelete(todo.id)}>X</button>
                </>
              );
            })}
          </div>
          <div className="my-8 flex justify-center">
            <Button
              onClick={() => handleDelete()}
              radius="sm"
              color="danger"
              variant="bordered"
              startContent={<Trash size={32} color="#ef4444" />}
            >
              Delete all done tasks
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
