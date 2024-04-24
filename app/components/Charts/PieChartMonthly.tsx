"use client";

import { Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,

 } from "chart.js"
import { Pie } from "react-chartjs-2"
import {pieDataMonthly} from "../../api/actions/BillActions";
import { useState,useEffect } from "react";


 ChartJS.register(
    Tooltip,
    Legend,
    ArcElement,
 )


 


export const PieChartMonthly = () => {

    const getCurrentMonth = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        return month;
      };

    const options={
        responsive: true,
        plugins: {
            legend: {
                position:"bottom"
            },
            title: {
                display: true,
                text: `${getCurrentMonth()}`,
            }
        }
    };
    const [piedata, setpiedata] = useState({});
    const [colors, setColors] = useState<string[]>([]);
    const listofColours = ["#E74C3C","#AF7AC5","#F4D03F","#5DADE2","#48C9B0","#34495E","#34495E","#E67E22","#40E0D0","#DE3163"];
    useEffect(()=> {
        apidata();
    },[])

    const apidata = async() => {
        const data = await pieDataMonthly();
        
        let temp: string[] = [];

        for(let i=0; i< data.labels.length; i++)
            {
                temp.push(listofColours[i]);
            }

            setColors(temp);
        //console.log(data);
        setpiedata(data);
    }




    const piechartdata = {
        labels: piedata.labels,
        datasets: [
            {
                label: `Amount spent - ${getCurrentMonth()}`,
                data: piedata.data,
                backgroundColor: colors,
                hoverOffset: 4,
            }
        ]
     }

    return(
        <div>
            <Pie options={options} data={piechartdata} />
        </div>
        
    )
}