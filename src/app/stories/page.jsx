"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState({
    title: "",
    content: "",
  });
  const [stories, setStories] = useState([]);

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/v1/getStories");
      if (response.ok) {
        const data = await response.json();
        setStories(data.body);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false)
  };

  const handleUpload = async () => {
    await fetch("/api/v1/pushStory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          title: data.title,
          content: data.content,
          userId: session.data.user.id,
          author: session.data.user.name,
        },
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    setData({
      title: "",
      content: "",
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-3/4 mx-auto">
          <div className="flex justify-end py-10 items-center">
            <Button
              onPress={onOpen}
              variant="ghost"
              className="border-2 border-neutral-800/70"
            >
              + Add your story
            </Button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              scrollBehavior={`inside`}
              size="4xl"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      <Input
                        type="text"
                        variant="underlined"
                        label="Title"
                        value={data.title}
                        onChange={(e) => {
                          setData({
                            ...data,
                            title: e.target.value,
                          });
                        }}
                      />
                    </ModalHeader>
                    <ModalBody>
                      <Textarea
                        maxRows={23}
                        variant="underlined"
                        placeholder="Write your story here..."
                        value={data.content}
                        onChange={(e) => {
                          setData({ ...data, content: e.target.value });
                        }}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        color="primary"
                        onPress={onClose}
                        onClick={() => handleUpload()}
                      >
                        Upload
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <div className="flex flex-col gap-4">
            {stories.map((story, index) => {
              return (
                <Link
                  href={`/story/${story.id}`}
                  key={index}
                  className="border-2 border-neutral-800/80 rounded-xl px-2 py-4 hover:bg-orange-200 transition-all duration-400" data-aos="fade-up"
                >
                  <h1 className="font-semibold text-xl">{story.title}</h1>
                  <h3 className="text-sm">Story by {story.author}</h3>
                  <h3 className="mt-4">{story.content.substring(0, 240) + "..."}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
