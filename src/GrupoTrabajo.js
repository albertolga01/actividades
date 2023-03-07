
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




function GrupoTrabajo(props) {

	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
	const [listag, setListaG] = useState([]);
	const [listap, setListaP] = useState([]);
	const [listau, setListaU] = useState([]);
	const [listaut, setListaUT] = useState([]);
	const [nombreproyecto, setNombreProyecto] =  useState([]);  
	const [proyecto, setProyecto] =  useState([]);  
	const [listaver, setListaVer] = useState([]);
	const [colaboradoresG, setColaboradoresG] = useState([]);

	
   
	useEffect(() => {
		getGrupoTrabajo();
		getTodosColaboradores();
		getAllGrupos();
	}, [])
	
	function notify(message){
		toast(message);
	}
  
	 function openModalLoad() { 
			setIsOpenLoad(true); 
			 }  
		   
			 function closeModalLoad() { 
			setIsOpenLoad(false); 
			 }
  
	async function getAllGrupos() {
	  var id = "getTodosGrupos";
	  const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id);  
	  setListaG(rese.data);
	  console.log(rese.data);
  }  
  async function getGrupoTrabajo() {
	var id = "getGrupoTrabajo";
	const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&userid='+props.userid);  
	setListaP(rese.data);
	getColaboradores(rese.data[0].folio);
}


function ver(id, proyecto){
	setProyecto(id);
	setNombreProyecto(proyecto);
	openModal1();	 
	getAllColaboradoresdelGrupo(id);
}

function eliminarGrupo(folio){
	let toSend = new FormData();
	toSend.append("id", "eliminarGrupo");/////////ALIVIANESE PADRINOLI SIUU
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
			notify("Grupo eliminado");
			getAllGrupos();
			//cleanForm();
		}
	})
}

async function getColaboradores(folio) {
	var id = "getColaboradores";
	openModalLoad();
	const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folio='+folio);
	closeModalLoad();
	setListaU(rese.data); 
	console.log(rese.data);
	getProyectosGrupo(folio);
}

async function getTodosColaboradores() {
	var id = "getTodosColaboradores";
	
	const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id);  
	setListaUT(rese.data); 
	console.log(rese.data); 
}

async function getAllColaboradoresdelGrupo(idGrupo){    
	//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
	 
	var id = "getColabEnGrupodos";
	var idGrupo = idGrupo;  
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&idGrupo='+idGrupo);
	console.log(res.data); 
	setColaboradoresG(res.data);
	 
}



