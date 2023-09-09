 
import React,{useState, useEffect} from 'react'; 
import  {FaCheckCircle, FaTrash, FaEdit} from 'react-icons/fa'
import axios from '../node_modules/axios';
import {Nabvar} from './component/Navbar'; 

import './App.css'; 
import LineChart from './Charts/LineChart';
import PiesChart from './Charts/PiesChart';
import BarsChart from './Charts/BarsChart';

function App(props) {
	const [lista, setLista] =  useState([]);  
    const [setallProyectos, setAllProyectos] = useState([]);
    const[setactividadesProyecto,setActividadesProyecto] = useState([]);
    const midata = [];
    useEffect(()=> { 
        getActividades();
        getAllProyectos();
	}, [])




  


	async function getActividades(){    
        
		setLista([]);  
		
		var id = "getActividades";
		var date = ""; 
		var termino = ""; 
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&date='+date+'&userid=84&termino='+termino);
	 
	    console.log(res.data);
		setLista(res.data); 
	 
	}

    async function getAllProyectos() {
        var id = "getTodosProyectosUsuario";
        const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&userid='+props.userid+'&admin='+props.admin);  
        
        
       if(rese.data != ""){
          setAllProyectos(rese.data);                               
       }
        
    } 

    
    async function getActividadesProyecto(proyecto){     
         
        
        setActividadesProyecto([]);  
        var id = "getActividadesProyecto";  
        const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&date=&userid='+props.userid+'&termino=&proyecto='+proyecto);  
        setActividadesProyecto(res.data);   
        console.log(res.data);
        console.log("beneficios: "+ beneficios);
        var finalizadas =  setactividadesProyecto.filter((x) => (x.activo == 1 && x.estado == 3));
        finalizadas = finalizadas.length;        
        var creadas =  setactividadesProyecto.filter((x) => (x.activo == "1" && x.estado == "1"));
        creadas = creadas.length;  
        var proceso =  setactividadesProyecto.filter((x) => (x.activo == "1" && x.estado == "2"));
        proceso = proceso.length;  

            
        var beneficios = [finalizadas, creadas, proceso];
        var meses = ["Creadas","Proceso","Finalizadas"];
         midata = {
            labels: meses,
            datasets: [ // Cada una de las líneas del gráfico
                {
                    label: 'Beneficios',
                    data: beneficios,
                    tension: 0.5,
                    fill : true,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    pointRadius: 5,
                    pointBorderColor: 'rgba(255, 99, 132)',
                    pointBackgroundColor: 'rgba(255, 99, 132)',
                },
                {
                    label: 'Otra línea',
                    data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25]
                },
            ],
        };
   }
    

	

	 

  	return (
		<div className="container ">
			 <h1 className='bg-info text-center font-monospace fw-bold lh-base'>Graficas</h1>

             {setallProyectos.map(item => ( 
					<button id="filtrarproyeco" style={{width:'24%', marginTop:'0.5%', marginLeft:'1%'}}  class="btn btn-outline-success btn-sm" onClick={() => getActividadesProyecto(item.folio, item.proyecto)}  >
					{item.proyecto}
					</button>

			))}	
             <div>
                <p className='m-2'><b>Ejemplo #1: </b> Grafica de lineas basico</p>
                <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px",height:"230px"}}>
                 {(midata != null)?
                  <LineChart actividades={midata} />                 
                    :
                    <></>
                 }
                </div>
             </div>
             
             <hr className='mt-3 mb-2'></hr>

             <div>
                <p className='m-2'><b>Ejemplo #2: </b> Grafica de barras</p>
                <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px",height:"230px"}}>
                <BarsChart/>
                </div>
             </div>

             <hr className='mt-3 mb-2'></hr>

             <div>
                <p className='m-2'><b>Ejemplo #3: </b> Grafica circular</p>
                <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px",height:"230px"}}>
                    <PiesChart/>
                </div>
             </div>

        </div>
       
              
    
  );   
}



 



export default App;
