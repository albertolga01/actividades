import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

var misoptions={
    responsive: true,
    maintainAspecrRadio:false, 
};
var data ={
    labels:['Creadas','Realizadas','Pendientes'],
    datasets:[
        {
            labels:'Resumen Actividades',
            data:[100,50,50],
            backgroundColor:[
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor:[
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth:1,
        },
    ],
};



export default function Pies(props) {
    return <Pie data={data} options={misoptions}/>
}