async function getProyectosGrupo(folio) {
	var id = "getProyectosGrupo";
	openModalLoad();
	const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folio='+folio);
	closeModalLoad();  
	setListaVer(rese.data); 
	console.log(rese.data);
}


 
 
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [modalIsOpen1, setIsOpen1] = React.useState(false);
	let subtitle; 
	const [lista, setLista] =  useState([]);   
	let id = 0; 
	let tipo = 0; 

	const[btn_Generar, setbtn_Generar] = useState();

	useEffect(()=> {
		getActividades();
	}, [])

 

	function openModal() {
		setIsOpen(true);
	  }

	function openModal1() {
		setIsOpen1(true);
	  }
	
	  function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = 'black';
	  }
	
	  function closeModal() {
		setIsOpen(false);
	  }
	  function closeModal1() {
		setIsOpen1(false);
	  }




 

	async function addGrupo(){  
		var Encargado = document.getElementById("encargado").value;
		var nombreGrupo = document.getElementById("NombreGrupo").value;
		
		let fd = new FormData() 
		fd.append("id","addGrupo") 
		fd.append("encargado",Encargado) 
		fd.append("NombreGrupo",nombreGrupo) 
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		notify(res.data.trim());
		getAllGrupos();
		//getActividades();
		//verRequisicion(folio);
	 
	}

	
	async function AggColabProyecto(){  
		var idColaborador = document.getElementById("idColaborador").value;
	 
		let fd = new FormData() 
		fd.append("id","AggColabProyecto") 
		fd.append("idColaborador",idColaborador) 
		fd.append("idProyecto",proyecto) 
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		notify(res.data.trim());
		//getActividades();
		//verRequisicion(folio);
		getAllColaboradoresdelGrupo(proyecto);
	 
	}

  

 

	async function getActividades(){    
		 
	}
 
  		// Dynamically create select list
	let options = [];

	return (
		<div className="container ">
			
			<Nabvar titulo="Grupo de Trabajo" departamento={props.rzonsocial} dptoid={props.dptoid}/>    
			<div style={{width:'100%'}} align="right">
			<button style={{marginRight:'10px'}} onClick={openModal} class="btn btn-outline-success btn-sm">Nuevo Grupo</button><br></br>
			<br></br>

			<Modal 
					isOpen={modalIsOpenLoad}  
					onRequestClose={closeModalLoad}   
					style={customStyles}> 
					<div style={{width:'100%'}}>  
					<ThreeDots color="#0071ce" height={80} width={80} /> 
					</div>  
			</Modal>

			 
	  <Modal
	isOpen={modalIsOpen}
	onAfterOpen={afterOpenModal}
	onRequestClose={closeModal}
	style={customStyles}
	contentLabel="Example Modal"
  >
	<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Nuevo Grupo de trabajo</h2>
 
	<div>Encargado:</div>
	<select id="encargado" style={{width:'100%', marginTop:'5px'}}   >
							{listaut.map(item => ( 
									   <option value={item.userid}>{item.name}</option>
				  
							  ))}
							</select>
 	 
	<div>Nombre:</div>
	<input id="NombreGrupo" type="text"  style={{width:'100%', marginTop:'5px'}}/>

 
<br></br>
<br></br>
	<button onClick={closeModal} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<button onClick={() => addGrupo()} class="btn btn-outline-success btn-sm" >Guardar</button>
  </Modal>


  
  </div>
  <div style={{width:'100%', overflow: 'scroll'}}>
  <table id="tableGruposTrabajo" style={{width:'100%', overflow: 'scroll'}}>
							<th>Folio</th>
							<th>Encargado</th>
							<th>Nombre</th>
							<th ><label style={{width:'100%', textAlign:'center' }}>Colaboradores</label></th>
							<th ><label style={{width:'100%', textAlign:'center' }}>Eliminar</label></th>
							{ listag.map(item => ( 
							 
							 <tr  >
								  
								 <td className='id-orden'>{item.folio}</td>
							  
								 <td>{item.nombreencargado}</td>
								 <td>{item.nombre}</td>
								 <td align='center'><button onClick={() => ver(item.folio, item.nombre)} className='btn btn-outline-success btn-sm'> Ver/Agregar</button></td>
								 <td align='center'><button className='btn btn-outline-danger btn-sm' onClick={ () => eliminarGrupo(item.folio) }>Eliminar</button></td>

							   
								 
							 </tr> 
							 ))}	
						
						</table>
						</div>
						<br></br>  
  <br></br>
  { listap.map(item => ( 
	  <div>
		  <h3>Grupo de trabajo:</h3>
		  <label>{item.nombre}</label>
		  <h5>Administrador:</h5>
		  <label>{item.name}</label>
		  <h5>Colaboradores:</h5>
		  { listau.map(item => ( 
	  <div> 
		  <label>{item.name}</label>
	  </div>
						 
						))}	

	  <h5>Proyectos:</h5>
		  { listaver.map(item => ( 
	  <div> 
		  <label>{item.proyecto}</label>
	  </div>
						 
						))}	
	  
	  </div>

						 
						))}
						<br></br>
						<br></br>
					
				<Modal
				isOpen={modalIsOpen1}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal1}
				style={customStyles}
				contentLabel="Example Modal">
				<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'blue'}}>Colaboradores </h2>
				<b><label>{nombreproyecto}</label></b>
					
										<br></br> 
										<br></br> 
										
				<div>Personas en este grupo:</div> 

				{ colaboradoresG.map(item => ( 
									<tr> 
										
										<td>{item.nombre}</td>
									
									</tr> 
									))
									}	
				
										<br></br> 


					<select id="idColaborador" style={{width:'100%', marginTop:'5px'}}   >
										{listaut.map(item => ( 
												<option value={item.foliocolab}>{item.nombre}</option>
							
										))}
										</select>
												
										<br></br>
										<br></br>

					<button onClick={closeModal1} class="btn btn-outline-danger btn-sm ">Cancelar</button> 
					<button  onClick={()=> AggColabProyecto()}  class="btn btn-outline-success btn-sm" style={{marginLeft:'180px'}}>Agregar</button>
						</Modal>

						<ToastContainer 
				progressClassName="toastProgress"
				position="top-center"
				/>

					</div>
				);
}

export default GrupoTrabajo;
