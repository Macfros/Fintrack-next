
import BaseLayout from "./BaseLayout";
import PageTitle from "./PageTitle";
import Sidebar from "./Sidebar";
import { IndianRupee, Users, CreditCard, Activity} from "lucide-react";
import Card, { AppProps } from "./Card";
import { useSession } from "next-auth/react";
import { getAmountTotal, getMonthly, getMiscellaneous } from "./DataTable/data";
import { toast } from 'react-hot-toast';
import { useState, useEffect } from "react";
import { getMostSpent } from "../api/actions/BillActions";
import Image from 'next/image'
import GridItem from "./GridItem";
import AreaChartComponent from "./Charts/AreaChart";
import { LineGraph } from "./Charts/Line";
import { PieChart } from "./Charts/PieChart";
import { PieChartMonthly } from "./Charts/PieChartMonthly";


const CardData: AppProps[] = [
 

  {
    label: "Miscellanoeus",
    amount: "2456",
    description: "+1.1% from last month",
    icon: Activity
  },

]
interface MainProps{

} 

const DashBoard: React.FC<MainProps> = () => {
  const session = useSession();
  //console.log("dashboard se",session);
  const [total,setTotal] = useState<string>("");
  const [monthly, setMonthly] = useState<string>("");
  const [mostAmount,setMostAmount] = useState<string>("");
  const [mostCategory, setMostCategory] = useState<string>("");
  const [miscellaneous, setMiscellaneous] = useState<string>("");

      useEffect(() => {
        fetchData();
    }, [session]);

  const fetchData = async() => {
    try{
      const tAmount = await getAmountTotal();
      const month = await getMonthly();
      const mostMonth = await getMostSpent();
      const misc = await getMiscellaneous();

      const obj = JSON.parse(mostMonth);
      setTotal(tAmount);
      setMonthly(month);
      setMostAmount(obj.amount);
      setMostCategory(obj.category);
      setMiscellaneous(misc);

    }catch (error){
      toast.error("Data fetch error");
    }
  }


  return (
      <BaseLayout>
      <div className="flex flex-col gap-5 w-full">
        <PageTitle title={`Welcome, ${session?.data?.user?.name}`} />
        <PageTitle title="Dashboard" />

        <section className="grid w-full grid-cols-1 gap-4 gap-x-8
                            transition-all sm:grid-cols-2 xl:grid-cols-4" >
                <Card 
                  amount={total}
                  description="Amount spend since you've joined"
                  icon={IndianRupee}
                  label="Total Amount" />

                <Card 
                  amount={monthly}
                  description="Current Month - April"
                  icon={Activity}
                  label="Monthly Amount"/>

                <Card 
                  amount={mostAmount}
                  description={mostCategory}
                  icon={Activity}
                  label="Most spent"/>

               
                  <Card
                  amount={miscellaneous}
                  description="Miscellaneous amount"
                  icon={Activity}
                  label="Miscellaneous"/>        
                  
        </section>

        <section className="relative flex min-h-full flex-col items-center justify-center px-4 md:px-8 xl:px-10 py-44">
          <div className="grid xl:grid-cols-2 lg:grid-cols-2 w-full gap-10 max-w-[1400px]">
            <GridItem title="Spendings Total"><PieChart /></GridItem>
            <GridItem title="Spendings Current Month"><PieChartMonthly /></GridItem>
          </div>
        </section>

        <section className="relative flex min-h-full flex-col items-center justify-center px-4 md:px-8 xl:px-10 py-44">
          <div className="grid xl:grid-cols-1 lg:grid-cols-2 w-full gap-10 max-w-[1400px]">
            <GridItem title="Spendings Trend"><LineGraph /></GridItem>
          </div>
        </section>

        
        
      </div>
      </BaseLayout>
      
  );
};

export default DashBoard;