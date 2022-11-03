
import React,{useState, useEffect} from 'react';  
import axios from '../node_modules/axios'; 
import {Nabvar} from './component/Navbar';  
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es'; 
import Modal from 'react-modal';
import './App.css'; 
import { FaBeer, FaReact, Farefr } from 'react-icons/fa';
import { AiFillAlert } from "react-icons/ai";
import { BsArrowRepeat, BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";

import moment from 'moment';
 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'


import Pusher from 'pusher-js'; 

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


  



function Actividades(props) {

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

	const [colaboradores, setColaboradores] =  useState([]);  
	const [esAdmin, setEsAdmin] = useState([]);
	const [listap, setListaP] = useState([]);
	const [listau, setListaU] = useState([]);
	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
	const [modalIsOpen1, setIsOpen1] = React.useState(false);
	const [colaboradoresEP, setColaboradoresEP] = useState([]);
	const [colaboradoresRes, setcolaboradoresRes] = useState([]);
	const [nombreproyecto, setNombreproyecto] = useState([]);
	const [folioProyecto, setfolioProyecto] = useState([]);
	const [folioActividad, setFolioActividad] = useState([]);
	

	const [registros, setRegistros] = useState([]);
	
	const handleEventClick = ({ event, el }) => { 
		//var fecha = new Date(event.start);
		var fecha = (event.start).toLocaleDateString("es-MX");
		notify("Poyecto: "+ event.display+ " Actividad: "+ event.title + " " + "Responsable: " + event.id + " Fecha: " + fecha); 
	 
		};
		function notify(message){
			toast(message);
		}
	
		function closeModal1() {
			setIsOpen1(false);
		  }
		
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
		console.log(rese.data); 
	 }
	  
  } 


  async function getAllColaboradores() {
	var id = "getAllColaboradoresGrupo";
	openModalLoad();
	const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&userid='+props.userid);  
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
 
 
	const [listaproyectos, setListaProyectos] =  useState([]);

	useEffect(() => {
		getActividades(); 
	},[])

	

	useEffect(()=> {
		getUsuarios();
		notificaciones();
	}, [])


	function notificaciones(){

		var pusher = new Pusher('5238df05729a28dcfb1a', { 
		cluster: 'us3' 
		}); 
		var channel = pusher.subscribe('my-channel'); 
			channel.bind('my-event', function(data) { 
				//	alert(data.mensaje + " " + data.userid + " " + JSON.stringify(data)); 
				//console.log(usuario);
				if(data.userid === props.userid && data.tipo === "act"){   
					getActividades();
					
				}
			 
		});
	
		}
	


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


	  async function Notificar(name, actividad){
          
        
        if(window.confirm('Enviar notificacion a: ' + name )){
             
            let fd = new FormData()  
            fd.append("id", "enviarNotificacionActividades")
            fd.append("mensaje", "La actividad: " + actividad + " está pendiente" )
            fd.append("name", name)
            const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
            notify(res.data.trim());
        }
    }


	  async function addActividad(){  
		openModalLoad();
		
		var folioproyecto = document.getElementById("folioproyecto").value;
		var actividad = document.getElementById("actividad").value;
		var descripcion = document.getElementById("descripcion").value;
		var fechatermino = document.getElementById("fechatermino").value;
		var folioencargado = document.getElementById("folioencargado").value;
		var folioresponsable = document.getElementById("folioresponsable").value; 
		 
		if((folioproyecto != "Seleccione") && (actividad.length > 1)){
		let fd = new FormData() 
		fd.append("id","addActividad") 
		fd.append("folioproyecto",folioproyecto) 
		fd.append("actividad",actividad.replaceAll("'", "´").replaceAll('"', "´´")) 
		fd.append("descripcion",descripcion.replaceAll("'", "´").replaceAll('"', "´´")) 
		fd.append("fechatermino", fechatermino)   
		fd.append("folioencargado", folioencargado)   
		fd.append("folioresponsable", folioresponsable)   
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		closeModalLoad();
		notify(res.data.trim());
		
		} else {
			notify("No se puede agregar actividad, favor de seleccionar un proyecto y agregar el nombre de la actividad");
		}
		getActividades();
		//verRequisicion(folio);
	 
	}
  
 

	async function getActividades(){    
		//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
		setLista([]);
		setListaDos([]);
		openModalLoad(); 
		var id = "getActividades";
		var date = document.getElementById("input-fecha").value; 
		var termino = document.getElementById("input-fecha-termino").value; 
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&date='+date+'&userid='+props.userid+'&termino='+termino);
		closeModalLoad();
		console.log("Actividades"); 
		console.log(res.data); 
		var table = document.getElementById('productstable');
		setLista(res.data); 
		setListaDos(res.data);  
		var lista = res.data;
		var listadeproyectos = lista.filter( (ele, ind) => ind === lista.findIndex( elem => elem.proyecto === ele.proyecto))
		setRegistros(res.data.length);
		setListaProyectos(listadeproyectos);
	}




  	async function ActualizarStatus(id, folioencargado, actividad, folioresponsable){
		 
		var nv = document.getElementById('sel'+id); 
		if(window.confirm('Actualizar estado de actividad con folio: ' + id)){
			let fd = new FormData() 
			fd.append("id", "actualizarEstadoActividad")
			fd.append("folio", id)
			fd.append("nuevoestado", nv.value)
			fd.append("nuevoestadotexto", nv.options[nv.selectedIndex].innerText)
			fd.append("name", props.name)
			fd.append("folioencargado", folioencargado)
			fd.append("actividad", actividad)
			fd.append("tipo", "actividad")
			fd.append("folioresponsable", folioresponsable)
			const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
			console.log(res.data);
			notify(res.data.trim());
			getActividades();
		}
	}


	async function finalizado(id, folioresponsable,actividad){
		  

		if(window.confirm('Marcar actividad con folio: ' + id + ' como finalizada')){
			let fd = new FormData() 
			fd.append("id", "finalizado")
			fd.append("folio", id)
			fd.append("tipo", "actividad") 
			fd.append("folioresponsable", folioresponsable) 
			fd.append("actividad", actividad)
			const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
			console.log(res.data);
			notify(res.data.trim());
			getActividades();
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
		//notify(diffs);
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
		if(window.confirm('Eliminar actividad con folio: ' + folio)){ 
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
					getActividades();
					//cleanForm();
				}
			})
		}
	}

	function onTodoChange(event) {
        // update the state
    this.setState({name: event.target.value});
} 


