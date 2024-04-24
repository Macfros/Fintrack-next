import { getAllBills } from "@/app/api/actions/UploadBillsActions";
import { getTotalAmount, getMonthlyAmount, getMostSpent, getMisc } from "@/app/api/actions/BillActions";
import React from "react";

const getData = async() => {
    const data = await getAllBills();
    return data;
}

const getAmountTotal = async() => {
  try{const totalamount = await getTotalAmount();
        //console.log(totalamount);;
        return totalamount;
      }catch(error){
          throw error(error);
      }
}

const getMonthly = async() => {
  try {
      const monthly = await getMonthlyAmount();
      return monthly;

  } catch (error) {
    throw error(error);
  }
}

const getMost = async() => {
  try {
      const most = await getMostSpent();
      return most;

  } catch (error) {
    throw error(error);
  }
}

const getMiscellaneous = async() => {
  try {
    const amount = await getMisc();
    return amount;
  } catch (error) {
    throw error(error);
  }
}

/*{
    id: '6618fc04be0e2b6ebd9eb8c0',
    name: 'Bill - 4',
    category: 'Miscellaneous',
    authorId: '6613d51a832bbc351a3d4200',
    secure_url: 'https://res.cloudinary.com/dbr8hbcn4/image/upload/v1712913411/bills_upload/1323490b-0bec-448d-830b-fc8cd9a66e0c_fmaznb.png',
    createdAt: 2024-04-12T09:16:52.033Z,
    updatedAt: 2024-04-12T09:16:52.033Z
  }*/
const users = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 79998,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 65499,
    userLost: 666,
  },
  
];

export { users, getData, getAmountTotal, getMonthly, getMiscellaneous};
