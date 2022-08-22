import React,{useState, useEffect} from 'react';  
import {Nabvar} from './component/Navbar'; 
import Ordenpago from './component/Ordenpago';
import NuevaOrdenpago from './component/NuevaOrdenpago';
import html2canvas from 'html2canvas';
import {jsPDF} from "jspdf";
import Modal from 'react-modal';
export default function OrdPago(props){

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
    let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState(false);
  
	function openModal() {
	  setIsOpen(true);
	}
  
	function afterOpenModal() {
	  // references are now sync'd and can be accessed.
	  subtitle.style.color = '#f00';
	}
  
	function closeModal() {
	  setIsOpen(false);
	}
    const [ordenesPago, setOrdenesPago] =  useState([]);

    useEffect(() =>
        getOrdenesPago()
    , [])

    function getOrdenesPago(){
      
        let id = "14";
        var date = document.getElementById("input-fecha-op").value; 
        fetch('https://compras.grupopetromar.com/apirest/?id='+id+'&fecha='+date)
        .then(response => response.json())
        .then((data) => {
            
            setOrdenesPago(data)
        }); 
       
    }

    function ActualizarStatus(){
        alert("funcion actualizarStatus")
    }

    function verOrdenPago(ID, ordencompraf){
        let id = "14";
        fetch('https://compras.grupopetromar.com/apirest/?id='+id)
        .then(response => response.json())
        .then(data => setOrdenesPago(data));
        var orden;
        for (let item of ordenesPago) {
            if(item.ID === ID){
                orden = item;
            }
        }
        document.getElementById("op-numero").value = orden.ID;
        document.getElementById("op-fecha").value = formatDate(orden.Fecha);
        document.getElementById("op-bancoretiro").value = orden.Banco;
        document.getElementById("op-cantidad").value = (orden.Cantidad);
         
        if(orden.ordencompraf != null){
            document.getElementById("op-folio-orden-compra").value = (orden.ordencompraf);
        }else{
            document.getElementById("op-folio-orden-compra").value = "-";
        }
        document.getElementById("op-anombre").value = orden.Receptor;
        document.getElementById("op-concepto").value = orden.Concepto;
        document.getElementById("firmas-solicito").value = orden.Solicita;
        document.getElementById("firmas-autorizo").value = orden.Autoriza;
    }

    function addCotizacion(){
        alert("funcion addCotizacion")
    }

    function imprimirOrdenPago(){

    }

    function addOrdenPago(){
        var Banco = document.getElementById("op-bancoretiro").value ;
        var Cantidad = document.getElementById("op-cantidad").value ;
        var Receptor = document.getElementById("op-anombre").value ;
        var Concepto = document.getElementById("op-concepto").value ;
        var Solicita = document.getElementById("firmas-solicito").value ;
        var Autoriza = document.getElementById("firmas-autorizo").value ;

        let topost = new FormData();
            topost.append("id", "18");
            topost.append("idempresa", props.dptoid);
            topost.append("banco", Banco);
            topost.append("cantidad", Cantidad);
            topost.append("receptor", Receptor);
            topost.append("concepto", Concepto);
            topost.append("solicita", Solicita);
            topost.append("autoriza", Autoriza);
            
        fetch('https://compras.grupopetromar.com/apirest/',{
            method: 'POST',
            mode: 'cors',
            body: topost
        })
        .then(response => response.text())
        .then((data) => {
            alert(data.trim());
        });

        getOrdenesPago();
    }



    function actualizarOrdenPago(){

            var folio = document.getElementById("op-numero").value;
            if(folio != ""){
                var Banco = document.getElementById("op-bancoretiro").value ;
                var Cantidad = document.getElementById("op-cantidad").value ;
                var Receptor = document.getElementById("op-anombre").value ;
                var Concepto = document.getElementById("op-concepto").value ;
                var Solicita = document.getElementById("firmas-solicito").value ;
                var Autoriza = document.getElementById("firmas-autorizo").value ;

                let topost = new FormData();
                    topost.append("id", "20"); //actualizar orden de pago
                    topost.append("folio", folio);
                    topost.append("banco", Banco);
                    topost.append("cantidad", Cantidad);
                    topost.append("receptor", Receptor);
                    topost.append("concepto", Concepto);
                    topost.append("solicita", Solicita);
                    topost.append("autoriza", Autoriza);
                    
                fetch('https://compras.grupopetromar.com/apirest/',{
                    method: 'POST',
                    mode: 'cors',
                    body: topost
                })
                .then(response => response.text())
                .then((data) => {
                    alert(data.trim());
                });

                getOrdenesPago();
        }else{
            alert("Seleccione una orden de pago");
        }
    }

    function formatDate(date){
		let index = date.search(" ");
		date = date.substring(0, index);
		date = date.split("-");
		let formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
		return(formatedDate);
	}

    function cleanForm(){
        document.getElementById("op-numero").value = null;
        document.getElementById("op-fecha").value = null;
        document.getElementById("op-bancoretiro").value = null;
        document.getElementById("op-cantidad").value = null;
        document.getElementById("op-anombre").value = null;
        document.getElementById("op-concepto").value = null;
        document.getElementById("firmas-solicito").value = null;
        document.getElementById("firmas-autorizo").value = null;
    }


    function Pdf(){
        try{
            var folio = document.getElementById("op-numero").value; 
            if(folio != ""){
           
            var fecha = document.getElementById("op-fecha").value;
            const input = document.getElementById('div-ordenpago');
            html2canvas(input).then((canvas) => {
                let imgWidth = 190;
                let imgHeight = canvas.height * imgWidth / canvas.width;
                const imgData = canvas.toDataURL('img/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
                
                // pdf.output('dataurlnewwindow');
                pdf.save("Orden de Pago F"+ folio +" "+ fecha +".pdf");
            })
            ;
        }else{
            alert("Seleccione una orden de pago");
        }
         

        } catch(Exception){}
    }

    const style = `
        #btns{
            display: flex;
            flex-direction: column;
            padding-bottom: 2vw;
            gap: 2vw;
        }
        .p-3{
            display: flex;
            flex-direction: column;
            gap: 2vw;
        }
        .btn-clean{
            font-weight: bold;
            border-width: 2px;
        }
    `;

    return(
        <div className="container">
            <style>{style}</style>

            <Nabvar departamento={props.rzonsocial} dptoid={props.dptoid}/> 

            <div className="row p-3">
                <div>
                    <span>Filtrar por fecha &nbsp;</span>
                    <input id='input-fecha-op' type='date' style={{width:'10vw',fontSize:'12px', cursor:'pointer'}} onChange={() => getOrdenesPago()}></input>
                </div>
                <button onClick={openModal} class="btn btn-outline-success btn-sm">Nueva Orden de Pago</button>
                <div style={{maxHeight:'22vmax', overflowY: 'scroll', width:'100%'}}>
                    <table id="productstable"  style={{width:'100%'}}> 
                        <tr>
                            <th>Folio</th>
                            <th>Fecha</th>  
                            <th>Orden Compra</th>  
                            <th>Detalles</th>  
                        </tr>

                        {ordenesPago.map(item => ( 
                        <tr>
                            <td className='id-orden' >{item.ID}</td>
                            <td>{ formatDate(item.Fecha) }</td>
                            <td>{ item.ordencompraf }</td>
                            <td>
                                <button type="button" id={item.ID} className='btn btn-outline-success btn-sm' onClick={() => verOrdenPago(item.ID, item.ordencompraf)}>Ver</button>
                            </td>
                            <td>
                                <input id="idreq" value={item.idrequisicion} hidden></input>
                            </td>
                        </tr>
                        ))}	
                        
                        {/* <input id='input-cotizacion' type='file' style={{display:'none'}} onChange={()=> postFile()}></input> */}

                    </table> 
                </div>

                <button className='btn-clean btn btn-outline-success btn-sm' onClick={cleanForm}>LIMPIAR CAMPOS</button>

                <Ordenpago departamento={props.departamento}/>
            </div>

            <div id="btns">
                <button id="btn-guardar" className="btn btn-outline-success btn-sm" onClick={actualizarOrdenPago}>Actualizar</button>
                <button id="btn-imprimir" className="btn btn-outline-success btn-sm" onClick={(e) => Pdf(e)}>IMPRIMIR</button>
            </div>

            <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
       
      >
        <label ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black', fontSize:'32px'}}>Nueva Orden de Compra</label>
        <br></br>
        <br></br>
        <NuevaOrdenpago departamento={props.departamento}  tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} rzonsocial={props.rzonsocial}/>
<br></br>
<br></br>
		<button onClick={closeModal} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     </Modal>

        </div>
    )
}