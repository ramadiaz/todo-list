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
import { CloudCheck } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const NotePreview = ({ id, title, content, onDelete }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [titleEdit, setTitleEdit] = useState(title);
  const [contentEdit, setContentEdit] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const previewContent =
    content.length > 140 ? content.substring(0, 140) + "..." : content;
  const previewTitle =
    title.length > 21 ? title.substring(0, 21) + "..." : title;

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

  const handlUpdateContent = async () => {
    setIsSaving(true);
    try {
      await fetch(`/api/v1/updateNote/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            title: titleEdit,
            content: contentEdit,
          },
        }),
      })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    try{
      await fetch(`/api/v1/deleteNote/${id}`, {
        method: 'DELETE'
      }).then((res) => {
        onDelete(true)
      })
      .catch((err) => console.error(err))
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    handlUpdateContent();
  }, [contentEdit, titleEdit]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <button
        onClick={onOpen}
        className="text-left rounded-xl bg-orange-200 hover:brightness-110 transition-all duration-400 focus:ring-0 focus:ring-offset-0"
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
              <div className="h-8 px-4 pt-4 text-sm flex justify-start  items-center">
                {isSaving ? <div className="smLoader ml-10"></div> : 
                (
                <>
                <h2 className="mr-2">Saved</h2>
                <CloudCheck size={18} color="#27272a" weight="bold"/>
                </>
                )}
              </div>
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
                <Button color="danger" variant="light" onClick={() => handleDelete()}>
                  Delete
                </Button>
                <Button className="bg-neutral-800 text-slate-200" onPress={onClose}>
                  Close
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
