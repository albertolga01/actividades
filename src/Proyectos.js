
import React,{useState, useEffect} from 'react';  
import axios from '../node_modules/axios'; 
import {Nabvar} from './component/Navbar'; 
import Modal from 'react-modal';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'

 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

import './App.css'; 
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


  function formatRol(rolid){
	if(rolid == "1"){
		return "Colaborador";
	}else if(rolid == "2"){
		return "Administrador";
	}

  }

function Proyectos(props) {
 
	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
	const [modalIsOpen1, setIsOpen1] = React.useState(false);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	let subtitle; 
	const [proyecto, setProyecto] =  useState([]);  
	const [nombreproyecto, setNombreProyecto] =  useState([]);  
	const [colaboradores, setColaboradores] =  useState([]);  
	const [colaboradoresEP, setColaboradoresEP] =  useState([]); 

	
	const [lista, setLista] =  useState([]);  
	const [value, setValue] = useState([]); 
	let id = 0; 
	let tipo = 0; 
 

	function notify(message){
		toast(message);
	}


	useEffect(()=> {
		getRequisiciones();
		
	}, [])

	useEffect(()=> {
		getUsuarios();
	}, [])

	function openModalLoad() { 
		setIsOpenLoad(true); 
		 }  
	   
		 function closeModalLoad() { 
		setIsOpenLoad(false); 
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


	  function ver(id, proyecto){
		  setProyecto(id);
		  setNombreProyecto(proyecto);
		  openModal1();	
		  getAllColaboradoresEnGrupodelProyecto(id);
	    	getAllColaboradoresdelProyecto(id);
	  }


	  function openModal1() {
		setIsOpen1(true);
		 
	
	  }

	  async function cambiarRol(userid){
		var rol = document.getElementById("rol"+userid).value;
		 
		var id = "cambiarRolColaboradorProyecto"; 
			var folioproyecto = proyecto; 
			 let fd = new FormData() 
			fd.append("id",id) 
			fd.append("folioproyecto",folioproyecto) 
			fd.append("foliocolab",userid)    
			fd.append("rol",rol)    
			const res = await axios.post(process.env.REACT_APP_API_URL, fd);
			notify(res.data); 
			getAllColaboradoresdelProyecto(proyecto);
	
	  }
	

	  async function insertColabEnProyecto(){    
		//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
		 
		var id = "insertColabEnProyecto";
		var foliocolab = document.getElementById("foliocolab").value; 
		var folioproyecto = proyecto; 
	 	let fd = new FormData() 
		fd.append("id",id) 
		fd.append("folioproyecto",folioproyecto) 
		fd.append("foliocolab",foliocolab)    
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		notify(res.data.trim()); 
		getAllColaboradoresdelProyecto(proyecto);
	//	getAllColaboradoresdelProyecto();
	}
	

	  async function getAllColaboradoresEnGrupodelProyecto(idd){    
		//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
		 
		var id = "getColabEnGrupo";
		var folio = idd; 
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folio='+folio);
		console.log(res.data); 
		setColaboradores(res.data);
	//	getAllColaboradoresdelProyecto();
	}


	async function getAllColaboradoresdelProyecto(idd){    
		//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
		setColaboradoresEP([]);
		var id = "getColabEnProyecto";
		var folio = idd;  
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folio='+folio);
		console.log(res.data); 
		setColaboradoresEP(res.data);
		 
	}



	  function afterOpenModal1() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#f00';
	  }
	
	  function closeModal1() {
		setIsOpen1(false);
	  }




	  async function addProyecto(){  
		var administrador = document.getElementById("administrador").value;
		var proyecto = document.getElementById("proyecto").value;
		var descripcion = document.getElementById("descripcion").value;
		var fechatermino = document.getElementById("fechatermino").value;
		let fd = new FormData() 
		fd.append("id","addProyecto") 
		fd.append("administrador",administrador) 
		fd.append("proyecto",proyecto) 
		fd.append("descripcion",descripcion) 
		fd.append("fechatermino", fechatermino)   
		fd.append("userid", props.userid)   
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		notify(res.data.trim());
		getRequisiciones();
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

	//	verRequisicion(id);
	notify(res.data.trim());
	}

	async function getRequisiciones(){    
		//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
		 
		var id = "getProyectos";
		var date = document.getElementById("input-fecha").value; 
		openModalLoad();
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&date='+date+'&userid='+props.userid);
		closeModalLoad();
		console.log(res.data); 
		var table = document.getElementById('productstable');
		setLista(res.data); 
		 
	}

  	async function ActualizarStatus(id){
		var nv = document.getElementById('sel'+id).value;
		if(window.confirm('Actualizar estado de proyecto con folio: ' + id)){
			let fd = new FormData() 
			fd.append("id", "actualizarEstadoProyecto")
			fd.append("folio", id)
			fd.append("nuevoestado", nv)
			const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
			console.log(res.data);
			notify(res.data);
			getRequisiciones();
		}
	}

	async function cambiarColor(idproyecto){
		var color = document.getElementById("inputcolor"+idproyecto).value;
		let fd = new FormData() 
			fd.append("id", "actualizarColorProyecto")
			fd.append("idproyecto", idproyecto)
			fd.append("color", color)
			const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
			console.log(res.data);
			notify(res.data);
			getRequisiciones();
	}
	 

	function formatDate(date){
		let index = date.search(" ");
		date = date.substring(0, index);
		date = date.split("-");
		let formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
		return(formatedDate);
	}

	function eliminarProyecto(folio){
		let toSend = new FormData();
		toSend.append("id", "eliminarProyecto");/////////ALIVIANESE PADRINOLI SIUU
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
				notify("Proyecto eliminado");
				getRequisiciones();
				//cleanForm();
			}
		})
	}

	async function getUsuarios(){
		var id = "2";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id); 
		console.log(rese.data);
		setValue(rese.data);    
	} 
   

  		// Dynamically create select list
	let options = [];

	return (
		<div className="container ">
			<input id='input-cotizacion' type='file' style={{display:'none'}} onChange={()=> postFile()}></input>

			<Nabvar titulo="Proyectos" departamento={props.rzonsocial} dptoid={props.dptoid}/>    
			<div style={{width:'100%'}} align="right">
			<button style={{marginRight:'10px'}} onClick={openModal} class="btn btn-outline-success btn-sm">Nuevo Proyecto</button>
      


			<Modal
	isOpen={modalIsOpen1}
	onAfterOpen={afterOpenModal1}
	onRequestClose={closeModal1}
	style={customStyles}
	contentLabel="Example Modal"
  >
	<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'blue'}}>Colaboradores </h2>
	<b><label>{nombreproyecto}</label></b>
	
	<div>Personas en este proyecto:</div> 
	<table>
		<th>Nombre</th>
		<th>Rol</th>
		{ colaboradoresEP.map(item => ( 
						<tr> 
							 
							 <td>{item.name}</td>
			     			 <td><select style={{width:'135px'}}  id={'rol'+item.userid} onChange={()=> cambiarRol(item.userid)}>
								<option selected>{formatRol(item.rol)}</option>
								<option value="1">Colaborador</option>
								<option value="2">Administrador</option>
								</select></td>
						  
						</tr> 
						))}	
	
	</table>
	
