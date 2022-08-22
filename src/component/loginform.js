import React,{useState, useEffect} from 'react';  
import './styles-login.css';
import axios from '../../node_modules/axios';
import SideMenu from './SideMenu'; 
import 'dotenv/config';  
import Push from 'push.js';  
 
import Pusher from 'pusher-js'; 
import { isPropsEqual } from '@fullcalendar/react';
const Login = (isLoggedIna) =>  {
	const [usuario, setUsuario] = useState("null");
	const [userid, setUserid] = useState("null");
	const [name, setName] = useState("null");
	const [admin, setAdmin] = useState("null");  
	const [departamento, setDepartamento] = useState("null");
	const [dptoid, setDptoid] = useState("null");
	const [tipo, setTipo] = useState("null");
	const [isLoggedIn, setisLoggedIn] = useState(isLoggedIna);  
 
	function handleKeyPress  (event) {
		if(event.key === 'Enter'){ 
			Login(event);
		}
	}
	useEffect(() => {
         
		//notificaciones(); 
		// eslint-disable-next-line
	},[])
  

	 
	 
	 
	async function Login(e){  
		e.preventDefault();  
	 
		var user = document.getElementById("form-usuario").value;
		var pass = document.getElementById("form-password").value;  
		let fd = new FormData()  
		fd.append("user", user)
		fd.append("pass", pass)
		fd.append("id", "loginActividades");    
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		console.log(res.data);
		if(res.data[0].res === "1"){
			
			setUsuario(res.data[0].usuario); 
			setUserid(res.data[0].userid);
			setName(res.data[0].name);
			setDptoid(res.data[0].dptoid);
			setDepartamento(res.data[0].departamento);
			setTipo(res.data[0].tipo); 
			setAdmin(res.data[0].act_admin); 
			setisLoggedIn(false); 
		} else {
			alert("Datos de acceso incorrectos");
		} 
		//console.log(res.data); 
	}

	 

    if(isLoggedIn){
		return( 
			<div> 
				<div id="body-content">
					<div id="div-img">
						<img alt="Logo Petromar"></img>
						
					</div>  
					<div id="div-form">
					<h1>Actividades</h1>
						<span>Usuario</span>
						<input id="form-usuario" onKeyPress={handleKeyPress}  type="text" style={{height:'30px'}} placeholder="Usuario"/>
						<span>Contraseña</span>
						<input id="form-password" onKeyPress={handleKeyPress}  type="password" style={{height:'30px'}}  placeholder="Contraseña"/>
						 
						<button id="form-btn" style={{backgroundColor:'#0071ce', color:'white'}} onClick={(e) => Login(e)}>INICIAR SESIÓN</button> 
					 
					</div>
				</div>   
			</div>
		); 
	} else {
		return (
			<div >
				<SideMenu   admin={admin} departamento={departamento} usuario={usuario} userid={userid} name={name} dptoid={dptoid}  selected='Actividades' tipo={tipo} />
			</div>
		);
	}
}

export  default Login;