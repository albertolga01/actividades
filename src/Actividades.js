
import React,{useState, useEffect} from 'react';  
import axios from '../node_modules/axios'; 
import {Nabvar} from './component/Navbar';  
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import esLocale from '@fullcalendar/core/locales/es'; 
import Modal from 'react-modal';
import './App.css'; 
import { FaBeer, FaReact, Farefr } from 'react-icons/fa';
import { AiFillAlert } from "react-icons/ai";
import { BsArrowRepeat, BsFillCheckCircleFill, BsXCircleFill, BsEyeFil, BsEyeSlashFill, BsFillFileEarmarkPlusFill, BsUpload } from "react-icons/bs";
import { FaEye } from "react-icons/fa";

import moment from 'moment';
 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'


import Pusher from 'pusher-js'; 
import { wait } from '@testing-library/react';

import DataTableExtensions from "react-data-table-component-extensions";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from 'react-data-table-component';


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
	const [showDesc, setShowDesc] = React.useState(false);
	

	const columns = [
		{
			name: 'Folio',  
			//selector: row => row.folio,
			cell: (row) => {
				return (
					<td  onClick={() => MostrarDetalle(row.folio)} align='center' className='id-orden'>{row.folio}</td>
				)
			},
			sortable: true,
			width: "5%"  
		},
		{
			name: 'Responsable',  
			//selector: row => row.vehiculo + " " + row.modelo +" "+ row.numvehiculo,
			cell: (row) => {
				return (
					<td align='left'>
						<div align='left' style={{marginLeft:'0px'}}>
							<label onClick={() => Notificar(row.name, row.actividad)}>{(row.name).split(" ")[0]}</label>
					 	</div>
					 
					</td>
				)
			},
			sortable: true,
			width: "10%",
			wrap: true,
		},
		{
			name: '',  
			//selector: row => row.accesorio,
			cell: (row) => {
				return (
					<td>{ (row.rol == 2) ? 
						<td><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarResponsable(row.proyecto, row.folioproyecto, row.folio)}><BsArrowRepeat /></button></td>
						:<td></td>
						}
				</td>
				)
			},
			maxWidth: "5px",
			width: "5%",
			sortable: true,
		},
		{
			name: 'Proyecto',  
			//selector: row => row.accesorio,
			cell: (row) => {
				return (
					(row.rol == 2)?
						<td onClick={()=> MostrarDetalleProyecto(row.folio, row.folioresponsable, row.name)} style={{  boxShadow:'0px 0px 0px 5px '+row.backgroundColor+' inset', width: '100%', height: '100%'}} align='center' ><label style={{height: '100%', marginTop: '25%'}}>{row.proyecto}</label></td>
						:
						<td  style={{  boxShadow:'0px 0px 0px 5px '+row.backgroundColor+' inset', width: '100%', height: '100%'}} align='center' ><label style={{height: '100%', marginTop: '25%'}}>{row.proyecto}</label></td>
					 
				)
			},
			maxWidth: "5px",
			width: "10%",
			sortable: true,
		},
		{
			name: 'Actividad',  
			//selector: row => row.descripcion,
			cell: (row) => {
				return (
					(row.rol == 2) ? 
							<>
							<td align='center'>
								 
								<textarea id={"actividad1"+row.folio} defaultValue={row.actividad} type="text"  style={{width:'95%', marginTop:'5px'}} rows="3" cols="50"/>
  
						 	</td>
							 
							
						 </>
                         : 
						 <>
						<td style={{width:'95%'}}>{row.actividad}<input id={"actividad1"+row.folio} defaultValue={row.actividad} type="text"  style={{width:'100%', marginTop:'5px'}} hidden/> </td>
						 
 
						 
						 
						 </>
				)
			},
			width: "20%",
			sortable: true,
		},
		{
			name: 'Descripcion',  
			//selector: row => row.descripcion,
			cell: (row) => {
				return (
					(row.rol == 2) ? 
							<> 
							 	<td align='center'> 
										<textarea id={"descripcion1"+row.folio} defaultValue={row.descripcion} type="text"  style={{width:'95%', marginTop:'5px'}} rows="3" cols="50"/>
						 		</td>  
							
						 </>
                         : 
						 <>
					  
									<td align='center'> 
											<textarea id={"descripcion1"+row.folio} defaultValue={row.descripcion} type="text" style={{width:'95%', marginTop:'5px'}} rows="3" cols="50"/>
									</td> 
						 
						 
						 </>
				)
			},
			width: "20%",
			sortable: true,
			omit: !showDesc,
		}, 
		{
			name: 'Inicio/termino',  
			selector: row => row.actividad,
			cell: (row) => {
				return (
					<td>{formatDate(row.fechainicio)}<input  style={{width:'95px', height:'31px', backgroundColor: getColor(row.fechatermino)}} type="date" id={row.folio} onChange={() => actualizarFecha(row.folio)} value={(row.fechatermino).substring(0,10)}/></td> 
				)
			},
			width: "10%", 
			sortable: true,
		},
		{
			name: 'Estado',  
			//selector: row => row.actividad,
			cell: (row) => {
				return (
				<td>
								 
					<select style={{height:'31px'}} id={'sel'+row.folio} name={row.est} onChange={() => ActualizarStatus(row.folio, row.folioencargado, row.actividad, row.folioresponsable)}>
						<option value="1">{row.est}</option>
						<option value="2">En Proceso</option>
						<option value="3">Terminado</option>
					 </select>  
				</td>

					)
			},
			width: "10%",
			sortable: true,
		}, 
		{
			name: 'Observaciones',  
			//selector: row => row.actividad,
			cell: (row) => {
				return (
					<td align='center'><textarea defaultValue={row.comentarios} id={"observacionesActividades"+row.folio} style={{width:'95%'}} rows="3" cols="50"></textarea></td>
					)
			},
			width: "20%",
			sortable: true,
		}, 
		{
			name: '',  
			//selector: row => row.actividad,
			cell: (row) => {
				return (
					<td style={{width: '80px'}}>
						<button  className='btn btn-outline-success btn-sm' onClick={() => actualizarComentarios(row.folio)}><BsArrowRepeat /></button>
						<button  className='btn btn-outline-success btn-sm' onClick={() => ocultarActividad(row.folio)}><FaEye /></button>
						<button style={{width:'64px'}} className='btn btn-outline-primary btn-sm' onClick={() => agregarDoc(row.folio)}><BsUpload /></button>
					</td>)
			},
			width: "7%",
			sortable: true,
		},
		{
			name: '',  
			//selector: row => row.actividad,
			cell: (row) => {
				return (
					<td>
					{ (row.rol == 2) ? 
						<td align='center' style={{width:'35px'}}>
						<button className='btn btn-outline-success btn-sm' onClick={ () => finalizado(row.folio, row.folioresponsable, row.actividad) }><BsFillCheckCircleFill /></button>
						<button className='btn btn-outline-danger btn-sm' onClick={ () => eliminarActividad(row.folio) }><BsXCircleFill /></button>
					</td>
					 : 
					 <td>
						 </td>

						}
					</td>
					)
			},
			width: "3%",
			sortable: true,
		}, 
	];

	const tableCustomStyles = {
		headCells: {
		  style: {
			fontSize: '15px',
			fontWeight: 'bold', 
			backgroundColor: '#e5e5e5',
			paddingLeft: '8px',
			paddingRight: '0px',
		  },
		},
		cells: {
			style: {
				paddingLeft: '8px', // override the cell padding for data cells
				paddingRight: '0px',
			},
		},
	  }


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
	const [fecha, setFecha] = useState([]);
	

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
		function openNuevaActividad() {
			dateToday();
			openModal(true);
		}
		function agregarActividadCalendario(info){
			setFecha(info); 
			openModal();
		  }

	useEffect(() => {
		getAllProyectos();
		// eslint-disable-next-line
	},[])
	
	useEffect(() => {
		getAllColaboradores();
		// eslint-disable-next-line
	},[])
	
	 
	async 	function   mostrarOcultas(){
		let ocultas = document.getElementById("ocultas").checked;
		 
		setLista([]);
		await new Promise(resolve => setTimeout(resolve, 1000)); // 3 sec
		if(ocultas == true){
			var result = listados.filter((x) => (x.oculta === "1")); 
			setLista(result);
		}else if(ocultas == false){
			var result = listados.filter((x) => (x.oculta === "0")); 
			setLista(result);
		} 
		 
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
	console.log("getAllColaboradoresdelProyecto"+res.data);

	setcolaboradoresRes(res.data);
	//setColaboradoresEP(res.data);

	(res.data).forEach(myFunction);
	console.log(setcolaboradoresRes(res.data));
}



	function myFunction(item) {
	if((props.userid == item.userid) && item.rol == "2"){
		setEsAdmin("1");
	}
	}

	const [modalIsOpenArchivo, setIsOpenArchivo] = React.useState(false);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [modalIsOpenC, setIsOpenC] = React.useState(false);
	let subtitle; 
	const [lista, setLista] =  useState([]);  
	const [listados, setListaDos] =  useState([]);  
	const [value, setValue] = useState([]); 
	const [folioActividad1, setFolioActividad1] = useState([]); 
	const [folioActividad, setFolioActividad] = useState([]); 



	let id = 0; 
	let tipo = 0; 
 
 
	const [listaproyectos, setListaProyectos] =  useState([]);
	const [listadocumentos, setListaDocumentos] =  useState([]);
	const [listadetalleact, setListadetalleact] =  useState([]);
	const [usaurioproyecto, setUsuarioProyecto] =  useState([]);
	const [folioactproyecto, setFolioActProyecto] =  useState([]);
	

	//Modal Detalles Actividad
	const [modalIsOpenDetalleAct, setIsOpenDetalleAct] = React.useState(false);

	function openModalDetalleAct() {
		setIsOpenDetalleAct(true);
	  }
	  function closeModalDetalleAct() {
		setIsOpenDetalleAct(false);
	  }
	  function afterOpenModalDetalleAct() { 
	  }

	//Modal Detalles Proyecto
	  const [listadetalleproyecto, setListadetalleproyecto] =  useState([]);
	  const [modalIsOpenDetalleProyecto, setIsOpenDetalleProyecto] = React.useState(false);

	function openModalDetalleProyecto() {
		setIsOpenDetalleProyecto(true);
	  }
	  function closeModalDetalleProyecto() {
		setIsOpenDetalleProyecto(false);
	  }
	  function afterOpenModalDetalleProyecto() { 
	  }



	useEffect(() => {
		getActividades(); 
	},[])

	

	useEffect(()=> {
		getUsuarios();
		notificaciones();
		dateToday();
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
	


		function openModalA() {
			setIsOpenArchivo(true);
		  }
		  function closeModalA() {
			setIsOpenArchivo(false);
		  }
		  function afterOpenModalA() {
			// references are now sync'd and can be accessed.
			subtitle.style.color = 'black';
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

	async function MostrarDetalle(folio){
		var id = "obtenerDetalle";
		setListadetalleact([]);
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folio='+folio); 
		//console.log(rese.data);
		setListadetalleact(rese.data);  
		openModalDetalleAct();
          
    }

	async function MostrarDetalleProyecto(folio, folioresponsable, name){
		var id = "obtenerProyectosUsuario";
		setUsuarioProyecto(name);
		setFolioActProyecto(folio);
		setListadetalleproyecto([]);
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folioresponsable='+folioresponsable); 
		//console.log(rese.data);
		setListadetalleproyecto(rese.data);  
		openModalDetalleProyecto();
          
    }

	  async function addActividad(){  
		openModalLoad();
		
		var folioproyecto = document.getElementById("folioproyecto").value;
		var actividad = document.getElementById("actividad").value;
		var descripcion = document.getElementById("descripcion").value;
		var fechatermino = document.getElementById("fechatermino").value;
		var folioencargado = document.getElementById("folioencargado").value;
		var folioresponsable = document.getElementById("folioresponsable").value;
		var observaciones = document.getElementById("observaciones").value; 
/*
		if(fechatermino == ""){
			toast("Seleccione una fecha de termino estimada");
			return;
		}
		*/
		// console.log(actividad);
		if((folioproyecto != "Seleccione") && (actividad.length >= 1)){
		let fd = new FormData() 
		fd.append("id","addActividad") 
		fd.append("folioproyecto",folioproyecto) 
		fd.append("actividad",actividad.replaceAll("'", "´").replaceAll('"', "´´")) 
		fd.append("descripcion",descripcion.replaceAll("'", "´").replaceAll('"', "´´")) 
		fd.append("fechatermino", fechatermino)   
		fd.append("folioencargado", folioencargado)   
		fd.append("folioresponsable", folioresponsable)   
		fd.append("observaciones", observaciones)
		fd.append("creada", props.userid)   
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		closeModalLoad();
		notify(res.data.trim());
		
		} else {
			notify("No se puede agregar actividad, favor de seleccionar un proyecto y agregar el nombre de la actividad");
		}
		closeModal();
		getActividades();
		//verRequisicion(folio);
	 
	}
  
	async function addDocumento(){
		openModalLoad();
		var documento = document.getElementById("documento");
		var descripcion = document.getElementById("descripcionArhivo").value;
		let fd = new FormData() 
		fd.append("id","cargarDocumento")
		fd.append("folio", folioActividad1) 
		fd.append("documento", documento.files[0]);
		fd.append("descripcion", descripcion);
		setListaDocumentos([]);
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		closeModalLoad();
		closeModalA();
		notify(res.data.trim());
		
	}

	async function getActividades(){    
		//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
		setLista([]);
		setListaDos([]);
		openModalLoad(); 
		try {
			document.getElementById("ocultas").checked = false;
		  } catch (error) {
			console.error(error); 
		  }
		
		var id = "getActividades";
		var date = document.getElementById("input-fecha").value; 
		var termino = document.getElementById("input-fecha-termino").value; 
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&date='+date+'&userid='+props.userid+'&termino='+termino);
		closeModalLoad(); 
		var table = document.getElementById('productstable');
		var result = res.data.filter((x) => (x.oculta == "0")); 
			setLista(result); 
		setListaDos(res.data);  
		var lista = res.data;
		var listadeproyectos = lista.filter( (ele, ind) => ind === lista.findIndex( elem => elem.proyecto === ele.proyecto))
		setRegistros(res.data.length);
		setListaProyectos(listadeproyectos);
		//console.log(res.data);
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
				credentials: 'include',
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
		console.log("Actualizarcomentarios: " +res.data);
		notify(res.data.trim());
		getActividades();
	}

}


async function actualizarProyectoActividad(){
	let folioproyecto = document.getElementById("slc-folio-proyecto").value;
	if(window.confirm('Actualizar proyecto de la actividad con folio: ' + folioactproyecto)){ 
		let fd = new FormData() 
		fd.append("id", "actualizarProyectoActividad")
		fd.append("folioproyecto", folioproyecto) 
		fd.append("folioactividad", folioactproyecto)
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);  
		notify(res.data.trim());
		getActividades();
	}

}
async function ocultarActividad(folio){
	if(window.confirm('Deseas ocultar la actividad con folio: ' + folio)){ 
		let fd = new FormData() 
		fd.append("id", "ocultarActividad")
		fd.append("folio", folio) 
		 
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

  async function actualizarFechaCalendario(info, fecha) { 
	if(window.confirm('Actualizar fecha de actividad con folio: ' + info.extendedProps.folio + ' al día: ' + fecha.toISOString().split('T')[0])){ 
		let fd = new FormData() 
		fd.append("id", "actualizarFechaActividad")
		fd.append("folio", info.extendedProps.folio)
		fd.append("fecha", fecha.toISOString().split('T')[0])
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
	

	async function getDocumentos(folio){
		var id = "getDocumentos";
		setListaDocumentos([]);
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folio='+folio); 
		//console.log(rese.data);
		setListaDocumentos(rese.data);    
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


	function agregarDoc(folio){
		openModalA();

		setFolioActividad1(folio);
		getDocumentos(folio);


	}


	function mostrarDesc(){
		if(showDesc){
			setShowDesc(false);
		}else{
			setShowDesc(true);
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
			<button style={{marginRight:'10px'}} onClick={openNuevaActividad} class="btn btn-outline-primary btn-sm">Nueva Actividad</button><br></br>
			
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
	
	<div>Observaciones:</div>
	<textarea id="observaciones" type="text" style={{width:'100%', marginTop:'5px'}} rows="2" cols="25" />
	
	<div>Fecha de término estimada:</div> 
	<input id="fechatermino" style={{width:'100%', marginTop:'5px'}} type="date" defaultValue={fecha}/>
	  
	
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
  editable={true}
  droppable={true}
  eventDrop={info => {
	//<--- see from here
	const { start, end } = info.oldEvent._instance.range;
	console.log(start, end);
	const {
	  start: newStart,
	  end: newEnd
	} = info.event._instance.range;
	console.log(newStart, newEnd);
	if (new Date(start).getDate() === new Date(newStart).getDate()) {
	  info.revert();
	}
  }}
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
					<></> 
				</div>
				}
				<div>
					<span>Mostrar ocultas</span>&nbsp;&nbsp;&nbsp;
				<input type="checkbox" id="ocultas" onChange={() => mostrarOcultas()}></input>

				</div>

				<div>
					<span>Mostrar descripción</span>&nbsp;&nbsp;&nbsp;
				<input type="checkbox" id="desc" onChange={() => mostrarDesc()}></input>

				</div>
				 
				
				<div  style={{height:'100%', overflowX: 'scroll', width:'100%'}}>
				<DataTableExtensions
							columns={columns}
							data={lista} 
							print={false}
							export={false}
							filter={false} 
							>
									<DataTable
												columns={columns}
												data={lista}
												fixedHeader={true}
												fixedHeaderScrollHeight={'100%'}
												customStyles={tableCustomStyles}
												highlightOnHover={true}
												noDataComponent={"No se encontró información"}
												noHeader
											
											/>
						</DataTableExtensions>

					<table id="productstable" style={{width:'100%'}} hidden >
						<tr > 
							<th style={{width:'35px'}}>Folio</th>
							<th style={{width:'95px'}}> Responsable</th> 
							<th style={{width:'35px'}}></th>
							 
							<th style={{width:'100px'}}>Proyecto</th>
							<th style={{width: '250px'}}>Actividad</th>
							{showDesc && <th style={{minWidth: '250px'}}>Descripción</th>}
							<th style={{width: '95px'}}>Inicio /<br></br> termino</th>  
							<th style={{width:'100px'}}>Estado</th> 
							<th style={{width:'250px'}}>Observaciones</th> 
							<th></th> 
							<th></th>  
							 
							  
							

						</tr>

						{ lista.map(item => ( 
							 
						<tr id="tabletr" style={{  fontSize:'13.5px', border: '2px solid #ABB2B9'}}>
							 
							<td  onClick={() => MostrarDetalle(item.folio)} align='center' className='id-orden'>{item.folio}</td>
						 
							<td><label onClick={() => Notificar(item.name, item.actividad)}>{(item.name).split(" ")[0]}</label></td>
							{ (item.rol == 2) ? 
							<td><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarResponsable(item.proyecto, item.folioproyecto, item.folio)}><BsArrowRepeat /></button></td>
							:<td></td>
							}
							{(item.rol == 2)?
							<td onClick={()=> MostrarDetalleProyecto(item.folio, item.folioresponsable, item.name)} style={{  boxShadow:'0px 0px 0px 5px '+item.backgroundColor+' inset'}} align='center' ><label>{item.proyecto}</label></td>
							:
							<td  style={{  boxShadow:'0px 0px 0px 5px '+item.backgroundColor+' inset'}} align='center' ><label>{item.proyecto}</label></td>
							}
							
							
							{ (item.rol == 2) ? 
							<>
							<td align='center'>
								 
								<textarea id={"actividad1"+item.folio} defaultValue={item.actividad} type="text"  style={{width:'250px', marginTop:'5px'}} rows="4" cols="50"/>
  
						 	</td>
							 {(showDesc) ?  
							 	<td align='center'> 
										<textarea id={"descripcion1"+item.folio} defaultValue={item.descripcion} type="text"  style={{width:'100%', marginTop:'5px'}}/>
						 		</td> : 
								<td align='center' hidden> 
									<textarea id={"descripcion1"+item.folio} defaultValue={item.descripcion} type="text"  style={{width:'100%', marginTop:'5px'}}/>
						 		</td>
						 
						 
						 }
							
						 </>
                         : 
						 <>
						<td style={{width:'250px'}}>{item.actividad}<input id={"actividad1"+item.folio} defaultValue={item.actividad} type="text"  style={{width:'100%', marginTop:'5px'}} hidden/> </td>
						 

						{(showDesc) ?  
							 	<td align='center'> 
										<textarea id={"descripcion1"+item.folio} defaultValue={item.descripcion} type="text" style={{width:'100%', marginTop:'5px'}} rows="4" cols="50"/>
						 		</td> : 
								<td align='center' hidden> 
									<textarea id={"descripcion1"+item.folio} defaultValue={item.descripcion} type="text" style={{width:'100%', marginTop:'5px'}} rows="4" cols="50"/>
						 		</td>
						 
						 
						 }
						 
						 
						 </>
							}
							<td>{formatDate(item.fechainicio)}<input  style={{width:'95px', height:'31px', backgroundColor: getColor(item.fechatermino)}} type="date" id={item.folio} onChange={() => actualizarFecha(item.folio)} value={(item.fechatermino).substring(0,10)}/></td> 
							 
							<td>
								 
								<select style={{height:'31px'}} id={'sel'+item.folio} name={item.est} onChange={() => ActualizarStatus(item.folio, item.folioencargado, item.actividad, item.folioresponsable)}>
								<option value="1">{item.est}</option>
								<option value="2">En Proceso</option>
								<option value="3">Terminado</option>
								</select>  
							</td>
							<td align='center'><textarea defaultValue={item.comentarios} id={"observacionesActividades"+item.folio} style={{width:'250px'}} rows="4" cols="50"></textarea></td>
							<td style={{width: '80px'}}><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarComentarios(item.folio)}><BsArrowRepeat /></button>
							<button  className='btn btn-outline-success btn-sm' onClick={() => ocultarActividad(item.folio)}><FaEye /></button>
							<button style={{width:'64px'}} className='btn btn-outline-primary btn-sm' onClick={() => agregarDoc(item.folio)}><BsUpload /></button></td>
							{ (item.rol == 2) ? 
							<td align='center' style={{width:'35px'}}>
							<button className='btn btn-outline-success btn-sm' onClick={ () => finalizado(item.folio, item.folioresponsable, item.actividad) }><BsFillCheckCircleFill /></button>
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


					<Modal
			isOpen={modalIsOpenArchivo}
			onAfterOpen={afterOpenModalA}
			onRequestClose={closeModalA}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Agregar Archivo</h2> 

			<div>Archivo:</div>
			<input id="documento" type="file" style={{display: "none"}}></input>
			<input type="button"  style={{width:'100%' }} id="documento" class="btn btn-outline-success btn-sm" value="Elegir archivo" onClick={() => {document.getElementById('documento').click()}}></input>

			<div>Descripción:</div>
			<input id="descripcionArhivo" type="text"  style={{width:'100%', marginTop:'5px'}}/>
			<tr > 
							<th>Folio</th>
							<th>Descripción</th> 
							<th>Documento</th> 
							  
						</tr>
			{ listadocumentos.map(item => ( 
							 
							 <tr id="tabletr" style={{  fontSize:'13.5px', border: '2px solid #ABB2B9'}}>
								  
								 <td  align='center' className='id-orden'>{item.folio}</td>
								 <td  align='center' className='id-orden'>{item.descripcion}</td>
								 <td  align='center' className='id-orden'><a target="_blank" rel="noreferrer" href={"https://actividades.grupopetromar.com/apirest/actividades/" + item.documento}>{item.documento}</a></td>
							   
								 
							 </tr> 
							 ))}	
			
		<br></br>
		<br></br>
			<button onClick={closeModalA} class="btn btn-outline-danger btn-sm " style={{ height:'45px'}}>Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<button onClick={() => addDocumento()} class="btn btn-outline-success btn-sm"  style={{ height:'45px'}}>Guardar</button>
		</Modal>


		<Modal
			isOpen={modalIsOpenDetalleAct}
			onAfterOpen={afterOpenModalDetalleAct}
			onRequestClose={closeModalDetalleAct}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Detalles de la actividad</h2>

	 
				{ listadetalleact.map(item => ( 
							 
					<div style={{  fontSize:'13.5px'}}>
					 
					<label style={{fontSize:'16px', fontWeight:'bold'}}>Creado por:</label><br></br>
					<label>{item.creadapor}</label> 
					<br></br>
					<br></br>
					<label style={{fontSize:'16px', fontWeight:'bold'}}>Proyecto:</label><br></br>
					<label>{item.proyecto}</label>
					<br></br>
					<br></br>
					<label style={{fontSize:'16px', fontWeight:'bold'}}>Responsable:</label><br></br>
					<label>{item.name}</label> 
					<br></br>
					<br></br>
					<label style={{fontSize:'16px', fontWeight:'bold'}}>Actividad:</label><br></br>
					<label>{item.actividad}</label> 
					<br></br>
					<br></br>
					<label style={{fontSize:'16px', fontWeight:'bold'}}>Descripción:</label><br></br>
					<label>{item.descripcion}</label>
					<br></br>
					<br></br>
					<label style={{fontSize:'16px', fontWeight:'bold'}}>Fecha de término estimada:</label> <br></br>
					<label>{formatDate(item.fechatermino)}</label>
							   
								 
				</div> 
							 ))}
		 
		<br></br>
			<button onClick={closeModalDetalleAct} class="btn btn-outline-danger btn-sm " style={{ width:'100%'}}>Cerrar</button> 
		</Modal>


		<Modal
			isOpen={modalIsOpenDetalleProyecto}
			onAfterOpen={afterOpenModalDetalleProyecto}
			onRequestClose={closeModalDetalleProyecto}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Actualizar proyecto</h2>
			
			<label style={{fontSize:'16px', fontWeight:'bold'}}>Responsable:</label><br></br>
					<label>{usaurioproyecto}</label> 
					<br></br>
					<br></br>  
	 
				
							 
					<div style={{  fontSize:'13.5px'}}>
					 
					 
					<label style={{fontSize:'16px', fontWeight:'bold'}}>Proyecto:</label><br></br>
					<select id="slc-folio-proyecto" style={{width:'100%'}}>
					{ listadetalleproyecto.map(item => ( 
						<option value={item.folio}>{item.proyecto}</option>
						))}
					</select>
					<br></br>
					<br></br>
					 	 
				</div> 
							 
		 
		<br></br>
			<button onClick={actualizarProyectoActividad} class="btn btn-outline-success btn-sm " style={{ width:'100%'}}>Actualizar</button> 
		</Modal>



							<h2>Calendario de actividades</h2>
				<FullCalendar
				plugins={[ dayGridPlugin, interactionPlugin ]}
				initialView="dayGridMonth"
				weekends={true}
				locale={esLocale}
				events={lista}
				dateClick={ info => {
					agregarActividadCalendario(info.dateStr)}
				}
				eventClick={handleEventClick}
				editable={true}
				droppable={true}
				eventDrop={info => {
				  const { start, end } = info.oldEvent._instance.range;
				  console.log(start, end);
				  const {
					start: newStart,
					end: newEnd
				  } = info.event._instance.range;
				  actualizarFechaCalendario(info.event, newStart)
				  console.log(newStart, newEnd);
				  if (new Date(start).getDate() === new Date(newStart).getDate()) {
					info.revert();
				  }
				}}
				/>
			</div>

			
		</div>
	);   
}

export default Actividades;
