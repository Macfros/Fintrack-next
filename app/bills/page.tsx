"use client"
import { useEffect } from "react";
import getUser from "../api/hooks/getUser";
import BaseLayout from "../components/BaseLayout";
import Table from "../components/DataTable/Table";
import PageTitle from "../components/PageTitle";
import UploadImage from "../components/UploadImage";
import {useRouter} from "next/navigation";
import UploadExternal from "../components/DataTable/UploadExternal";




interface AppProps
{

} 

const Bills: React.FC<AppProps> = () => {
   const router = useRouter();

    
  // useEffect(() => {
  //       fetchUser();
  //   }, []);

  // const fetchUser = async() => {
  //   const user = await getUser();
  //   if(!user)
  //     console.log("yaha se ",user);
  // }

  return (
    <BaseLayout>
      <div className="flex flex-col gap-3 w-full m-5 ">
      <PageTitle title="All your bills in one place !" />
      <div className="flex gap-10">
      <UploadImage />
      <UploadExternal />
      </div>
      <Table />
      </div>
    </BaseLayout>
  );
};

export default Bills;