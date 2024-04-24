import { Line } from "react-chartjs-2";
import { Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Title,
    Tooltip,
    Legend
);

const linechartdata = {
    labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    datasets: [
        {
            label: "Amount Spent",
            data: [3000, 5000, 4500, 6000,],
            borderColor: "red",
        },
    ],
}
export const LineGraph = () => {

    const options={
        responsive: true,
        plugins: {
            legend: {
                position:"bottom"
            },
            title: {
                display: true,
                text: "Yearly Spending trend"
            }
        }
    };
    const data = {};
    return(
        <Line options={options} data={linechartdata}/>
    )
}