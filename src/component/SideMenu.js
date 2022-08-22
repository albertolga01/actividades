import React, { useState, useEffect, useSyncExternalStore } from 'react'
import App from '../App';
import Requisiciones from '../Requisiciones';
import Proyectos from '../Proyectos';
import GrupoTrabajo from '../GrupoTrabajo';
import Actividades from '../Actividades';
import ActividadesFinalizadas from '../ActividadesFinalizadas';
import NvaRequisicion from '../Nvarequisicion';
import Ordenes from '../Ordenes';
import ChangePassForm from '../ChangePassForm';
import Equipos from '../Equipos';
import Accesos from '../Accesos';
import OrdPago from '../OrdPago';
import Solicitudes from '../Solicitudes';
import Push from 'push.js';

import OpcionesMenu from './OpcionesMenu'; 
import Pusher from 'pusher-js'; 
import ReactNotifications from 'react-browser-notifications';

import { push as Menu } from 'react-burger-menu'
 
export default function SideMenu(props) {

 

    const [selected, setSelect] = useState(props.selected);
    const [usuario, setUsuario] = useState(props.userid);
    const [isMenuOpen1, SetIsMenuOpen1] = useState(false); 
    const [ref, setRef] = useState(false); 
    const [title, setTitle] = useState("titul"); 
    const [n, setN] = useState(); 
    // console.log(props.selected); 
  
  

    function close(selected){
        setSelect(selected);
        if(isMenuOpen1 == true){
            SetIsMenuOpen1(false);
        } 
    }

    

    function cambiarSelected(selected){ 
          
        close(selected);  
    }

   
    var isMenuOpen = function(state) {
 
        SetIsMenuOpen1(state.isOpen);
        return state.isOpen;
      }; 

    const Element = () => {

        if (selected === '1') {
            return <App tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} rzonsocial={props.rzonsocial}/>;
        } else if (selected === '2') {
            return <Requisiciones tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        } else if (selected === '3') {
            return <NvaRequisicion tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        } else if (selected === '4') {
            return <Ordenes tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        } else if (selected === '5') {
            return <ChangePassForm userid={props.userid}/>;
        } else if (selected === '6') {
            return <OrdPago tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        } else if (selected === 'Proyectos') {
            return <Proyectos tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        } else if (selected === 'Actividades') {
            return <Actividades tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        } else if (selected === 'ActividadesFinalizadas') {
            return <ActividadesFinalizadas tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        }else if (selected === 'GrupoTrabajo') {
            return <GrupoTrabajo tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        }else if (selected === 'Equipos') {
            return <Equipos tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        }else if (selected === 'Accesos') {
            return <Accesos tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        } else if (selected === 'Solicitudes') {
            return <Solicitudes tipo={props.tipo} admin={props.admin} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial} />;
        }else {
            return (<div style={{ width: '100%', textAlign: 'center', backgroundColor: '', margin: 'auto' }}><h1>Error al Cargar</h1></div>);
        } 
    }

    useEffect(() => {
         
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
            <OpcionesMenu dptoid={props.dptoid} unmount={cambiarSelected} admin={props.admin} name={props.name} isMenuOpen1={isMenuOpen1}></OpcionesMenu>
             <Element selected={selected} />   
        </div>
    )
  
}
