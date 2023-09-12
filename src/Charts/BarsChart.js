import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);






var misoptions = {
    responsive:true,
    animation:false,
    plugins:{
        Legend:{
            display:false
        }
    },
    scales : {
        y : {
            min : -25,
            max : 100
        },
        x: {
            ticks: { color: 'rgb(255, 99, 132)'}
        }
    }
};


export default function Bars(props) {
    return <Bar data={props.actividades}options={misoptions}/>
}