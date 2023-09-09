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



var beneficios = [0, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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

var midata={
    labels:meses,
    datasets:[
        {
            labels: 'Beneficios',
            data: beneficios,
            backgroundColor:'rgba(0,220,195,0.5)'
        }
    ]
}
export default function Bars(props) {
    return <Bar data={midata} options={misoptions}/>
}