<br></br>
<br></br>


<select id="foliocolab" style={{ marginTop:'5px', width:'100%'}}>
		  {colaboradores.map(item => ( 
                     <option value={item.userid}>{item.name}</option>

  		  ))}
		  </select>
<br></br>
<br></br>

	<button onClick={closeModal1} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<button onClick={() => insertColabEnProyecto()} class="btn btn-outline-success btn-sm" >Agregar</button>
  </Modal>




	  <Modal
	isOpen={modalIsOpen}
	onAfterOpen={afterOpenModal}
	onRequestClose={closeModal}
	style={customStyles}
	contentLabel="Example Modal"
  >
	<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'blue'}}>Nuevo Proyecto</h2>
	
	<div>Administrador:</div>
	<input id="nombre" type="text" value={props.name} style={{width:'100%', marginTop:'5px'}}/>
	<input id="administrador" type="text" value={props.userid} style={{width:'100%', marginTop:'5px'}} hidden />
	
	
	<div>Proyecto:</div>
	<input id="proyecto" type="text"  style={{width:'100%', marginTop:'5px'}}/>

	<div>Descripción:</div>
	<input id="descripcion" type="text"  style={{width:'100%', marginTop:'5px'}}/>
	
	<div>Fecha de termino estimada:</div>
	<input id="fechatermino" type="text"  style={{width:'100%', marginTop:'5px'}} type="date"/>
	  
	
<br></br>
<br></br>
	<button onClick={closeModal} class="btn btn-outline-danger btn-sm " style={{ height:'45px'}}>Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<button onClick={() => addProyecto()} class="btn btn-outline-success btn-sm" style={{ height:'45px'}}>Guardar</button>
  </Modal>
  </div>
			<div className="row p-3">
				<div>
					<span>Filtrar por fecha: &nbsp; </span>
					<input id='input-fecha' type='date' style={{width:'auto',fontSize:'12px', cursor:'pointer'}} onChange={() => getRequisiciones()}></input>
				</div> 
				<div  style={{height:'100%', marginTop: '10px', overflowY: 'scroll', width:'100%'}}>
					<table id="productstable" style={{width:'100%'}}>
						<tr>
							<th>Folio</th>
							<th>Administrador</th>
							<th>Proyecto</th>
							<th>Descripción</th>
							<th>Color</th>
							<th>Inicio</th>
							<th>Término</th>
							<th>Estado</th> 
							<th>Colaboradores</th> 
							<th>Eliminar</th>
						</tr>

						{ lista.map(item => ( 
						<tr>
							<td className='id-orden'>{item.folio}</td>
						 
							<td>{item.name}</td>
							<td>{item.proyecto}</td>
							<td>{item.descripcion}</td>
							<td><input id={"inputcolor"+item.folio}type="color" value={item.color} onChange={() => cambiarColor(item.folio)}></input></td>
							<td>{formatDate(item.fecha)}</td> 
							<td>{formatDate(item.fechatermino)}</td>  
							<td>
								{(props.admin == "1") ? 
								<select id={'sel'+item.folio} name={item.est} onChange={() => ActualizarStatus(item.folio)}>
								<option>{item.est}</option>
								<option value="2">En Proceso</option>
								<option value="3">Terminado</option>
								</select> :  <label>{item.est}  </label>}
							</td>
							<td align='center'>		<button className='btn btn-outline-success btn-sm' onClick={ () => ver(item.folio, item.proyecto) }>Ver</button>
						</td>  
						  
							<td align='center'>
								<button className='btn btn-outline-danger btn-sm' onClick={ () => eliminarProyecto(item.folio) }>Eliminar</button>
							</td>
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

export default Proyectos;
