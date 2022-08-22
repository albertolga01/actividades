import React, { useState, useEffect } from 'react'
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

import { push as Menu } from 'react-burger-menu'

export default function OpcionesMenu(props) {

     const [isMenuOpen1, SetIsMenuOpen1] = useState(props.isMenuOpen1);
    // console.log(props.selected);
    console.log(props.dptoid);

   

    function Seleccionar(elemento){ 
        if(isMenuOpen1 == true){ 
            SetIsMenuOpen1(false); 
        }  
        props.unmount(elemento);   
    }



    var isMenuOpen = function(state) {
 
        SetIsMenuOpen1(state.isOpen);
        return state.isOpen;
      }; 

    
   
    function logOut() {
        window.location.reload();
    }

   

    return (

     
          <Menu left   isOpen={ isMenuOpen1 } onStateChange={ isMenuOpen } >
                
            <div id="sidepanel" style={{width:'100%'}}>
                <img id="sidepanel-logo" alt="Logo" />

                <span id="top-menu" style={{ textAlign: 'center', color: 'white', fontSize: '12px', paddingBottom: '.4rem', paddingTop: '.4rem', borderBottom: '2px solid white' }}>
                    <b>Bienvenido:</b> {props.name} <br /> 
 
                    <span onClick={() => { Seleccionar("5"); }} style={{ cursor: 'pointer' }}>Cambiar contraseña</span>
                </span>

                <hr></hr>
                { (props.admin == 1) ? 
						 <div id="sidebtn" onClick={() => { Seleccionar("GrupoTrabajo"); }}>
                         <img id="sideimggrupo" alt="" />
                         <span>Grupo de Trabajo</span>
                     </div>
                         : <label></label>
							}


                { (props.admin == 1) ? 
							<div id="sidebtn" onClick={() => { Seleccionar("Proyectos"); }}>
                            <img id="sideimg3" alt="" />
                            <span>Proyectos</span>
                        </div>
                         : <label></label>
							}
                

                <div id="sidebtn" onClick={() => { Seleccionar("Actividades"); }}>
                    <img id="sideimg1" alt="" />
                    <span>Actividades Pendientes  </span>
                    
                </div>
                <div id="sidebtn" onClick={() => { Seleccionar("ActividadesFinalizadas"); }}>
                    <img id="sideimgchek" alt="" />
                    <span>Actividades Completadas</span>
                </div>
                <div id="sidebtn" onClick={() => { Seleccionar("Solicitudes"); }}>
                    <img id="sideimgchek" alt="" />
                    <span>Solicitudes</span>
                </div>
                { (props.dptoid == 2 || props.dptoid == 8) ? 
						 <div id="sidebtn" onClick={() => { Seleccionar("Equipos"); }}>
                         <img id="sidebtnequipos" alt="" />
                         <span>Equipos</span>
                     </div>
                         : <label></label>
							}
                
                { (props.dptoid == 8 ) ? 
						 <div id="sidebtn" onClick={() => { Seleccionar("Accesos"); }}>
                         <img id="sidebtnaccesos" alt="" />
                         <span>Accesos</span>
                     </div>
                         : <label></label>
							}
               
                
               
                <div id="sidebtn" onClick={() => logOut()}>
                    <img id="sideimg5" alt="" />
                    <span>Cerrar sesión</span>
                </div> 

            </div>

            </Menu>      
           

 
    )
}
