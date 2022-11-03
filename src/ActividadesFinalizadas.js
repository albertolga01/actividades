
import React,{useState, useEffect} from 'react'; 
import  {FaCheckCircle} from 'react-icons/fa'
import axios from '../node_modules/axios'; 
import {Nabvar} from './component/Navbar';   
import './App.css'; 
import Modal from 'react-modal';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'

 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

function ActividadesFinalizadas(props) {


	
const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };


	const [listap, setListaP] = useState([]);
	const [listau, setListaU] = useState([]);
	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
	 
	function openModalLoad() { 
		setIsOpenLoad(true); 
		 }  
	   
		 function closeModalLoad() { 
		setIsOpenLoad(false); 
		 }


   
	useEffect(() => {
		getAllProyectos();
	}, [])
  
	
	useEffect(() => {
		getAllColaboradores();
	}, [])
  
	async function getAllProyectos() {
	  var id = "getTodosProyectos";
	  const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id);  
	  setListaP(rese.data);
	  console.log(rese.data);
  } 


  function filterProyecto() {
	var proyectos = document.getElementById('filtrarproyecto').value;  
	var result = listados.filter((x) => (x.proyecto === proyectos)); 
	setLista(result);
}

function filterName() {
	var name = document.getElementById('filtrarporcolab').value;  
	var result = listados.filter((x) => (x.name === name)); 
	setLista(result);
}
 

function formatDate(date){
	var index = date.search(" ");
	date = date.substring(0, index);
	date = date.split("-");
	var formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
	return(formatedDate);
}


async function getAllColaboradores() {
	var id = "getAllColaboradoresGrupo";
	const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&userid='+props.userid);  
	setListaU(rese.data);
	console.log(rese.data);
} 

 

	const [lista, setLista] =  useState([]);  
	const [listados, setListaDos] =  useState([]);  
	const [value, setValue] = useState([]); 
	let id = 0; 
	let tipo = 0; 
 

	function notify(message){
		toast(message);
	}


	useEffect(()=> {
		getActividades();
	}, [])

	useEffect(()=> {
		getUsuarios();
	}, [])

 


	 

	  function diff(start, end) {
		var date1 = new Date(start);
		var date2 = new Date(end);
		// One day in milliseconds
		var oneDay = 1000 * 60 * 60 * 24;

		// Calculating the time difference between two dates
		var diffInTime = date2.getTime() - date1.getTime();
	
		// Calculating the no. of days between two dates
		var diffInDays = Math.round(diffInTime / oneDay);
	
		return diffInDays;
	 }
	 
 

	async function getActividades(){    
		//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
		 
		var id = "getActividadesFinalizadas";
		openModalLoad();
		var date = document.getElementById("input-fecha").value; 
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&date='+date+'&userid='+props.userid);
		closeModalLoad();
		console.log("Actividades"); 
		console.log(res.data); 
		var table = document.getElementById('productstable');
		setLista(res.data); 
		setListaDos(res.data); 
	}

  	 
 

	 
	 

	async function getUsuarios(){
		var id = "getUsuarios";
		openModalLoad();
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id); 
		closeModalLoad();
		//console.log(rese.data);
		setValue(rese.data);    
	} 
   

  		// Dynamically create select list
	let options = [];

	return (
		<div className="container "> 
			<Nabvar titulo="Actividades Finalizadas" departamento={props.rzonsocial} dptoid={props.dptoid}/>    
			<div style={{width:'100%'}} align="right">
			<button style={{marginTop:'5px', marginRight:'10px',  width:'75px'}} onClick={() => getActividades()} class="btn btn-outline-success btn-sm">Actualizar</button>
			 
	  
  </div>
			<div className="row p-3">
				<div>
					<label style={{width:'223px'}}>Filtrar por fecha: &nbsp; </label>
					<input id='input-fecha' type='date' style={{width:'97px',fontSize:'12px', cursor:'pointer'}} onChange={() => getActividades()}></input>
				</div>
				<div>
					<select id="filtrarproyecto" style={{width:'320px', marginTop:'5px'}}   onChange={() => filterProyecto()}>
					{listap.map(item => ( 
								<option value={item.proyecto}>{item.proyecto}</option>

					))}
					</select>
				</div>
				{ (props.admin == 1) ? 
					<div>
				<select id="filtrarporcolab" style={{width:'320px', marginTop:'5px'}}  onChange={() => filterName()}>
							{listau.map(item => ( 
									   <option value={item.name}>{item.name}</option>
				  
							  ))}
							</select>
				</div>
				: 
<div> 
				</div>
				}

				
				<div  style={{height:'100%', overflowY: 'scroll', width:'100%'}}>
					<table id="productstable" style={{width:'100%'}}>
						<tr>
							<th>Folio</th>
							<th>Responsable</th>
							<th>Proyecto</th>
							<th>Actividad</th>
							<th>Descripción</th> 
							<th>Observaciones</th> 
							<th>Inicio</th> 
							<th>Término</th> 
							<th>Duración</th> 
						</tr>

						{ lista.map(item => ( 
						<tr>
							<td className='id-orden'>{item.folio}</td>
						 
							<td>{item.name}</td>
							<td>{item.proyecto}</td>
							<td>{item.actividad}</td>
							<td>{item.descripcion}</td> 
							<td>{item.observaciones}</td> 
							<td>{formatDate(item.fechainicio)}</td> 
							<td>{formatDate(item.fechatermino)}</td> 
							<td align='center'>{diff(item.fechai, item.fechat) + ' día(s)'}</td>
						 
						  
							
						</tr> 
						))}	
					</table> 
				</div> 

                 
			</div>

			<ToastContainer 
				progressClassName="toastProgress"
				position="top-center"
				/>

			<Modal 
						isOpen={modalIsOpenLoad}  
						onRequestClose={closeModalLoad}   
						style={customStyles}> 
						<div style={{width:'100%'}}>  
						<ThreeDots color="#0071ce" height={80} width={80} /> 
						</div>  
				</Modal>
		</div>
	);   
}

export default ActividadesFinalizadas;
