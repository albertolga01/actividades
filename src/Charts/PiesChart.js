import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

var misoptions={
    responsive: true,
    maintainAspectRatio:false, 
};



export default function Pies(props) {
    return <Pie data={props.actividades} options={misoptions}/>
}