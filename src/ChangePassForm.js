import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import { NavbarPass } from "./component/Navbar";

function ChangePassForm(props){

    const[passActual, setPassActual] = useState();
    const[passNueva, setPassNueva] = useState();
    const[confirmarPass, setConfirmarPass] = useState();

    async function postChangePass(postbody){
        const rese = await axios.post('https://compras.grupopetromar.com/apirest/', postbody);
        alert(rese.data);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if(passNueva != confirmarPass){
            alert('La nueva contraseña no coincide');
            return;
        }

        let postbody = new FormData()
        postbody.append("id", "17")
        postbody.append("passActual", passActual)
        postbody.append("passNueva", passNueva)
        postbody.append("idcte", props.userid);
        postChangePass(postbody);
    }

    return(
        <div className='container'>
            <NavbarPass/>

            <div style={{ display: 'flex', flexDirection: 'column', width: '25%'}}>
                <form onSubmit={handleSubmit}>
                    <label>Contraseña actual</label>
                    <input type='text' onChange={e => setPassActual(e.target.value)}></input>

                    <label>Nueva contraseña</label>
                    <input type='password' onChange={e => setPassNueva(e.target.value)}></input>

                    <label>Confirmar contraseña</label>
                    <input type='password' onChange={e => setConfirmarPass(e.target.value)}></input>

                    <button type='submit' className='btn btn-outline-success btn-sm' style={{marginTop: '2.5vh', fontWeight: 'bold'}}>CONFIRMAR</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassForm;