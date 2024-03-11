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
import { useState } from "react";
import Loading from "../loading";
import { useSession } from "next-auth/react";

const Page = () => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const handleUpload = async () => {
      await fetch("/api/v1/pushStory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            title: data.title,
            content: data.content,
            userId: session.data.user.id,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
        setData({
          title: '',
          content: ''
        })
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-11/12">
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
                      <Input type="text" variant="underlined" label="Title" 
                        value={data.title}
                        onChange={(e) => {
                          setData({
                            ...data, title: e.target.value
                          })
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
          <div></div>
        </div>
      )}
    </>
  );
};

export default Page;
