import React, { useRef, useState } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,useDisclosure } from "@nextui-org/react";
import toast from "react-hot-toast";
import axios from 'axios';
import { POST } from "@/app/api/register/route";
import { BrainCircuit } from "lucide-react";


interface AppProps {}

const UploadExternal: React.FC<AppProps> = () => {
  const [files, setFiles] = useState<File[]>([]);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const formRef = useRef<HTMLFormElement>(null); 

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).filter(file => {
        return file.size < 1024 * 1024 && file.type.startsWith('image/');
      });

      setFiles(prevFiles => [...newFiles, ...prevFiles]);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!files.length) {
        toast.error("No bills detected");
        return;
      }

      const formData = new FormData();
      formData.append('files',files[0]);

      const res = await fetch ('api/actions/UploadWithAi', {
      method: "POST",
      body: formData,
      });

      if (res.status === 200) {  // Check response status
        toast.success("Bill Uploaded");
        window.location.reload();
      } else {
        toast.error("Some Error occurred");
      }
    } catch (error) {
      console.error("Error occurred while uploading:", error);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="danger" className="font-semibold w-1/4" endContent={<BrainCircuit />} variant="shadow">
        Upload Bill using AI
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <form onSubmit={handleUpload} ref={formRef}>
            <ModalHeader className="flex flex-col gap-1">Upload Bill using AI</ModalHeader>
            <ModalBody>
              <div className="flex flex-wrap gap-5">
                <input type="file" accept="image/*" onChange={handleInput}/>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button type="submit" color="success" className="text-white">Upload Bill</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadExternal;
