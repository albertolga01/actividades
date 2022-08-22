
import React,{useState, useEffect} from 'react';  
import axios from 'axios'; 
import {Nabvar} from './component/Navbar';  
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es'; 
import Modal from 'react-modal';
import './App.css'; 
import moment from 'moment';
import { BsArrowRepeat, BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
  
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'

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
 

  const customStylesC = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  width: '80%',
	  height: '95%',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };


  


function Solicitudes(props) {

	console.log(props.dptoid);


	let defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate() )


    const [date, setDate] = useState(defaultDate)

    const onSetDate = (event) => {
		var fecha = new Date(event.target.value); 
        setDate(fecha.addDays(1));
    }

	Date.prototype.addDays = function(days) {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	}

	
	const [esAdmin, setEsAdmin] = useState([]);
	const [listap, setListaP] = useState([]);
	const [listau, setListaU] = useState([]);
	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
	const [colaboradoresEP, setColaboradoresEP] = useState([]);
	const [colaboradoresRes, setcolaboradoresRes] = useState([]);
	
	const handleEventClick = ({ event, el }) => { 
		//var fecha = new Date(event.start);
		var fecha = (event.start).toLocaleDateString("es-MX");
		notify("Actividad: "+ event.title + " " + "Responsable: " + event.id + " Fecha: " + fecha); 
		console.log(event);
		};
	  
    
		function openModalLoad() { 
			setIsOpenLoad(true); 
			 }  
		   
			 function closeModalLoad() { 
			setIsOpenLoad(false); 
			 }
		
	useEffect(() => {
		getAllProyectos();
		// eslint-disable-next-line
	},[])
	
	useEffect(() => {
		getAllColaboradores();
		// eslint-disable-next-line
	},[])
	
	 


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
	
  
  
	async function getAllProyectos() {
	  var id = "getTodosProyectosGrupo";
	  const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&userid='+props.userid+'&admin='+props.admin);  
	  
	  
	 if(rese.data != ""){
		setListaP(rese.data); 
	 }
	  
  } 


  async function getAllColaboradores() {
	var id = "getAllColaboradoresGrupo";
	openModalLoad();
	const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&userid='+props.userid);  
	console.log(rese.data)
	closeModalLoad();
	if(rese.data != ""){
		setListaU(rese.data); 
	}
	
} 


async function getAllColaboradoresdelProyecto(){    
	//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
	setEsAdmin("0");
	var id = "getColabEnProyecto";
	var folio = document.getElementById('folioproyecto').value; 
	var rol = document.getElementById('rol');
	openModalLoad(); 
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folio='+folio);
	closeModalLoad();
	console.log(res.data);

	setcolaboradoresRes(res.data);
	//setColaboradoresEP(res.data);

	(res.data).forEach(myFunction);
	 
}



