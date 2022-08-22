import add from './resources/add.svg';
import React,{useState, useEffect} from 'react'; 
import  {FaCheckCircle} from 'react-icons/fa'
import axios from '../node_modules/axios'; 
import {Nabvar} from './component/Navbar'; 

import './App.css'; 

function NvaRequisicion(props) {
	const [dptos, setDeptos] = useState([]); 
	const [listadepartamento, setListadepartamento] =  useState([]);

    useEffect(()=> {
        getImagenes();
	}, [])

	useEffect(()=> {
		getDepartamentos();
	}, [])

	async function getDepartamentos(){
		var id = "10";
		const rese = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id);  
		setDeptos(rese.data);  
		console.log(rese.data);
		var Data     = JSON.stringify(rese.data);
		console.log(Data[0]); 
	}

	async function getImagenes(){
		// var id = "1";
		// const res = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id);
		// setLista(res.data); 
	}

    async function addRequisicion(e) {
        e.preventDefault();
        //var fecha = document.getElementById("fecha").value;
        var userid = props.userid;
        var observaciones = document.getElementById("observaciones").value;
		var dptoid = document.getElementById("dptoid").value; 
		let fd = new FormData()
        fd.append("id", "6")
        //fd.append("fecha", fecha)
        fd.append("userid", userid)
        fd.append("observaciones", observaciones)
		fd.append("dptoid", dptoid)
		fd.append("empresaid", props.dptoid)

        for(let i=0;i<document.getElementsByName("producto").length;i++){
            fd.append("producto[]", document.getElementsByName("producto")[i].value)  
            fd.append("descripcion[]", document.getElementsByName("descripcion")[i].value)  
            fd.append("unidad[]", document.getElementsByName("unidad")[i].value)  
            fd.append("cantidad[]", document.getElementsByName("cantidad")[i].value)  
			fd.append("precio[]", document.getElementsByName("preciouni")[i].value)  
        }

        for(let i=0;i<document.getElementsByName("proveedor").length;i++){
            fd.append("proveedores[]", document.getElementsByName("proveedor")[i].value)  
            fd.append("precios[]", document.getElementsByName("precio")[i].value)      
        } 

		const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd); 
		
		if(res.data == "1"){
			alert("Datos Guardados Correctamente");
			
			for(let i=0;i<document.getElementsByName("producto").length;i++){
				document.getElementsByName("producto")[i].value = "";
				document.getElementsByName("descripcion")[i].value = "";
				document.getElementsByName("unidad")[i].value = ""; 
				document.getElementsByName("cantidad")[i].value = "";
			}

			for(let i=0;i<document.getElementsByName("proveedor").length;i++){
				document.getElementsByName("proveedor")[i].value = ""; 
				document.getElementsByName("precio")[i].value = "";      
			} 

			document.getElementById("observaciones").value = ""; 
		}
		console.log(res.data); 
	}

	const [value, setValue] = useState([]); 

	useEffect(()=> {
		getUsuarios();
	}, [])

	function Agregar(){
		//alert("a");
		var table = document.getElementById('tableproductos');
		//var row = document.getElementById("myTable");
		/*
		var x = table.insertRow(0);
		var e = table.rows.length-1;
		var l = table.rows[e].cells.length;
		*/
		//x.innerHTML = "&nbsp;";
		/*
		table.rows[0].insertCell(c);
			table.rows[0].cells[0].innerHTML = "<input></input>";
			table.rows[0].insertCell(c);
			table.rows[0].cells[1].innerHTML = "<input></input>";
			table.rows[0].insertCell(c);
			table.rows[0].cells[2].innerHTML = "<input></input>";
			table.rows[0].insertCell(c);
			table.rows[0].cells[3].innerHTML = "<input></input>";
			table.rows[0].insertCell(c);
			table.rows[0].cells[4].innerHTML = "<input></input>";
			table.rows[0].insertCell(c);
			table.rows[0].cells[5].innerHTML = "<input></input>";
		*/

		var newrow = table.lastChild.cloneNode(true);
		newrow.firstChild.innerHTML = parseFloat(newrow.firstChild.innerHTML) + 1; 

		for (var i = 0; i <  newrow.getElementsByTagName("input").length; i++){
			var a = newrow.getElementsByTagName("input")[i];  
			a.value = ""; 
		}

		table.appendChild(newrow);  
	}

	async function getUsuarios(){
		var id = "2";
		const rese = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id); 
		console.log(rese.data);
		setValue(rese.data);    
	}

  	// Dynamically create select list
	let options = [];

	const today = new Date().toISOString().slice(0, 10);

	return (
		<div className="container ">
			<Nabvar dptoid={props.dptoid} departamento={props.rzonsocial}/>    
			
			<div className="row p-3">
				<div style={{margin:'auto'}}> 
					<br></br>
				
					<div style={{backgroundColor:'white', border:'2px solid black', borderRadius:'5px', width:'min-content', margin:'auto', padding:'12px'}}> {/* width:'600px' */}
						<table> 
							<tr>
								<th  colspan="2"  style={{borderRadius: '20px 20px 0px 0px', height:'30px', fontFamily:'Roboto, sans-serif', fontSize:'10px'}}><label style={{fontSize:'16px'}}>Requisición de Compra</label></th>  
							</tr>

							<tr>
								<td>
									<label style={{}}>Departamento Solicitante:</label>
									<br></br>
									<select id="dptoid"  style={{width:'450px', height:'25px'}}   onChange={(e) => setListadepartamento(e.target.value)}>
										{ dptos.map(item => ( 
										<option value={item.dptoid}> {item.name}</option>))
										}  
									</select>   
								</td> 

								<td style={{width:'200px'}}>
									<label style={{}}>Fecha Emisión:</label><br/>
									<input style={{width:'120px', height:'20px'}} value={today}/>
								</td>
							</tr>
							
							<tr>
								<td>
									<label style={{}}>Solicitado Por:</label>
									<br/>
									<input  style={{width:'450px', height:'20px'}} value={props.name}/>
								</td>  

								<td>
									<input  value={props.dptoid} hidden="hidden"/>
								</td>	
							</tr>  
						</table>	
						<br/>
		
						<table id="tableproductos">
							<tr>
								<th></th>  
								<td style={{borderRadius: '20px 20px 0px 0px', height:'30px', fontSize:'16px'}}><label style={{}}>Producto</label></td>
								<td style={{borderRadius: '20px 20px 0px 0px', height:'30px', fontSize:'16px'}}><label style={{}}>Descripcion</label></td>
								<td style={{borderRadius: '20px 20px 0px 0px', height:'30px', fontSize:'16px'}}><label style={{}}>Unidad</label></td>
								<td style={{borderRadius: '20px 20px 0px 0px', height:'30px', fontSize:'16px'}}><label style={{}}>Cantidad</label></td>
								<td style={{borderRadius: '20px 20px 0px 0px', height:'30px', fontSize:'16px'}}><label style={{}}>Precio</label></td>
							</tr>

							<tr>
								<td>1</td>
								<td> <input   style={{width:'162px', height:'20px'}} name="producto"/></td> 
								<td> <input name="descripcion" style={{width:'227px', height:'20px'}}/></td>
								<td> <input name="unidad"  style={{width:'70px', height:'20px'}}/></td>  
								<td> <input name="cantidad" type="number" min="1" step="any" style={{width:'70px', height:'20px'}} /></td>
								<td> <input name="preciouni" type="number" min="1" step="any" style={{width:'70px', height:'20px'}} /></td>
							</tr>
						</table>	

						<img onClick={() => Agregar()} src={add} className='btn btn-outline-success btn-sm' style={{padding:'2px 2px', backgroundColor:'#0071ce', marginLeft: '91.4%'}}></img>
						<br/>
						
						<table>
							<tr>
								<th></th>
								<td>Proveedor</td>
								<td>Precio Cotizado</td> 
							</tr>
		
							<tr>
								<td>1</td>
								<td> 
									<input  name="proveedor" style={{width:'420px', height:'20px'}}/>
								</td> 
								<td> 
									<input name="precio" type="number" min="1" step="any" style={{width:'auto', height:'20px'}} />
								</td> 
							</tr>

							<tr>
								<td>2</td>
								<td> 
									<input name="proveedor" style={{width:'420px', height:'20px'}}/>
								</td> 
								<td> 
									<input name="precio"  type="number" min="1" step="any"style={{width:'auto', height:'20px'}} />
								</td> 
							</tr>

							<tr>
								<td>3</td>
								<td> 
									<input  name="proveedor" style={{width:'420px', height:'20px'}}/>
								</td>
								<td > 
									<input name="precio"  type="number" min="1" step="any" style={{width:'auto', height:'20px'}} />
								</td> 
							</tr> 
						</table>	
						<br/>
						
						<table style={{width:'auto', marginRight:'0'}}>
							<tr>
								<td>Observaciones</td>
							</tr>

							<tr>
								<td> 
									<textarea rows="2" id="observaciones" style={{width:'556px',   resize: 'none'}}></textarea>
								</td> 
							</tr> 

							<tr>
								<td>
									<button  className="btn btn-outline-success btn-sm" onClick={(e) => addRequisicion(e)} >Guardar <FaCheckCircle /></button> 
								</td>
							</tr>
						</table>	
					</div>
				</div>
			</div>
		</div>
	);   
}

export default NvaRequisicion;