'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const NotePreview = ({ id, title, content }) => {
  const [data, setData] = useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const previewContent =
    content.length > 140 ? content.substring(0, 140) + "..." : content;

  const previewTitle =
    title.length > 23 ? title.substring(0, 23) + "..." : title;

    const fetchData = async() => {
      try{
        const response = await fetch(`/api/v1/getNoteFull/${id}`)
        const data = await response.json()
        setData(data)
        console.log({data})
      }catch(err){
        console.error(err)
      }
    }

    useEffect(() => {
      fetchData()
    }, [])

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
                {data.body?.title}
              </ModalHeader>
              <ModalBody>
                <p className="break-words">
                  {data.body?.content}
                </p>
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