function myFunction(item) {
  if((props.userid == item.userid) && item.rol == "2"){
	setEsAdmin("1");
  }
}

 
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [modalIsOpenC, setIsOpenC] = React.useState(false);
	let subtitle; 
	const [lista, setLista] =  useState([]);  
	const [listados, setListaDos] =  useState([]);  
	const [value, setValue] = useState([]); 
	let id = 0; 
	let tipo = 0; 
 
 

	useEffect(() => {
		getSolicitudes(); 
	},[])

	

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


	  
	function openModalC() {
		setIsOpenC(true);
	  }
	
	  function afterOpenModalC() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = 'black';
	  }
	
	  function closeModalC() {
		setIsOpenC(false);
	  }



	  async function addSolicitud(){  
		openModalLoad();
		
	 	var actividad = document.getElementById("actividad").value;
		var descripcion = document.getElementById("descripcion").value;
		var folioresponsable = document.getElementById("folioresponsable").value; 
		 
		if((actividad.length > 1)){
		let fd = new FormData() 
		fd.append("id","addSolicitud")  
		fd.append("actividad",actividad) 
		fd.append("descripcion",descripcion)  
		fd.append("folioencargado", props.userid)   
		fd.append("folioresponsable", folioresponsable)   
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		closeModalLoad();
		notify(res.data.trim());
		
			
		} else {
			notify("No se puede agregar solicitud, favor de seleccionar un responsable y agregar el nombre de la solicitud");
		}
		getSolicitudes();
		//verRequisicion(folio);
	 
	}
 

	async function postFile(){
		let fd = new FormData() 
		fd.append("id", "16")
		fd.append("idorden", id)
		fd.append("tipo", tipo)
		fd.append("file", document.getElementById("input-cotizacion").files[0]) 
		
		const res = await axios.post(process.env.REACT_APP_API_URL,  fd, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
 
		notify(res.data.trim());
	}

	async function getSolicitudes(){    
		//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
		setLista([]);
		setListaDos([]);
		openModalLoad(); 
		var id = "getSolicitudes";
		var date = document.getElementById("input-fecha").value; 
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&date='+date+'&userid='+props.userid);
		closeModalLoad();
		console.log("Actividades"); 
		console.log(res.data); 
		var table = document.getElementById('productstable');
		setLista(res.data); 
		setListaDos(res.data); 
		 
	}

  	async function ActualizarStatus(id, folioencargado, actividad,folioresponsable){
		 
		var nv = document.getElementById('sel'+id);

		if(window.confirm('Actualizar estado de actividad con folio: ' + id)){
			let fd = new FormData() 
			fd.append("id", "actualizarEstadoActividad")
			fd.append("folio", id)
			fd.append("nuevoestado",nv.value)
			fd.append("nuevoestadotexto", nv.options[nv.selectedIndex].innerText)
			fd.append("name", props.name)
			fd.append("folioencargado", folioencargado)
			fd.append("folioresponsable", folioresponsable)
			fd.append("actividad", actividad)
			fd.append("tipo", "solicitud")
			const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
			console.log(res.data);
			notify(res.data.trim());
			getSolicitudes();
		}
	}

	async function Notificar(name, actividad){
          
        
        if(window.confirm('Enviar notificacion a: ' + name )){
             
            let fd = new FormData()  
            fd.append("id", "enviarNotificacionActividades")
            fd.append("mensaje", "La solicitud: " + actividad + " está pendiente" )
            fd.append("name", name)
            const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
            notify(res.data.trim());
        }
    }



	async function finalizado(id, folioresponsable, actividad){
		  

		if(window.confirm('Marcar actividad con folio: ' + id + ' como finalizada')){
			let fd = new FormData() 
			fd.append("id", "finalizado")
			fd.append("folio", id)
			fd.append("tipo", "solicitud") 
			fd.append("folioresponsable", folioresponsable)
			fd.append("actividad", actividad)
			const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
			console.log(res.data);
			notify(res.data.trim());
			getSolicitudes();
		}
	}

	 

	function formatDate(date){
		var index = date.search(" ");
		date = date.substring(0, index);
		date = date.split("-");
		var formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
		return(formatedDate);
	}



	function diff (start, end) {
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

	 


	function getColor(date){
		var color = "";  
	    var dateActividad = date.slice(0, 10);
		var dateToday = new Date().toISOString().slice(0, 10); 
		var diffs = diff(dateActividad, dateToday);
		//var diffs = 0;
		//alert(diffs);
		if (diffs >= 0) {
			//rojo    
			 color = "rgba(245, 15, 15, 0.71)";
			 
		 }else if(diffs >= -3) {  
			 //naranja 
	     	 color = "rgba(255, 122, 5, 0.71)";
				
		 } else if(diffs >= -7){
			 // verde
			 color = "rgba(18, 255, 5, 0.71)";
		 }else{
			 color = "";
		 }
 			   
		 return color;
	}

	function eliminarActividad(folio){
		let toSend = new FormData();
		toSend.append("id", "eliminarActividad");/////////ALIVIANESE PADRINOLI SIUU
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
				notify("Actividad eliminada");
				getSolicitudes();
				//cleanForm();
			}
		})
	}

	function onTodoChange(event) {
        // update the state
    this.setState({name: event.target.value});
} 


