import React, { useState, useEffect, useSyncExternalStore } from 'react'
import axios from '../../node_modules/axios'; 
import App from '../App'; 
import Proyectos from '../Proyectos';
import GrupoTrabajo from '../GrupoTrabajo';
import Actividades from '../Actividades';
import ActividadesFinalizadas from '../ActividadesFinalizadas'; 
import ChangePassForm from '../ChangePassForm';
import Equipos from '../Equipos';
import Accesos from '../Accesos'; 
import Solicitudes from '../Solicitudes';
import Push from 'push.js';
import ActProyectos from '../ActProyectos';
import ActProyectoSeleccionado from '../ActProyectoSeleccionado';
import ActividadesDtpo from '../ActividadesDtpo';

import OpcionesMenu from './OpcionesMenu'; 
import Pusher from 'pusher-js'; 
import ReactNotifications from 'react-browser-notifications';

import { push as Menu } from 'react-burger-menu'

import { ChatProvider } from '../context/ChatProvider';

 
export default function SideMenu(props) {

 

    const [selected, setSelect] = useState(props.selected);
    const [usuario, setUsuario] = useState(props.userid);
    const [isMenuOpen1, SetIsMenuOpen1] = useState(false); 
    const [ref, setRef] = useState(false); 
    const [title, setTitle] = useState("titul"); 
    const [n, setN] = useState(); 
	const [listaDepartamentos, setListaDepartamentos] = useState([]);
	const [NProyecto, setNProyecto] = useState([]);
	const [IdProyecto, setIdProyecto] = useState([]);
	const [proyectoSeleccionado, setProyectoSeleccionado] = useState([]);
	const [nombreProyectoSeleccionado, setNombreProyectoSeleccionado] = useState([]);

    // console.log(props.selected); 
  
  

    function close(selected){
        setSelect(selected);
        if(isMenuOpen1 == true){
            SetIsMenuOpen1(false);
        } 
    }

    
	async function obtenerDepartamentosUsuario(){

        var id = "obtenerDepartamentosUsuario";
        const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&userid='+props.userid);  
        setListaDepartamentos(rese.data);
        setNProyecto(rese.data[0].nombre);
        setIdProyecto(rese.data[0].folio);
        console.log(rese.data);
	}

    

    function cambiarSelected(selected, idproyecto, nproyecto){ 
          
        close(selected);  
        setIdProyecto(idproyecto);  
        setNProyecto(nproyecto);  
    }


    function cambiar(selected){ 
               
        close(selected);  
    }

    function seleccionarProyecto(selected, idProyecto, nombre){ 
        //alert(nombre);
        setProyectoSeleccionado(idProyecto);
        setNombreProyectoSeleccionado(nombre);
        close(selected);  

    }

   
    var isMenuOpen = function(state) {
 
        SetIsMenuOpen1(state.isOpen);
        return state.isOpen;
      }; 

    const Element = () => {

        if (selected === '1') {
            return <App tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} rzonsocial={props.rzonsocial}/>;
        }   else if (selected === '5') {
            return <ChangePassForm userid={props.userid}/>;
        }   else if (selected === 'Proyectos') {
            return <Proyectos tipo={props.tipo} unmount={cambiar} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        } else if (selected === 'Actividades') {
            return <Actividades tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        } else if (selected === 'ActividadesFinalizadas') {
            return <ActividadesFinalizadas tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        }else if (selected === 'GrupoTrabajo') {
            return <GrupoTrabajo  getDptos={obtenerDepartamentosUsuario} tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        }else if (selected === 'Equipos') {
            return <Equipos tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        }else if (selected === 'Accesos') {
            return <Accesos tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        } else if (selected === 'Solicitudes') {
            return <Solicitudes tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        }else if (selected === 'ActProyectos') {
            return <ActProyectos  seleccionarProyecto={seleccionarProyecto} tipo={props.tipo} unmount={cambiar}  admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        }else if (selected === 'ActProyectoSeleccionado') {
            return <ActProyectoSeleccionado nombreProyectoSeleccionado={nombreProyectoSeleccionado} proyectoSeleccionado={proyectoSeleccionado} tipo={props.tipo} unmount={cambiar}  admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        }else if (selected === 'ActividadesDtpo') {
            return <ActividadesDtpo getDptos={obtenerDepartamentosUsuario} rooms={listaDepartamentos} iddepartamento={IdProyecto} nombredepartamento={NProyecto} tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        }else {
            return (<div style={{ width: '100%', textAlign: 'center', backgroundColor: '', margin: 'auto' }}><h1>Error al Cargar</h1></div>);
        } 
    }

    useEffect(() => {
        obtenerDepartamentosUsuario();
		notificaciones(); 
		// eslint-disable-next-line
	},[])


  

    function logOut() {
        window.location.reload();
    }

   
    
        function Not(data, user){
            
            console.log(data.mensaje+ " " + data.userid + " " + props.userid);
    if(data.userid === props.userid && data.tipo === "act"){   
                Push.create("Notificación: ", { 
                body:  data.mensaje, 
                icon: 'https://actividades.grupopetromar.com/favicon.png', 
                timeout: 5000, 
                onClick: function () { 
                window.focus(); 
                this.close(); 
                
            } 
        });      
    }
    }

    function notificaciones(){

    var pusher = new Pusher('5238df05729a28dcfb1a', { 
    cluster: 'us3' 
    }); 
    var channel = pusher.subscribe('my-channel'); 
        channel.bind('my-event', function(data) { 
            //	alert(data.mensaje + " " + data.userid + " " + JSON.stringify(data)); 
            //console.log(usuario);
        

            Not(data, props.userid);

        
    });

    }


    return (

     
        <div  style={{ height: '100vh', width: '100vw', top: '0',  position: 'sticky', display: 'flex', overflowX: 'auto'}}>
            <OpcionesMenu userid={props.userid} getDptos={props.getDptos} listaDepartamentos={listaDepartamentos} dptoid={props.dptoid} unmount={cambiarSelected} admin={props.admin} name={props.name} isMenuOpen1={isMenuOpen1}></OpcionesMenu>
            <ChatProvider name={props.name}>
             <Element selected={selected} />  
			</ChatProvider>

        </div>
    )
  
}