async function actualizarComentarios(folio){
	if(window.confirm('Actualizar observaciones de la actividad con folio: ' + folio)){ 
		let fd = new FormData() 
		fd.append("id", "actualizarComentarios")
		fd.append("folio", folio) 
		fd.append("comentarios", document.getElementById("observacionesActividades"+folio).value)
		fd.append("actividad", document.getElementById("actividad1"+folio).value)
		fd.append("descripcion", document.getElementById("descripcion1"+folio).value)
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		console.log(res.data);
		notify(res.data.trim());
		getActividades();
	}

}


async function actualizarFecha(folio) {
	var date = document.getElementById(folio).value;
	if(window.confirm('Actualizar fecha de actividad con folio: ' + folio + ' al día: ' + (date).split("-").reverse().join("/"))){ 
		let fd = new FormData() 
		fd.append("id", "actualizarFechaActividad")
		fd.append("folio", folio)
		fd.append("fecha", date)
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		console.log(res.data); 
		notify(res.data.trim());
		getActividades();
	}    
	


  }
	async function getUsuarios(){
		var id = "getUsuarios";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id); 
		//console.log(rese.data);
		setValue(rese.data);    
	}
	

	async function actualizarResponsable(proyecto, folioproyecto, folioactividad){
		setIsOpen1(true);	
		setNombreproyecto(proyecto); 
		setfolioProyecto(folioProyecto); 
		setFolioActividad(folioactividad);
		setColaboradoresEP([]);
		var id = "getColabEnProyecto";  
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folio='+folioproyecto);
		console.log(res.data); 
		setColaboradoresEP(res.data);

	}
	async function actualizarResponsable1(){
 
		if(window.confirm('¿Actualizar responsable?')){ 
			let fd = new FormData() 
			fd.append("id", "actualizarResponsableActividad")
			fd.append("userid", document.getElementById("foliocolab").value)
			fd.append("folioActividad", folioActividad)
			const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
			console.log(res.data); 
			notify(res.data.trim());
			getActividades();
			setIsOpen1(false);
		}    

	}



	
   
	
  		// Dynamically create select list
	let options = [];

	return (
		<div className="container ">
			 
			<div style={{width:'100%'}} align="center">
			<Nabvar titulo="Actividades" departamento={props.rzonsocial} dptoid={props.dptoid}/>    
			</div>
			<div style={{width:'100%'}} align="right">
			<button style={{marginRight:'10px'}} onClick={openModal} class="btn btn-outline-success btn-sm">Nueva Actividad</button><br></br>
			
			<button onClick={openModalC} class="btn btn-outline-success btn-sm" hidden="hidden">Calendario</button> 

      
	  <Modal
	isOpen={modalIsOpen}
	onAfterOpen={afterOpenModal}
	onRequestClose={closeModal}
	style={customStyles}
	contentLabel="Example Modal"
  >
	<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Nueva Actividad</h2>
	
	<div>Proyecto:</div> 
	<select id="folioproyecto" style={{width:'100%', marginTop:'5px'}}  onChange={()=> getAllColaboradoresdelProyecto()}>
		 <option>Seleccione</option>
		  {listap.map(item => ( 
                     <option value={item.folio}>{item.proyecto}</option>

  		  ))}
		  </select>


							  

	<div>Responsable:</div>

		  { 
		  (esAdmin == "1") ?  
		  <select id="folioresponsable" style={{ width: '100%', marginTop: '5px' }}>
		  {colaboradoresRes.map(item => (
			<option value={item.userid}>{item.name}</option>

			))}
			 </select> 
		  :
		  <>
		  <input id="nombreresponsable" type="text" value={props.name} style={{ width: '100%', marginTop: '5px' }} />
		  <input id="folioresponsable" type="text" value={props.userid} style={{ width: '100%', marginTop: '5px' }} hidden="hidden" />
		  </>
		    }
		    
	 	 
	 
	 
	<input id="folioencargado" type="text" value={props.userid} style={{width:'100%', marginTop:'5px'}} hidden="hidden" />
	 
	<div>Actividad:</div>
	<input id="actividad" type="text"  style={{width:'100%', marginTop:'5px'}}/>

	<div>Descripción:</div>
	<input id="descripcion" type="text"  style={{width:'100%', marginTop:'5px'}}/>
	
	<div>Fecha de término estimada:</div>
	<input id="fechatermino"    style={{width:'100%', marginTop:'5px'}} type="date" value={date.toLocaleDateString('en-CA')} onChange={onSetDate}/>
	  
	
<br></br>
<br></br>
	<button onClick={closeModal} class="btn btn-outline-danger btn-sm " style={{ height:'45px'}}>Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<button onClick={() => addActividad()} class="btn btn-outline-success btn-sm"  style={{ height:'45px'}}>Guardar</button>
  </Modal>

  <Modal
	isOpen={modalIsOpenC}
	onAfterOpen={afterOpenModalC}
	onRequestClose={closeModalC}
	style={customStylesC}
	contentLabel="Example Modal"
  >
	<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Calendario de actividades</h2>
	
 
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
					<span>Filtrar por fecha: </span>
					<input id='input-fecha' type='date' style={{width:'96px',fontSize:'12px', cursor:'pointer'}} onChange={() => getActividades()}></input>
					<span>&nbsp; </span>
					<input id='input-fecha-termino' type='date' style={{width:'97px',fontSize:'12px', cursor:'pointer'}} onChange={() => getActividades()}></input>
					<span>&nbsp; </span>
					<button  onClick={() => getActividades()} class="btn btn-outline-success btn-sm">Filtrar</button>
				</div>
				{ (props.admin == 1 ) ? 
				<div>
				<select id="filtrarproyecto" style={{width:'320px', marginTop:'5px'}}   onChange={() => filterProyecto()}>
				{listap.map(item => ( 
							<option value={item.proyecto}>{item.proyecto}</option>

				))}
				</select>
				</div>
				: 
				<div> 
					<select id="filtrarproyecto" style={{width:'320px', marginTop:'5px'}}   onChange={() => filterProyecto()}>
				{listaproyectos.map(item => ( 
							<option value={item.proyecto}>{item.proyecto}</option>

				))}
				</select>
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
							<th>Responsable</th> 
							<th></th>
							 
							<th>Proyecto</th>
							<th>Actividad</th>
							<th>Descripción</th>
							
							<th>Inicio</th>
							<th>Término</th>
							<th>Estado</th> 
							<th>Observaciones</th>
							<th></th> 
							<th></th> 
							<th></th>
							 
							  
							

						</tr>

						{ lista.map(item => ( 
							 
						<tr style={{  fontSize:'13.5px', border: '2px solid #ABB2B9'}}>
							 
							<td  align='center' className='id-orden'>{item.folio}</td>
						 
							<td><label onClick={() => Notificar(item.name, item.actividad)}>{item.name}</label></td>
							{ (item.rol == 2) ? 
							<td><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarResponsable(item.proyecto, item.folioproyecto, item.folio)}><BsArrowRepeat /></button></td>
							:<td></td>
							}
							
							<td style={{  boxShadow:'0px 0px 0px 8px '+item.backgroundColor+' inset'}} align='center' ><label>{item.proyecto}</label></td>
							
							{ (item.rol == 2) ? 
							<>
							<td align='center'>
								 
								<input id={"actividad1"+item.folio} defaultValue={item.actividad} type="text"  style={{width:'100%', marginTop:'5px'}}/>
  
						 	</td>
							<td align='center'> 
							<input id={"descripcion1"+item.folio} defaultValue={item.descripcion} type="text"  style={{width:'100%', marginTop:'5px'}}/>
						 </td>
						 </>
                         : 
						 <>
						 <td>{item.actividad} <input id={"actividad1"+item.folio} defaultValue={item.actividad} type="text"  style={{width:'100%', marginTop:'5px'}} hidden/></td>
						 <td>{item.descripcion} <input id={"descripcion1"+item.folio} defaultValue={item.actividad} type="text"  style={{width:'100%', marginTop:'5px'}} hidden/></td> 
						 </>
							}
							<td>{formatDate(item.fechainicio)}</td> 
							<td align='center' style={{backgroundColor: getColor(item.fechatermino), color:  'black'}}> <input  style={{width:'95px', height:'31px', backgroundColor: getColor(item.fechatermino)}} type="date" id={item.folio} onChange={() => actualizarFecha(item.folio)} value={(item.fechatermino).substring(0,10)}/></td>  
							<td>
								 
								<select style={{height:'31px'}} id={'sel'+item.folio} name={item.est} onChange={() => ActualizarStatus(item.folio, item.folioencargado, item.actividad, item.folioresponsable)}>
								<option value="1">{item.est}</option>
								<option value="2">En Proceso</option>
								<option value="3">Terminado</option>
								</select>  
							</td>
							<td align='center'><input defaultValue={item.comentarios} id={"observacionesActividades"+item.folio} style={{width:'100%', height:'31px' }}></input></td>
							<td><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarComentarios(item.folio)}><BsArrowRepeat /></button></td>
						
							{ (item.rol == 2) ? 
							<td>
							<button className='btn btn-outline-danger btn-sm' onClick={ () => eliminarActividad(item.folio) }><BsXCircleFill /></button>
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



				<Modal
				isOpen={modalIsOpen1} 
				onRequestClose={closeModal1}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'blue'}}>Proyecto </h2>
				<b><label>{nombreproyecto}</label></b>
				
				<div>Actualizar response</div> 
				 
				
			<br></br> 


			<select id="foliocolab" style={{ marginTop:'5px', width:'100%'}}>
					{colaboradoresEP.map(item => ( 
								<option value={item.userid}>{item.name}</option>

					))}
					</select>
			<br></br>
			<br></br>

				<button onClick={closeModal1} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button  class="btn btn-outline-success btn-sm" onClick={() => actualizarResponsable1()}>Actualizar</button>
			</Modal>


							<h2>Calendario de actividades</h2>
				<FullCalendar
				plugins={[ dayGridPlugin ]}
				initialView="dayGridMonth"
				weekends={true}
				locale={esLocale}
				events={lista}
				eventClick={handleEventClick}
				/>
			</div>

			
		</div>
	);   
}

export default Actividades;
