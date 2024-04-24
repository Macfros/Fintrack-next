import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import {DeleteIcon} from "./DeleteIcon";
import {EyeIcon} from "./EyeIcon";
import {getData, users} from "./data";
import { useRouter} from 'next/navigation';
import { DeleteBill, getAllBills } from "@/app/api/actions/UploadBillsActions";
import toast from "react-hot-toast";
import { BillInfo } from "@/app/api/actions/BillActions";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Eye, ListCollapse, TrashIcon } from "lucide-react";
import { FormItem } from "@/components/ui/form";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
    {name: "NAME", uid: "name"},
    {name: "CATEGORY", uid: "category"},
    {name: "UPLOADED AT", uid: "createdAt"},
    {name: "AMOUNT", uid: "amount"},
    {name: "ACTIONS", uid: "actions"},
  ];



export default function DataTable() {

    const router = useRouter();
    const [data, setData] = useState([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [currBill, setCurrBill] = useState({});
    const handleRedirect = (e: string) => {
        router.push(e);
      }

    const handleDelete = async(e: any) => {
        try {
          const id = e;
          const deletedBill = await DeleteBill(id);
          if(!deletedBill)
              toast.success("Bill deleted");
            fetchData();
          
        } catch (error) {
          toast.error("Something went wrong");
          
        }
    }

    const handleDetails = async(e: any) => {
      try {
        const id = e;
        const viewdetails = await BillInfo(id);
        onOpen();
        setCurrBill(viewdetails);
        
      } catch (error) {
        toast.error("An error occured");
      }
    }

      useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const currdata: any = await getAllBills();
            setData(currdata);
            //console.log(currdata);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  const renderCell = React.useCallback((data:any, columnKey:any) => {
    const cellValue = data[columnKey];
   

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: data.secure_url}}
            name={data.name}
          >
          </User>
        );
      case "category":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "createdAt":
        return (
          <Chip className="capitalize"  size="sm" variant="flat">
            {cellValue.toLocaleString()}
          </Chip>
        );
      case "amount":
      return (
        <Chip className="capitalize"  size="sm" variant="flat">
            &#8377; {cellValue.toLocaleString()}
          </Chip>
      );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Button isIconOnly className="bg-white hover:bg-[#a5f3fc]" aria-label="View Details" onPress={()=>handleDetails(data.id)}>
            <ListCollapse />
           </Button>    
            <Button isIconOnly className="bg-white hover:bg-[#a5f3fc]" aria-label="View" onPress={()=>handleRedirect(data.secure_url)}>
            <Eye />
           </Button>  
          <Button isIconOnly className="bg-white hover:bg-[#dc2626]" aria-label="Delete" onPress={()=>handleDelete(data.id)}>
               <TrashIcon />
           </Button>    
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{currBill.name}</ModalHeader>
              <ModalBody>
                <div className="flex flex-row gap-3">
                  <p className="font-semibold"> 
                    Category:-  
                  </p>
                  <p> {currBill.category} </p>
                 
                </div>
                
                {currBill?.subitems && (
                  <div className="flex flex-col gap-3">
                    <p className="font-semibold">SubItems:</p>
                    {(currBill.subitems.length > 0) ? (currBill.subitems.map((item: any, index: number) => (
                      <div key={index} className="">
                        <div className="flex gap-3 text-slate-600"><p className="font-semibold">{index+1}. Name: </p> <p>{item.name}</p></div>
                        <div className="flex gap-3 text-slate-600"><p className="font-semibold">Amount:</p> <p>&#8377; {item.amount}</p></div>
                      </div>
                    )))
                    :
                    (<p className="text-slate-600">No subitems! </p>)}
                  </div>
                )}

                <div className="flex flex-row gap-3 align-right">
                  <p className="font-semibold"> 
                    Total Amount:-  
                  </p>
                  <p> &#8377; {currBill.amount} </p>
                 
                </div>

                <div className="flex flex-row gap-3 align-right">
                  <p className="font-semibold"> 
                    Uploaded At:-  
                  </p>
                  <p> {currBill?.createdAt.toLocaleString()} </p>
                 
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  <Table className="w-full" aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </>
  );
}
