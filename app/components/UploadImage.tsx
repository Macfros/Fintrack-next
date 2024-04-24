"use client";
import React, { useRef, useState } from "react";
import ButtonBillSubmit from "./ButtonBillSubmit";
import toast from "react-hot-toast";
import { uploadPhoto } from "../api/actions/UploadBillsActions";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { Keyboard } from "lucide-react";


interface AppProps {}



const UploadImage: React.FC<AppProps> = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const formRef = useRef<HTMLFormElement>(null); 
    const [files, setFiles] = useState<File[]>([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState<number>();

    const handleName = (e: any) => {
        setName(e.target.value);
    }


    const handleInput = async(e: any) => {
        const files = (e.target.files);
        
        const newFiles = [...files].filter(file => {
            if(file.size <1024*1024 && file.type.startsWith('image/'))
                {
                    return file;
                }
        })

        setFiles(prev => [...newFiles, ...prev]);
    }

    const handleUpload = async() => {

       try{ if(!files.length)
            toast.error("No bills detected");

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price?.toString() || "");
        files.forEach((file) => {
            formData.append('files',file);
        })

        
        const res = await uploadPhoto(formData);

        if(res) 
            toast.success("Bill Uploaded");
        else
            toast.error("Some Error occured");
        
            window.location.reload();

    } catch (error){
            toast.error("Something Went Wrong!");
        }
    }


  return (
    <>
      <Button onPress={onOpen} color="success" className="text-white font-semibold w-1/4" endContent={<Keyboard />} variant="shadow">Upload Bill Manually</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
             <div>
                    <form action={handleUpload} ref={formRef}>
              <ModalHeader className="flex flex-col gap-1">Upload Bill</ModalHeader>
              <ModalBody>
             
                        <div className="flex flex-wrap gap-5">
                            <Input type="text" label="Bill Name" onChange={handleName}/>
                      {/*<Input type="text" label="Bill Category" onChange={handleCategory}/>*/}
                            <Dropdown>
                                <DropdownTrigger>
                                  <Button 
                                    variant="bordered" 
                                  >
                                    {!category ? "Category" : category}
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu 
                                  aria-label="Action event example" 
                                  onAction={(key:any) => setCategory(key)}
                                >
                                  <DropdownItem key="Food">Food</DropdownItem>
                                  <DropdownItem key="Grocery">grocery</DropdownItem>
                                  <DropdownItem key="Electronics">Electronics</DropdownItem>
                                  <DropdownItem key="Medical">Medical</DropdownItem>
                                  <DropdownItem key="Education">Education</DropdownItem>
                                  <DropdownItem key="Recreation">Recreation</DropdownItem>
                                  <DropdownItem key="Miscellaneous">Miscellaneous</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                              <Input
                                  type="number"
                                  label="Price"
                                  placeholder="0.00"
                                  labelPlacement="outside"
                                  startContent={
                                    <div className="pointer-events-none flex items-center">
                                      <span className="text-default-400 text-small">&#8377;</span>
                                    </div>
                                  }
                                  onChange={(e: any)=>setPrice(e.target.value)}
                                />
                            <input type="file" accept="images/*" onChange={handleInput}/>
                    </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <ButtonBillSubmit value="Upload Bill"/>
              </ModalFooter>
              </form>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


export default UploadImage;
