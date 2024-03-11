"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const NotePreview = ({ id, title, content }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const previewContent =
    content.length > 140 ? content.substring(0, 140) + "..." : content;
  const [titleEdit, setTitleEdit] = useState(title);
  const [contentEdit, setContentEdit] = useState(content);

  const previewTitle =
    title.length > 23 ? title.substring(0, 23) + "..." : title;

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/v1/getNoteFull/${id}`);
      const data = await response.json();
      setTitleEdit(data.body?.title);
      setContentEdit(data.body?.content);
    } catch (err) {
      console.error(err);
    }
  };

  const handlUpdateContent = async() => {
    try{
      await fetch(`/api/v1/updateNote/${id}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            title: titleEdit,
            content: contentEdit
          }
        })
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=> {
    handlUpdateContent()
  }, [contentEdit])

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <button
        onClick={onOpen}
        className="text-left rounded-xl bg-orange-200 hover:brightness-110 transition-all duration-400"
      >
        <div className="relative w-52 h-52 ">
          <h3 className="p-2 break-words">{previewContent}</h3>
          <div className="absolute bottom-0 bg-orange-300 w-full px-2 py-2 rounded-b-xl">
            <h2 className="break-words">{previewTitle}</h2>
          </div>
        </div>
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 break-words">
                <Input
                  type="text"
                  value={titleEdit}
                  onChange={(e) => {
                    setTitleEdit(e.target.value);
                  }}
                  className="text-lg font-bold ring-0"
                />
              </ModalHeader>
              <ModalBody>
                <Textarea
                  value={contentEdit}
                  onChange={(e) => {
                    setContentEdit(e.target.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotePreview;
