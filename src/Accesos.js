
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

 





function Accesos(props) {

	function notify(message){
		toast(message);
	}

	function openModalLoad() { 
		setIsOpenLoad(true); 
		 }  
	   
		 function closeModalLoad() { 
		setIsOpenLoad(false); 
		 }


	let defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate() )

    const [date, setDate] = useState(defaultDate)

    const onSetDate = (event) => {
        setDate(new Date(event.target.value))
    }


	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
	const [listap, setListaP] = useState([]);
	const [listapd, setListaPD] = useState([]);
	const [listau, setListaU] = useState([]);
	
	const [registros, setRegistros] = useState([]);
   
   
	useEffect(() => {
		getAllAccesos();
	}, [])
  
 
	async function getAllAccesos() {
	  var id = "getTodosAccesos";
	  const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id);
	  setRegistros(rese.data.length);
	  setListaP(rese.data);
	  setListaPD(rese.data);
	  console.log(rese.data);
  } 

 
   
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

	function filterName() {
		var name = document.getElementById('filtrarporcolab').value;  
		var result = listapd.filter((x) => (x.name === name)); 
		setListaP(result);
		setRegistros(result.length);
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



	  async function addAcceso(){  
		var folioresponsable = document.getElementById("folioresponsable").value; 
		var acceso = document.getElementById("acceso").value; 
		var descripcion = document.getElementById("descripcion").value;
		var observaciones = document.getElementById("observaciones").value;
		var fechaasignacion = document.getElementById("fechaasignacion").value; 
		let fd = new FormData() 
		fd.append("id","addAcceso") 
		fd.append("folioresponsable",folioresponsable)  
		fd.append("acceso",acceso)  
		fd.append("descripcion",descripcion)   
		fd.append("observaciones",observaciones)   
		fd.append("fechaasignacion", fechaasignacion)    
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		notify(res.data.trim());
		getEquipos();
		getAllAccesos();
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

	async function getEquipos(){    
		//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
		 
		var id = "getActividades"; 
		openModalLoad();
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&userid='+props.userid);
		closeModalLoad();
		console.log("Actividades"); 
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

	function eliminarAcceso(folio){
		let toSend = new FormData();
		toSend.append("id", "eliminarAcceso");/////////ALIVIANESE PADRINOLI SIUU
		toSend.append("folio", folio);
		
		fetch(process.env.REACT_APP_API_URL, {
			method: "POST",
			mode: "cors",
			body: toSend
		} )
		.then(response => response.text())
		.catch(error => alert(error))
		.then((data)=> {
			if(data){
				notify("Acceso eliminado");
				getAllAccesos();
			
				//cleanForm();
			}
		})
	}

	async function getUsuarios(){
		var id = "getUsuarios";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id); 
		//console.log(rese.data);
		setValue(rese.data);    
	} 
   

  		// Dynamically create select list
	let options = [];

	return (
		<div className="container ">
			<input id='input-cotizacion' type='file' style={{display:'none'}} onChange={()=> postFile()}></input>

			<Nabvar titulo="Accesos" departamento={props.rzonsocial} dptoid={props.dptoid}/>    
			<div style={{width:'100%'}} align="right">
			<button style={{ marginRight:'10px',  width:'75px'}} onClick={openModal} class="btn btn-outline-success btn-sm">Nuevo</button><br></br>
			<button style={{marginTop:'5px', marginRight:'10px',  width:'75px'}} onClick={() => getAllAccesos()} class="btn btn-outline-success btn-sm">Actualizar</button>
      
      
	  <Modal
	isOpen={modalIsOpen}
	onAfterOpen={afterOpenModal}
	onRequestClose={closeModal}
	style={customStyles}
	contentLabel="Example Modal"
  >
	<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Asignar Acceso</h2>
	
 
	<div>Responsable:</div>
	


		  { (props.admin == 1 || props.admin == 0) ? 
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
	 
	 
	 <div>Acceso:</div>
	<input id="acceso" type="text"  style={{width:'100%', marginTop:'5px'}}/>
  
	<div>Descripción:</div>
	<input id="descripcion" type="text"  style={{width:'100%', marginTop:'5px'}}/>
	
	<div>Fecha de asignación:</div>
	<input id="fechaasignacion"    style={{width:'100%', marginTop:'5px'}} type="date" value={date.toLocaleDateString('en-CA')} onChange={onSetDate}/>
	
	<div>Observaciones:</div>
	<input id="observaciones" type="text"  style={{width:'100%', marginTop:'5px'}}/>
	  
	
<br></br>
<br></br>
	<button onClick={closeModal} class="btn btn-outline-danger btn-sm " style={{ height:'45px'}}>Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<button onClick={() => addAcceso()} class="btn btn-outline-success btn-sm" style={{ height:'45px'}}>Guardar</button>
  </Modal>
  </div>
			<div className="row p-3">
				 
			<div>
				<select id="filtrarporcolab" style={{width:'auto', marginTop:'5px'}}  onChange={() => filterName()}>
							{value.map(item => ( 
									   <option value={item.name}>{item.name}</option>
				  
							  ))}
							</select>
				</div>
				<div  style={{height:'100%', overflowY: 'scroll', width:'100%'}}>
					<table id="productstable" style={{width:'100%'}}>
						<tr>
							<th>Folio</th>
							<th>Acceso</th> 
							<th>Descripción</th>
							<th>Asignación</th>
							<th>Responsable</th> 
							<th>Observaciones</th> 
							<th>Eliminar</th>
						</tr>

						{ listap.map(item => ( 
						<tr>
							<td className='id-orden'>{item.id}</td> 
							<td>{item.acceso}</td> 
							<td>{item.descripcion}</td>
							<td>{formatDate(item.fechaasignacion)}</td>
							<td>{item.name}</td> 
							<td>{item.observaciones}</td>  
						 
							 
							{ (props.admin == 1) ? 
							<td>
							<button className='btn btn-outline-danger btn-sm' onClick={ () => eliminarAcceso(item.id) }>Eliminar</button>
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

export default Accesos;
