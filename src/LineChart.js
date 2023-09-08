
import {Line} from 'react-chartjs-2';
import{
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filter,
}from 'chart.js';

Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filter
);

var beneficios = [0,56,20,36,80,40,30,-20,25,30,12,60];
var meses = ["Enero","Febrero","Marzo","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

var midata = {
    labels: meses,
    datasets:[
        { 
            label: 'Beneficios',           
            data: beneficios,
            tension:0.5,
            fill:true,
            borderColor:'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius:5,
            pointBorderColor: 'rgba(255, 99, 132)',
            pointBackgroundColor: 'rgba(255,99,132)',

        },
        
    ],
};
var misoptions = {

};
export default function LinesChart(){
    return <Line data={midata} />
}
