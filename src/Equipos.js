
import React,{useState, useEffect} from 'react'; 
import  {FaCheckCircle} from 'react-icons/fa'
import axios from '../node_modules/axios'; 
import {Nabvar} from './component/Navbar';  
import Modal from 'react-modal';
import './App.css'; 

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

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




function Equipos(props) {


	let defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate() )

    const [date, setDate] = useState(defaultDate)

    const onSetDate = (event) => {
        setDate(new Date(event.target.value))
    }

	function notify(message){
		toast(message);
	}

	function openModalLoad() { 
		setIsOpenLoad(true); 
		 }  
	   
		 function closeModalLoad() { 
		setIsOpenLoad(false); 
		 }

	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
	const [listap, setListaP] = useState([]);
	const [listapd, setListaPD] = useState([]); 
	const [listau, setListaU] = useState([]);
	const [listatipoe, setListatipoe] = useState([]);
	
	const [listaver, setListaVer] = useState([]);
	const [registros, setRegistros] = useState([]);
   
	const [fecha, setFecha] = useState([]);
   
	useEffect(() => {
		getTodosEquipos();
		getTiposEquipos();
		dateToday();
	}, [])
  
	function dateToday(){
		var date = new Date();

		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();

		if (month < 10) month = "0" + month;
		if (day < 10) day = "0" + day;

		var today = year + "-" + month + "-" + day;
		//document.getElementById('fechatermino').value = today;
		setFecha(today)
	 }
  
	async function getTodosEquipos() {
	  var id = "getTodosEquipos";
	  openModalLoad();
	  const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id);  
	  closeModalLoad();
	  setRegistros(rese.data.length);
	  setListaP(rese.data);
	  
	  setListaPD(rese.data);
	  console.log(rese.data);
  } 

  async function getTiposEquipos() {
	var id = "getTiposEquipos";
	openModalLoad();
	const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id);  
	closeModalLoad();
	setListatipoe(rese.data); 
	console.log(rese.data);
} 

 

	const [listav, setListaV] = useState([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	let subtitle; 

	const [lista, setLista] =  useState([]);  
	const [value, setValue] = useState([]); 
	let id = 0; 
	let tipo = 0; 
 
	

	useEffect(()=> {
		getEquipos();
	}, [])

	useEffect(()=> {
		getUsuarios();
	}, [])



	function openModal() {
		setIsOpen(true);
	  }
	
	  function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = 'black';
	  }
	
	  function closeModal() {
		setIsOpen(false);
	  }



	  async function addEquipo(){  
		var folioresponsable = document.getElementById("folioresponsable").value; 
		var equipo = document.getElementById("equipo").value;
		var marca = document.getElementById("marca").value;
		var descripcion = document.getElementById("descripcion").value;
		var observaciones = document.getElementById("observaciones").value;
		var fechaasignacion = document.getElementById("fechaasignacion").value; 
		var tipoequipo = document.getElementById("tipoequipo").value; 
		let fd = new FormData() 
		fd.append("id","addEquipo") 
		fd.append("folioresponsable",folioresponsable)  
		fd.append("equipo",equipo) 
		fd.append("marca",marca)  
		fd.append("descripcion",descripcion)   
		fd.append("observaciones",observaciones)   
		fd.append("fechaasignacion", fechaasignacion)    
		fd.append("tipoequipo", tipoequipo)    
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		notify(res.data.trim());
		getEquipos();
		getTodosEquipos();
		//verRequisicion(folio);
	 
	}
  
 

	function filterName() {
		var name = document.getElementById('filtrarporcolab').value;  
		var result = listapd.filter((x) => (x.name === name)); 
		setListaP(result);
		setRegistros(result.length);
	}

 

	async function getEquipos(){    
		//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
		 
		var id = "getActividades"; 
		openModalLoad();
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&userid='+props.userid);
		closeModalLoad();
		console.log("Equipos"); 
		console.log(res.data); 
		var table = document.getElementById('productstable');
		setLista(res.data); 
		 
	}

   
	 

	 

	function formatDate(date){
		let index = date.search(" ");
		date = date.substring(0, index);
		date = date.split("-");
		let formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
		return(formatedDate);
	}

	function eliminarEquipo(folio){ 
		let toSend = new FormData();
		toSend.append("id", "eliminarEquipo");/////////ALIVIANESE PADRINOLI SIUU
		toSend.append("folio", folio);

		fetch(process.env.REACT_APP_API_URL, {
			method: "POST",
			mode: "cors",
			body: toSend
		})
		.then(response => response.text())
		.catch(error => alert(error))
		.then((data)=> {
			if(data){
				notify("Equipo eliminado");
				getTodosEquipos();
				//cleanForm();
			}
		})
	}

	async function getUsuarios(){
		var id = "getUsuarios";
		openModalLoad();
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id); 
		closeModalLoad();
		//console.log(rese.data);
		setValue(res.data);    
	} 

	 
	
   

  		// Dynamically create select list
	let options = [];

	return (
		<div className="container ">
			 

			<Nabvar titulo="Equipos" departamento={props.rzonsocial} dptoid={props.dptoid}/>    
			<div style={{width:'100%'}} align="right">
			<button style={{ marginRight:'10px', width:'75px'}} onClick={openModal} class="btn btn-outline-success btn-sm">Nuevo</button><br></br>
			<button style={{marginTop:'5px', marginRight:'10px',  width:'75px'}} onClick={() => getTodosEquipos()} class="btn btn-outline-success btn-sm">Actualizar</button>
      
       
	  <Modal
	isOpen={modalIsOpen}
	onAfterOpen={afterOpenModal}
	onRequestClose={closeModal}
	style={customStyles}
	contentLabel="Example Modal"
  >
	<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Asignar equipo</h2>
	
 
	<div>Responsable:</div>
	


		  { (props.admin == 1) ? 
							<select id="folioresponsable" style={{width:'100%', marginTop:'5px'}}>
							{value.map(item => ( 
									   <option value={item.userid}>{item.name}</option>
				  
							  ))}
							</select>
                         : 
						 <div>
							<input id="nombreresponsable" type="text" value={props.name} style={{width:'100%', marginTop:'5px'}} />
							<input id="folioresponsable" type="text" value={props.userid} style={{width:'100%', marginTop:'5px'}} hidden="hidden" />
						 </div>
                          
							}
	 
	 
	 <div>Equipo:</div>
	<input id="equipo" type="text"  style={{width:'100%', marginTop:'5px'}}/>
	<div>Tipo equipo:</div>
	<select id="tipoequipo" style={{width:'320px', marginTop:'5px'}}  >
				{listatipoe.map(item => ( 
							<option value={item.folio}>{item.nombre}</option>

				))}
				</select>
 
	<div>Marca:</div>
	<input id="marca" type="text"  style={{width:'100%', marginTop:'5px'}}/>

	<div>Descripción:</div>
	<input id="descripcion" type="text"  style={{width:'100%', marginTop:'5px'}}/>
	
	<div>Fecha de asignación:</div>
	<input id="fechaasignacion"    style={{width:'100%', marginTop:'5px'}} type="date" defaultValue={fecha}/>
	
	<div>Observaciones:</div>
	<input id="observaciones" type="text"  style={{width:'100%', marginTop:'5px'}}/>
	  
	
<br></br>
<br></br>
	<button onClick={closeModal} class="btn btn-outline-danger btn-sm " style={{ height:'45px'}}>Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<button onClick={() => addEquipo()} class="btn btn-outline-success btn-sm" style={{ height:'45px'}} >Guardar</button>
  </Modal>
  </div>
			<div className="row p-3">
				 
			<div>
				<label>Nombre: </label>&nbsp;&nbsp;
				<select id="filtrarporcolab" style={{width:'auto', marginTop:'5px'}}  onChange={() => filterName()} >
							{value.map(item => ( 
									   <option value={item.name}>{item.name}</option>
				  
							  ))}
							</select> 
				</div>
				<div  style={{height:'100%', overflowY: 'scroll', width:'100%'}}>
					<table id="productstable" style={{width:'100%'}}>
						<tr>
							<th>Folio</th>
							<th>Tipo Equipo</th>
							<th>Equipo</th>
							<th>Marca</th>
							<th>Descripción</th>
							<th>Asignación</th>
							<th>Responsable</th>
							<th>Departamento</th> 
							<th>Observaciones</th> 
							<th>Eliminar</th>
						</tr>

						{ listap.map(item => ( 
						<tr id="tabletr" style={{  fontSize:'13.5px', border: '2px solid #ABB2B9'}}>
							<td className='id-orden'>{item.id}</td> 
							<td>{item.tipoequipo}</td>
							<td>{item.equipo}</td>
							<td>{item.marca}</td>
							<td>{item.descripcion}</td>
							<td>{formatDate(item.fechaasignacion)}</td>
							<td>{item.name}</td>
							<td>{item.nombredepartamento}</td> 
							<td>{item.observaciones}</td>  
						 
							 
							{ (props.admin == 1) ? 
							<td>
							<button className='btn btn-outline-danger btn-sm' onClick={ () => eliminarEquipo(item.id) }>Eliminar</button>
						</td>
                         : 
						 <td>
						 	</td>
                          
							}
						  
							
						</tr> 
						))}	
						<tr>
							<td colSpan={2}>Registros: {registros}</td>
						</tr>
					</table> 
				</div>

                 
			</div>
			<Modal 
					isOpen={modalIsOpenLoad}  
					onRequestClose={closeModalLoad}   
					style={customStyles}> 
					<div style={{width:'100%'}}>  
					<ThreeDots color="#0071ce" height={80} width={80} /> 
					</div>  
			</Modal>


			<ToastContainer 
				progressClassName="toastProgress"
				position="top-center"
				/>
		</div>
	);   
}

export default Equipos;
