
import React,{useState, useEffect} from 'react'; 
import  {FaCheckCircle} from 'react-icons/fa'
import axios from '../node_modules/axios'; 
import {Nabvar} from './component/Navbar'; 

import './App.css'; 

function Requisiciones(props) {
	const [couno, setCouno] =  useState([]);  
	const [codos, setCodos] =  useState([]);  
	const [cotres, setCotres] =  useState([]);  

	const [lista, setLista] =  useState([]);  
	const [value, setValue] = useState([]); 
	let id = 0; 
	let tipo = 0; 

	const[btn_Generar, setbtn_Generar] = useState();

	useEffect(()=> {
		getRequisiciones();
	}, [])

	useEffect(()=> {
		getUsuarios();
	}, [])

	async function addSolicita(){ 
		var folio = document.getElementById("folio").value;
		let fd = new FormData() 
		fd.append("id","7") 
		fd.append("folio",folio) 
		fd.append("tipo", "1") 
		fd.append("name", document.getElementById("slc-solicita").value)
		console.log(folio + document.getElementById("slc-solicita").value);
		const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd);
		alert(res.data.trim());
		//verRequisicion(folio);
		document.getElementById("slc-solicita").disabled = true;
		document.getElementById("solicitar").style.visibility = "hidden";
	}

	async function addRevisa(){ 
		var folio = document.getElementById("folio").value;
		let fd = new FormData() 
		fd.append("id","7") 
		fd.append("folio",folio) 
		fd.append("tipo", "2") 
		fd.append("name", document.getElementById("slc-revisa").value)
		console.log(folio + document.getElementById("slc-revisa").value);
		const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd);
		alert(res.data.trim());
		//verRequisicion(folio);
		document.getElementById("slc-revisa").disabled = true;
		document.getElementById("revisar").style.visibility = "hidden";
	}

	async function addRealiza(){ 
		var folio = document.getElementById("folio").value;
		let fd = new FormData() 
		fd.append("id","7") 
		fd.append("folio",folio) 
		fd.append("tipo", "3") 
		fd.append("name", document.getElementById("slc-realiza").value)
		console.log(folio + document.getElementById("slc-realiza").value);
		const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd);
		alert(res.data.trim());
		//verRequisicion(folio);
		document.getElementById("slc-realiza").disabled = true;
		document.getElementById("realizar").style.visibility = "hidden";
	}

	async function addAutoriza(){ 
		var folio = document.getElementById("folio").value;
		let fd = new FormData() 
		fd.append("id","7") 
		fd.append("folio",folio) 
		fd.append("tipo", "4") 
		fd.append("name", document.getElementById("slc-autoriza").value)
		console.log(folio + document.getElementById("slc-autoriza").value);
		const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd);
		alert(res.data.trim());
		//verRequisicion(folio);
		document.getElementById("slc-autoriza").disabled = true;
		document.getElementById("autorizar").style.visibility = "hidden";
	}

	async function generarOrden(idrequisicion){  
		var folio = document.getElementById('folio').value; 
		
		if(folio == idrequisicion){
			if(folio != ""){
				var contador = 0; 
				let fd = new FormData() 
				fd.append("id", "8")
				fd.append("idrequisicion", idrequisicion)
				fd.append("dptoid", props.dptoid)
				
				for(var i=0;i<document.getElementsByName("producto").length;i++){   
					if(document.getElementsByName("checkbox")[i].checked){
						fd.append("productos[]", document.getElementsByName("producto")[i].value)
						contador ++;
					}
				}
			
				if(contador >=1){
					const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd); 
					getRequisiciones();
					cleanForm();
					alert(res.data.trim()); 
				} else {
					alert("Seleccione Almenos Una Opción");
				}

			} else {
				alert("Seleccione una requisición");
			}
		} else {
			alert("Click en ver está requisición para generar orden de compra");
		}
	}

	async function addCotizacion(cell){ 
		console.log(cell);
		id = document.getElementById("folio").value; 
		tipo = cell;

		if(id != ""){
			document.getElementById("input-cotizacion").click();
		}
	}

	async function postFile(){
		let fd = new FormData() 
		fd.append("id", "16")
		fd.append("idorden", id)
		fd.append("tipo", tipo)
		fd.append("file", document.getElementById("input-cotizacion").files[0]) 
		
		const res = await axios.post('https://compras.grupopetromar.com/apirest/',  fd, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});

		verRequisicion(id);
		alert(res.data.trim());
	}

	async function getRequisiciones(){    
		//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
		 
		var id = "5";
		var date = document.getElementById("input-fecha").value; 
		const res = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id+'&date='+date+'&dptoid='+props.dptoid);
		console.log(res.data); 
		var table = document.getElementById('productstable');

		if(res.data.length >= 1){
			setLista(res.data); 
		//	table.removeAttribute("hidden");
		} else {
			//table.setAttribute("hidden", true);
		}
	}

  	async function ActualizarStatus(id){
			/*  GET ROW OF WHERE SELECT WAS CHANGED  */
		var rows = document.getElementsByClassName('id-orden');
		var rw;

		for(let element of rows){
			if (element.innerHTML == id){
				var tr = element.parentElement;
				var td = tr.getElementsByTagName('select')[0];
				rw = td.value;
			}
		}

		if(window.confirm('Quieres actualizar requisición con folio: ' + rw)){
			let fd = new FormData() 
			fd.append("id", "13")
			fd.append("idrequisicion", id)
			fd.append("nvoestado", rw)
			const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd); 
			console.log(res.data);
			alert(res.data);
			getRequisiciones();
		}
	}

	async function verRequisicion(idd){    
		for(var i=0;i<document.getElementsByName("producto").length;i++){
			document.getElementsByName("producto")[i].value = "";
			document.getElementsByName("descripcion")[i].value = "";
			document.getElementsByName("unidad")[i].value = ""; 
			document.getElementsByName("cantidad")[i].value = "";
			document.getElementsByName("checkbox")[i].checked = false;
		}

		for(var i=0;i<document.getElementsByName("proveedor").length;i++){
			document.getElementsByName("proveedor")[i].value = ""; 
			document.getElementsByName("precio")[i].value = "";      
		}
		
		try{
			document.getElementById("solicitar").style.visibility = "visible";
			document.getElementById("slc-solicita").disabled = false;
		} catch (Exception){}
		
		document.getElementById("observaciones").value = ""; 
        var idrequisicion = idd; 
        var id = "6";
        const res = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id+'&idrequisicion='+idrequisicion);
        document.getElementById("departamento").value = res.data[0].departamento;
        document.getElementById("fechacaptura").value = formatDate(res.data[0].fechacaptura);
        document.getElementById("solicita").value = res.data[0].solicita;
        //document.getElementById("fecha").value = res.data[0].fecha;
        document.getElementById("observaciones").value = res.data[0].observaciones;
		document.getElementById("folio").value = res.data[0].folio;
		setCouno(res.data[0].couno);
		setCodos(res.data[0].codos);
		setCotres(res.data[0].cotres);
		console.log(res.data);
		console.log(res.data[1].length);

		if (props.tipo == "2") { 
			setbtn_Generar(idd);
			/*
			if(document.getElementById("btn-Generar")){
				document.getElementById("btn-Generar").remove();
			}
			
			var btn_Generar = document.createElement("button");
			btn_Generar.setAttribute("id", "btn-Generar");
			btn_Generar.innerHTML = "Generar";
			btn_Generar.classList.add("Bttns");
			//btn_Generar.setAttribute("id", idd);
			//btn_Generar.setAttribute("onclick", generarOrden(idd));
			//btn_Generar.setAttribute("onclick", "generarOrden("+idd+")");
			//btn_Generar.setAttribute("onclick", function(){generarOrden(idd)});
			var div_Firmas = document.getElementById("div-firmas");
			div_Firmas.appendChild(btn_Generar);
			*/
		}

		try{
			var tableHeaderRowCount = 2;
			var table = document.getElementById('requisicionprods');
			var rowCount = table.rows.length;

			for (var i = tableHeaderRowCount; i < rowCount; i++) {
				table.deleteRow(tableHeaderRowCount);
			}

			if(res.data[1].indexOf(1)){ 
				for(var i=0;i<res.data[1].length-1;i++){
					var newrow = table.lastChild.cloneNode(true);
					newrow.firstChild.innerHTML = parseFloat(newrow.firstChild.innerHTML) + 1;
					table.appendChild(newrow);
				}

				for(var i=0;i<res.data[1].length;i++){
					document.getElementsByName("producto")[i].value = res.data[1][i].producto;
					document.getElementsByName("descripcion")[i].value = res.data[1][i].descripcion; 
					document.getElementsByName("unidad")[i].value = res.data[1][i].unidad;
					document.getElementsByName("preciouni")[i].value = res.data[1][i].costouni;
					
					if(res.data[1][i].cantidad > 0){
						document.getElementsByName("cantidad")[i].value = res.data[1][i].cantidad;
					}

					if(res.data[1][i].seleccionado ==  "1"){
						document.getElementsByName("checkbox")[i].checked = true;
					}
				}
			}  
		} catch (Exception){}	
	
		try{
			if(res.data.indexOf(2)){
				for(var i=0;i<document.getElementsByName("proveedor").length;i++){
					if(res.data[2][i].proveedor != ""){
						document.getElementsByName("proveedor")[i].value = res.data[2][i].proveedor;  
						document.getElementsByName("precio")[i].value = res.data[2][i].precio;  
					}
				} 
			}
		} catch (Exception){}

		try{
			var textArea = document.getElementById("autorizartextarea"); 

			if(res.data.indexOf(3)){
				for(var i=0;i<res.data[3].length;i++){
					if(res.data[3][i].tipo == "1"){
						document.getElementById("slc-solicita").value =res.data[3][i].name;
						document.getElementById("slc-solicita").disabled = true;
						document.getElementById("solicitar").style.visibility = "hidden";
					}

					if(res.data[3][i].tipo == "2"){
						document.getElementById("slc-revisa").value =res.data[3][i].name;
						document.getElementById("slc-revisa").disabled = true;
						document.getElementById("revisar").style.visibility = "hidden";
					}

					if(res.data[3][i].tipo == "3"){
						document.getElementById("slc-realiza").value =res.data[3][i].name;
						document.getElementById("slc-realiza").disabled = true;
						document.getElementById("realizar").style.visibility = "hidden";
					}
					
					if(res.data[3][i].tipo == "4"){
						document.getElementById("slc-autoriza").value =res.data[3][i].name;
						document.getElementById("slc-autoriza").disabled = true;
						document.getElementById("autorizar").style.visibility = "hidden";
					}
				} 
			}
		} catch (Exception){}
	}

	function formatDate(date){
		let index = date.search(" ");
		date = date.substring(0, index);
		date = date.split("-");
		let formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
		return(formatedDate);
	}

	function desactivarRequisicion(idreq){
		let toSend = new FormData();
		toSend.append("id", "19");/////////ALIVIANESE PADRINOLI SIUU
		toSend.append("idreq", idreq);

		fetch("https://compras.grupopetromar.com/apirest/", {
			method: "POST",
			mode: "cors",
			body: toSend
		})
		.then(response => response.text())
		.catch(error => alert(error))
		.then((data)=> {
			if(data){
				alert("Requisicion eliminada");
				getRequisiciones();
				cleanForm();
			}
		})
	}

	async function getUsuarios(){
		var id = "2";
		const rese = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id); 
		console.log(rese.data);
		setValue(rese.data);    
	}

	function cleanForm(){
		let input1 = document.getElementById("folio");
		let input2 = document.getElementById("departamento");
		let input3 = document.getElementById("fechacaptura");
		let input4 = document.getElementById("solicita");
		let input5 = document.querySelectorAll("[name='producto']");
		let input6 = document.querySelectorAll("[name='descripcion']");
		let input7 = document.querySelectorAll("[name='unidad']");
		let input8 = document.querySelectorAll("[name='cantidad']");
		let input9 = document.querySelectorAll("[name='preciouni']");
		let input10 = document.querySelectorAll("[name='proveedor']");
		let input11 = document.querySelectorAll("[name='precio']");
		let input12 = document.getElementById("observaciones");

		input1.value = null;
		input2.value = null;
		input3.value = null;
		input4.value = null;
		
		for (let item of input5){
			item.value = null;
		}
		for (let item of input6){
			item.value = null;
		}
		for (let item of input7){
			item.value = null;
		}
		for (let item of input8){
			item.value = null;
		}
		for (let item of input9){
			item.value = null;
		}
		for (let item of input10){
			item.value = null;
		}
		for (let item of input11){
			item.value = null;
		}

		input12.value = null;
	}

  		// Dynamically create select list
	let options = [];

	return (
		<div className="container ">
			<input id='input-cotizacion' type='file' style={{display:'none'}} onChange={()=> postFile()}></input>

			<Nabvar departamento={props.rzonsocial} dptoid={props.dptoid}/>    

			<div className="row p-3">
				<div>
					<span>Filtrar por fecha &nbsp; </span>
					<input id='input-fecha' type='date' style={{width:'10vw',fontSize:'12px', cursor:'pointer'}} onChange={() => getRequisiciones()}></input>
				</div>

				<div  style={{maxHeight:'22vmax', overflowY: 'scroll', width:'100%'}}>
					<table id="productstable" style={{width:'100%'}}>
						<tr>
							<th>Folio</th>
							<th>Fecha</th>
							<th>Solicita</th>
							<th>Estado</th>
							<th>Detalles</th>
							
							{(props.tipo == "2") ? <th>Orden de Compra</th> : <th>Orden de Compra</th> }

							<th>Eliminar</th>
						</tr>

						{ lista.map(item => ( 
						<tr>
							<td className='id-orden'>{item.idrequisicion}</td>
							<td>{ formatDate(item.fechacaptura) }</td>
							<td>{item.name}</td>
							<td>
								{((item.estado == "Generada") && (props.tipo == "2")) ? 
								<select name={item.estado} onChange={() => ActualizarStatus(item.idrequisicion)}>
								<option>{item.estado}</option>
								<option>Cancelada</option>
								<option>Surtida</option>
								</select> :  <label>{item.estado}</label>}
							</td>
							<td><button type="button" className='btn btn-outline-success btn-sm' onClick={() => verRequisicion(item.idrequisicion)} >Ver</button></td>

							{ (item.ordencompra == null) ? 
							<td>
								{(props.tipo != "2") ? <label></label> :
								<button  className='Bttns' hidden  type="button" onClick={() => generarOrden(item.idrequisicion)}>Generar</button>
								}
							</td> : <td>Generada</td>
							}

							<td>
								<button className='btn btn-outline-success btn-sm' onClick={ () => desactivarRequisicion(item.idrequisicion) }>Eliminar</button>
							</td>
						</tr> 
						))}	
					</table> 
				</div>

                <div style={{margin:'auto'}} > 
					<br></br> 

					<div style={{backgroundColor:'white', border:'2px solid black', borderRadius:'5px', width:'min-content', margin:'auto', padding:'12px'}}>
						<table > 
							<tr>
								<th  colspan="2"  style={{borderRadius: '20px 20px 0px 0px', height:'30px', fontFamily:'Roboto, sans-serif', fontSize:'10px'}}><label style={{fontSize:'16px'}}>Requisición de Compra</label></th>  
							</tr>

							<td>Folio: <input readonly="readonly" id="folio" style={{height:'20px', width:'60px'}}/></td>
							
							<tr></tr>

							<tr>
								<td>
									<label style={{fontFamily:'Roboto, sans-serif'}}>Departamento Solicitante:</label>
									<br></br>
									<input id="departamento" readonly="readonly" style={{width:'450px', height:'20px'}}></input>
								</td> 
								
								<td style={{width:'200px'}}><label style={{fontFamily:'Roboto, sans-serif'}}>Fecha Emisión:</label><br/>
									<input id="fechacaptura" readonly="readonly" style={{width:'auto', height:'20px'}} />
								</td>
							</tr>

							<tr>
								<td>
									<label style={{fontFamily:'Roboto, sans-serif'}}>Solicitado Por:</label><br/>
									<input id="solicita" readonly="readonly"  style={{width:'450px', height:'20px'}} />
								</td>  
							</tr>  
						</table>	
						
						<br/>

						<table id='requisicionprods' style={{width:'574px'}}> 
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
								<td> <input name="producto" readonly="readonly" style={{width:'162px', height:'20px'}}/></td> 
								<td> <input name="descripcion" readonly="readonly" style={{width:'236px', height:'20px'}}/></td>
								<td> <input name="unidad" readonly="readonly" style={{width:'70px', height:'20px'}}/></td> 
								<td> <input name="cantidad" readonly="readonly" style={{width:'70px', height:'20px'}} /></td>
								<td> <input name="preciouni" readonly="readonly" style={{width:'70px', height:'20px'}} /></td>
								<td> <input type='checkbox' name="checkbox"></input> </td>
							</tr>
						</table>	
						
						<br/>
			
						<table>
							<tr>
								<th></th>
								<td>Proveedor</td>
								<td>Precio Cotizado</td>
								<td>Cotización</td>
							</tr>
		
							<tr>
								<td>1</td>

								<td> 
									<input  name="proveedor" readonly="readonly" style={{width:'330px', height:'20px'}}/>
								</td> 
								<td> 
									<input name="precio" readonly="readonly" style={{width:'132px', height:'20px'}} />
								</td> 

								{(couno == null) ? 
								<td align="center"><button   className='btn btn-outline-success btn-sm' onClick={()=>addCotizacion("1")}>Añadir</button></td>   :
								<td align="center"><a target="_blank" href={'https://compras.grupopetromar.com/apirest/cotizaciones/'+couno}>Ver</a></td>
								}        
							</tr> 

							<tr>
								<td>2</td>

								<td> 
									<input name="proveedor" readonly="readonly"  style={{width:'330px', height:'20px'}}/>
								</td> 
								<td> 
									<input name="precio" readonly="readonly" style={{width:'132px', height:'20px'}} />
								</td> 

								{(codos == null) ? 
								<td align="center"><button   className='btn btn-outline-success btn-sm' onClick={()=>addCotizacion("2")}>Añadir</button></td> :
								<td align="center"><a target="_blank" href={'https://compras.grupopetromar.com/apirest/cotizaciones/'}>Ver</a></td>
								}     
							</tr>
							
							<tr>
								<td>3</td>
								
								<td> 
									<input  name="proveedor" readonly="readonly" style={{width:'330px', height:'20px'}}/>
								</td> 
								<td> 
									<input name="precio" readonly="readonly" style={{width:'132px', height:'20px'}} />
								</td> 

								{(cotres ==  null) ? 
								<td align="center"><button  className='btn btn-outline-success btn-sm' onClick={()=>addCotizacion("3")}>Añadir</button></td> :
								<td align="center"><a target="_blank" href={'https://compras.grupopetromar.com/apirest/cotizaciones/'}>Ver</a></td>
								}
							</tr> 
						</table>	
						
						<br/>
						
						<table>
							<tr>
								<th></th>
								<td>Observaciones</td>
							</tr>

							<tr>
								<td>-</td>
								<td> 
									<textarea id="observaciones" readonly="readonly" rows="2" style={{width:'556px',   resize: 'none'}}></textarea>
								</td> 
							</tr> 
						</table>

						{(props.tipo != "2") ? 
						<label></label>:
						
						<div id="div-firmas">
							<table>
								<tr>
									<th>
										</th>
										<td>Solicita </td>
								</tr>
			
								<tr>
									<td></td>
									
									<td> 
										<select id="slc-solicita" style={{height:'30.8px'}}>
											{ value.map(item => ( 
											<option> {item.name}</option>    
											))}  
										</select> 
										
										<button id="solicitar" className="btn btn-outline-success btn-sm" onClick={(e) => addSolicita()} >Agregar <FaCheckCircle /></button> 
									</td>		
								</tr> 
								
								<tr>
									<th></th>
									<td>Revisa</td>
								</tr>
			
								<tr>
									<td></td>

									<td> 
										<select id="slc-revisa" style={{height:'30.8px'}}>
											{ value.map(item => ( 
											<option> {item.name}</option>    
											))}  
										</select> 
										
										<button id="revisar" className="btn btn-outline-success btn-sm" onClick={(e) => addRevisa()} >Agregar <FaCheckCircle /></button> 
									</td>	
								</tr> 
								
								<tr>
									<th></th>
									<td>Realiza</td>
								</tr>

								<tr>
									<td></td>

									<td> 
										<select id="slc-realiza" style={{height:'30.8px'}}>
											{ value.map(item => ( 
											<option> {item.name}</option>    
											))}  
										</select> 
										
										<button id="realizar" className="btn btn-outline-success btn-sm" onClick={(e) => addRealiza()} >Agregar <FaCheckCircle /></button> 
									</td>	
								</tr> 

								<tr>
									<th></th>
									<td>Autoriza</td>
								</tr>
			
								<tr>
									<td></td>
									
									<td> 
										<select id="slc-autoriza" style={{height:'30.8px'}}>
											{ value.map(item => ( 
											<option> {item.name}</option>    
											))}  
										</select> 

										<button id="autorizar" className="btn btn-outline-success btn-sm" onClick={(e) => addAutoriza()} >Agregar <FaCheckCircle /></button> 
									</td>	
								</tr> 
							</table>

							{(btn_Generar==null)?
								<button disabled={'disabled'}>Generar</button>:
								<button className={'Bttns'} onClick={(e) => generarOrden(btn_Generar)}>Generar</button>
							}
						</div>
						}
					</div>
				</div>
			</div>
		</div>
	);   
}

export default Requisiciones;
