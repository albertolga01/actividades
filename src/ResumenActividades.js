 
import React,{useState, useEffect} from 'react'; 
import  {FaCheckCircle, FaTrash, FaEdit} from 'react-icons/fa'
import axios from '../node_modules/axios';
import {Nabvar} from './component/Navbar'; 

import './App.css'; 
import LinesChart from './LineChart';

function App(props) {


    

	useEffect(()=> { 
	}, [])

	 

  	return (
		<div className="container ">
			 <h1 className='bg-info text-center font-monospace fw-bold lh-base'>Graficas</h1>
             <div>
                <p className='m-2'><b>Ejemplo #1: </b> Grafica de lineas basico</p>
                <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px",height:"230px"}}>
                    <LinesChart/>
                </div>
             </div>
             
             <hr className='mt-3 mb-2'></hr>

             <div>
                <p className='m-2'><b>Ejemplo #2: </b> Grafica de barras</p>
                <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px",height:"230px"}}></div>
             </div>

             <hr className='mt-3 mb-2'></hr>

             <div>
                <p className='m-2'><b>Ejemplo #3: </b> Grafica circular</p>
                <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px",height:"230px"}}></div>
             </div>

        </div>
       
              
    
  );   
}



 



export default App;