async function actualizarFecha(folio) {
	var date = document.getElementById(folio).value;
	if(window.confirm('Actualizar fecha de actividad con folio: ' + folio + ' al día: ' + date)){ 
		let fd = new FormData() 
		fd.append("id", "actualizarFechaActividad")
		fd.append("folio", folio)
		fd.append("fecha", date)
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		console.log(res.data);
		notify(res.data.trim());
		getSolicitudes();
	}    
	


  }
	async function getUsuarios(){
		var id = "2";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id); 
		console.log(rese.data);
		setValue(rese.data);    
		setListaU(rese.data);    
	} 

	async function actualizarComentarios(folio){
		if(window.confirm('Actualizar observaciones de la solicitud con folio: ' + folio)){ 
			let fd = new FormData() 
			fd.append("id", "actualizarComentarios")
			fd.append("folio", folio) 
			fd.append("comentarios", document.getElementById("observacionesActividades"+folio).value) 
			const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
			console.log(res.data);
			notify(res.data);
			getSolicitudes();
		}
	
	}

	function notify(message){
        toast(message);
    }
   

  		// Dynamically create select list
	let options = [];

	return (
		<div className="container ">
			<input id='input-cotizacion' type='file' style={{display:'none'}} onChange={()=> postFile()}></input>
			<div style={{width:'100%'}} align="center">
			<Nabvar titulo="Solicitudes" departamento={props.rzonsocial} dptoid={props.dptoid}/>    
			</div>
			<div style={{width:'100%'}} align="right">
			<button style={{marginRight:'10px'}} onClick={openModal} class="btn btn-outline-success btn-sm">Nueva solicitud</button><br></br>
			<button style={{marginTop:'5px', marginRight:'10px',  width:'75px'}} onClick={() => getSolicitudes()} class="btn btn-outline-success btn-sm">Actualizar</button>
			<button onClick={openModalC} class="btn btn-outline-success btn-sm" hidden="hidden">Calendario</button> 

      
	  <Modal
	isOpen={modalIsOpen}
	onAfterOpen={afterOpenModal}
	onRequestClose={closeModal}
	style={customStyles}
	contentLabel="Example Modal"
  >
	<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Nueva solicitud</h2>
	
	<div>Solicita:</div>   
	<input id="foliosolicita" type="text" value={props.name} style={{ width: '100%', marginTop: '5px' }}    />
	


							  

	<div>Responsable:</div>

		  
		 
		  <select id="folioresponsable" style={{ width: '100%', marginTop: '5px' }}>
		  {listau.map(item => (
			<option value={item.userid}>{item.name}</option>

			))}
			 </select> 
		  
		  <>
		  <input id="folioresponsable" type="text" value={props.userid} style={{ width: '100%', marginTop: '5px' }} hidden="hidden" />
		  </>
		    
		    
	 	 
	 
	 
	<input id="folioencargado" type="text" value={props.userid} style={{width:'100%', marginTop:'5px'}} hidden="hidden" />
	 
	<div>Actividad:</div>
	<input id="actividad" type="text"  style={{width:'100%', marginTop:'5px'}}/>

	<div>Descripción:</div>
	<input id="descripcion" type="text"  style={{width:'100%', marginTop:'5px'}}/>
	
	 
	
<br></br>
<br></br>
	<button onClick={closeModal} class="btn btn-outline-danger btn-sm " style={{ height:'45px'}}>Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<button onClick={() => addSolicitud()} class="btn btn-outline-success btn-sm"  style={{ height:'45px'}}>Guardar</button>
  </Modal>

  <Modal
	isOpen={modalIsOpenC}
	onAfterOpen={afterOpenModalC}
	onRequestClose={closeModalC}
	style={customStylesC}
	contentLabel="Example Modal"
  >
	<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Calendario de solicitudes</h2>
	
 
	<FullCalendar
  plugins={[ dayGridPlugin ]}
  initialView="dayGridMonth"
  weekends={true}
  locale={esLocale}
  events={lista}
/>


		<br></br> 
	<button onClick={closeModal} class="btn btn-outline-danger btn-sm ">Cerrar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 
  </Modal>
  </div> 
			<div className="row p-3">
				<div>
					<span>Filtrar por fecha: &nbsp; </span>
					<input id='input-fecha' type='date' style={{width:'auto',fontSize:'12px', cursor:'pointer'}} onChange={() => getSolicitudes()}></input>
				</div>
				{ (props.admin == 1) ? 
				<div>
				<select id="filtrarproyecto" style={{width:'320px', marginTop:'5px'}}   onChange={() => filterProyecto()}>
				{listap.map(item => ( 
							<option value={item.proyecto}>{item.proyecto}</option>

				))}
				</select>
				</div>
				: 
				<div> 
				</div>			
				}
				
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
							<th>Solicita</th>
							<th>Responsable</th>
							<th>Actividad</th>
							<th>Descripción</th>
							
							<th>Inicio</th> 
							<th>Estado</th> 
							<th>Observaciones</th>
							<th></th>
							<th>Finalizado</th> 
							<th>Eliminar</th>
							
							  
							

						</tr>

						{ lista.map(item => ( 
							 
						<tr style={{  fontSize:'13.5px', border: '2px solid #ABB2B9'}}>
							 
							<td className='id-orden'>{item.folio}</td>
							<td><label>{item.encargado}</label></td>
							<td><label onClick={() => Notificar(item.name, item.actividad)}>{item.name}</label></td>
							<td>{item.actividad}</td>
							<td>{item.descripcion}</td> 
							
							<td>{formatDate(item.fechainicio)}</td> 
						 	<td>
								 
								<select id={'sel'+item.folio} name={item.est} onChange={() => ActualizarStatus(item.folio, item.folioencargado, item.actividad, item.folioresponsable)}>
								<option value="1">{item.est}</option>
								<option value="2">En Proceso</option>
								<option value="3">Terminado</option>
								</select>  
							</td>
							<td align='center'><input defaultValue={item.comentarios} id={"observacionesActividades"+item.folio} style={{width:'100%', height:'31px' }}></input></td>
							<td><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarComentarios(item.folio)}><BsArrowRepeat /></button></td>
							
							{ (item.folioencargado == props.userid) ? 
							<td>
							<button className='btn btn-outline-success btn-sm' onClick={ () => finalizado(item.folio, item.folioresponsable, item.actividad) }>Finalizado</button>
						</td>
                         : 
						 <td>
						 	</td>
                          
							}
							{ (item.folioencargado == props.userid) ? 
							<td>
							<button className='btn btn-outline-danger btn-sm' onClick={ () => eliminarActividad(item.folio) }>Eliminar</button>
						</td>
                         : 
						 <td>
						 	</td>
                          
							}
						  	
							
						</tr> 
						))}	
					</table> 
				</div>
				<Modal 
						isOpen={modalIsOpenLoad}  
						onRequestClose={closeModalLoad}   
						style={customStyles}> 
						<div style={{width:'100%'}}>  
						<ThreeDots color="#0071ce" height={80} width={80} /> 
						</div>  
				</Modal>
			{/*				<h2>Calendario de solicitudes</h2>
		 	<FullCalendar
  plugins={[ dayGridPlugin ]}
  initialView="dayGridMonth"
  weekends={true}
  locale={esLocale}
  events={lista}
  eventClick={handleEventClick}
/>*/}	
			</div>

			
			<ToastContainer 
				progressClassName="toastProgress"
				position="top-center"
				/>
		</div>
	);   
}

export default Solicitudes;
