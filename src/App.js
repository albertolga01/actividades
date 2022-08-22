 
import React,{useState, useEffect} from 'react'; 
import  {FaCheckCircle, FaTrash, FaEdit} from 'react-icons/fa'
import axios from '../node_modules/axios';
import {Nabvar} from './component/Navbar'; 

import './App.css'; 

function App(props) {


   
    const [listausuario, setListausuario] =  useState([]); 
    const [listadepartamento, setListadepartamento] =  useState([]); 
    const [lista, setLista] =  useState([]); 
    const [listaP, setListaP] =  useState([]); 
    const [descripcion, setDescripcion] = useState([]);
    const [descripcionproveedor, setDescripcionProveedor] = useState([]);
    const [imagen, setImagen] = useState([]);
    const [value, setValue] = useState([]);
    const [dptos, setDeptos] = useState([]);

	useEffect(()=> {
		getImagenes();
	}, [])

	useEffect(()=> {
		getProveedores();
	}, [])

	useEffect(()=> {
		getUsuarios();
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

	async function getUsuarios(){
		var id = "2";
		const rese = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id); 
		//  console.log(rese.data);
		setValue(rese.data);    
	}

  // Dynamically create select list
  let options = [];

	async function getImagenes(){
		var id = "1";
		const res = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id);
		setLista(res.data); 
	}

	async function getProveedores(){
		var id = "12";
		const res = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id);
		console.log(res.data);
		setListaP(res.data); 
	}

	async function addProveedor(e) {
		e.preventDefault(); 
		var inputpro = document.getElementById("nombreproveedor");
		var descpro = document.getElementById("descproveedor");

		if(inputpro.value != ""){
			let fd = new FormData() 
			fd.append("id", "15")
			fd.append("proveedor", inputpro.value)
			fd.append("descripcion", descripcionproveedor) 
			const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd); 
			//getImagenes();
			alert(res.data.msg);
			inputpro.value = null;
			descpro.value = null;
      getProveedores();
		} else {
			alert("Capture el proveedor para continuar");
		}
	}

	async function addImagen(e) {
		e.preventDefault();
		var select = document.getElementById("idselect");
		var desc = document.getElementById("agg");
		var input = document.getElementById("desc");
		let fd = new FormData() 
		fd.append("id", "1")
		fd.append("imagen", imagen)
		fd.append("descripcion", descripcion)
		fd.append("userid", select.options[select.selectedIndex].value)
		const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd); 
		getImagenes();
		alert(res.data.msg);
		input.value = null;
		desc.value = null;
	}

	async function addUsuario(e) {
		e.preventDefault();
		let fd = new FormData() 
		var selectdpto = document.getElementById("selectdpto");
		var newusertipo = document.getElementById("newuser-tipo");
		fd.append("id", "2")
		fd.append("name", listausuario)
		fd.append("dptoid", selectdpto.options[selectdpto.selectedIndex].value)
		fd.append("tipo", newusertipo.options[newusertipo.selectedIndex].value)
		fd.append("user", document.getElementById("newuser-user").value)
		fd.append("password", document.getElementById("newuser-password").value) 
		const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd);  
		getUsuarios(); 
		console.log(document.getElementById("newuser-tipo").value);
		console.log(document.getElementById("newuser-user").value);
		console.log(document.getElementById("newuser-password").value);
		alert(res.data.msg);
      //CLEANING FORM
    document.getElementById("selectdpto").value = 1;
    document.getElementById("newuser-tipo").value = 1;
    var addUser_Inputs = document.getElementsByClassName("form-control");
    addUser_Inputs[0].value = null;
    addUser_Inputs[1].value = null;
    addUser_Inputs[2].value = null;
	}

	async function deleteImagen(id){
		if(window.confirm('¿Quieres eliminar esta imagen?')){
			let fd = new FormData() 
			fd.append("id", "3")
			fd.append("idimagen", id) 
			const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd);
			getImagenes(); 
			alert(res.data.msg);		
		}
	}

	async function deleteUsuario(id){
		if(window.confirm('¿Quieres eliminar este usuario?')){
			let fd = new FormData() 
			fd.append("id", "4")
			fd.append("idusuario", id)  
			const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd);
			getUsuarios(); 
			console.log(res.data);
			alert(res.data.msg);		
		} 
	}

	async function editUsuario(id){
		if(window.confirm('Quieres actualizar este usuario?')){
			let fd = new FormData() 
			var uno = document.getElementById("uno"+id).checked;
			var dos = document.getElementById("dos"+id).checked;
			var tres = document.getElementById("tres"+id).checked; 
			var cuatro = document.getElementById("cuatro"+id).checked; 
			var cinco = document.getElementById("cinco"+id).checked; 
			var seis = document.getElementById("seis"+id).checked; 
			var siete = document.getElementById("siete"+id).checked; 
			var ocho = document.getElementById("ocho"+id).checked; 
			var nueve = document.getElementById("nueve"+id).checked; 
			var diez = document.getElementById("diez"+id).checked; 
			var once = document.getElementById("once"+id).checked; 
			var doce = document.getElementById("doce"+id).checked; 
			
			fd.append("id", "14")
			fd.append("idusuario", id) 
			fd.append("uno", +uno) 
			fd.append("dos", +dos) 
			fd.append("tres", +tres)  
			fd.append("cuatro", +cuatro)  
			fd.append("cinco", +cinco)  
			fd.append("seis", +seis)  
			fd.append("siete", +siete)  
			fd.append("ocho", +ocho)  
			fd.append("nueve", +nueve)  
			fd.append("diez", +diez)  
			fd.append("once", +once)  
			fd.append("doce", +doce)  
			
			const res = await axios.post('https://compras.grupopetromar.com/apirest/', fd);
			getUsuarios(); 
			console.log(res.data);
			alert(res.data.trim());
		} 
	}

  	return (
		<div className="container ">
			<Nabvar departamento={props.rzonsocial} dptoid={props.dptoid}/>    
				<div className="row p-3"> 
  					<div className="col-md-5 p-2 " style={{margin: 'auto'}}>
    <form className="card p-2 mt-2 border-secondary" encType="multipart/form-data" >
      <h5>Agregar Nuevo Usuario</h5>    
      <label>Departamento:</label> 
      
      <select  id="selectdpto" onChange={(e) => setListadepartamento(e.target.value)}>
        { dptos.map(item => ( 
          <option value={item.dptoid}> {item.name}</option>))
        }  
      </select>       
      <br></br>

      <label>Tipo: </label> 
      <select id="newuser-tipo">
        <option value='1'>Usuario</option>
        <option value='2'>Administrador</option> 
      </select>
      <br></br>

      <input placeholder="Nombre" className="form-control" onChange={(e) => setListausuario(e.target.value)} >
      </input> 
        <br></br> 

      <input id="newuser-user" placeholder="Usuario" className="form-control"></input>
      <br></br>

      <input id="newuser-password" placeholder="Contraseña" className="form-control" type="password"></input>
      <br></br>

     
      
      
      <button  className="btn btn-outline-success btn-sm" onClick={(e) => addUsuario(e)} >Agregar <FaCheckCircle /></button> 
    </form>
  </div>

       <div className="col-md-7 p-2" style={{maxHeight:'39vmax', overflowY: 'scroll'}}>
       { value.map(item => (
            <div className="card p-2 mt-2 border-secondary" key={item.id}>
              <div className="card-body"  style={{padding: '0',display : 'flex', flexDirection : 'row', justifyContent: 'space-between'}}>

              <div>
            <b><label >Nombre:</label></b> <label className="text-primary">{item.name}</label> &nbsp;&nbsp; <br/><b><label >Usuario:</label></b> <label className="text-primary">{item.usuario}</label>  <br></br>
            <b><label > Departamento:</label> </b><label className="text-primary">{item.departamento}</label>  
                  <br></br> <div style={{display:'flex'}}><b><label >Accesos: &nbsp;</label></b>
                  {(item.uno == "1") ? 
                        <div><label>Petromar</label>&nbsp;<input id={"uno"+item.userid} type="checkbox" value="compras" defaultChecked={true}  />&nbsp;</div>
                         :   
                         <div><label>Petromar</label>&nbsp;<input id={"uno"+item.userid} type="checkbox" value="compras" />&nbsp;</div>}
              {(item.dos == "1") ? 
                        <div><label>Rio</label>&nbsp;<input id={"dos"+item.userid}  type="checkbox" value="compras" defaultChecked={true} />&nbsp;</div>
                         :   
                         <div><label>Rio</label>&nbsp;<input id={"dos"+item.userid} type="checkbox" value="compras"/>&nbsp;</div>}
               {(item.tres == "1") ? 
                        <div><label>Ramiro Lopez</label>&nbsp;<input id={"tres"+item.userid} type="checkbox" value="compras" defaultChecked={true} />&nbsp;</div>
                         :   
                         <div><label>Ramiro Lopez</label>&nbsp;<input id={"tres"+item.userid} type="checkbox" value="compras"/>&nbsp;</div>}           
                         </div>   
                         <div style={{display:'flex'}}> 
              {(item.cuatro == "1") ? 
                        <div><label>PPA</label>&nbsp;<input id={"cuatro"+item.userid} type="checkbox" value="compras" defaultChecked={true} />&nbsp;</div>
                         :   
                         <div><label>PPA</label>&nbsp;<input id={"cuatro"+item.userid} type="checkbox" value="compras"/>&nbsp;</div>}          
                       {(item.cinco == "1") ? 
                        <div><label>Gas Union</label>&nbsp;<input id={"cinco"+item.userid} type="checkbox" value="compras" defaultChecked={true} />&nbsp;</div>
                         :   
                         <div><label>Gas Union</label>&nbsp;<input id={"cinco"+item.userid} type="checkbox" value="compras"/>&nbsp;</div>}          
                         {(item.seis == "1") ? 
                        <div><label>Operadora PPA</label>&nbsp;<input id={"seis"+item.userid} type="checkbox" value="compras" defaultChecked={true} />&nbsp;</div>
                         :   
                         <div><label>Operadora PPA</label>&nbsp;<input id={"seis"+item.userid} type="checkbox" value="compras"/>&nbsp;</div>}          
                         {(item.siete == "1") ? 
                        <div><label>Apoyos de Occidente</label>&nbsp;<input id={"siete"+item.userid} type="checkbox" value="compras" defaultChecked={true} />&nbsp;</div>
                         :   
                         <div><label>Apoyos de Occidente</label>&nbsp;<input id={"siete"+item.userid} type="checkbox" value="compras"/>&nbsp;</div>}          
                        </div>

                        <div style={{display:'flex'}}>
                        {(item.ocho == "1") ? 
                        <div><label>Maria Isabel Lopez</label>&nbsp;<input id={"ocho"+item.userid} type="checkbox" value="compras" defaultChecked={true} />&nbsp;</div>
                         :   
                         <div><label>Maria Isabel Lopez</label>&nbsp;<input id={"ocho"+item.userid} type="checkbox" value="compras"/>&nbsp;</div>}          
                         {(item.nueve == "1") ? 
                        <div><label>Administradora de MZT</label>&nbsp;<input id={"nueve"+item.userid} type="checkbox" value="compras" defaultChecked={true} />&nbsp;</div>
                         :   
                         <div><label>Administradora de MZT</label>&nbsp;<input id={"nueve"+item.userid} type="checkbox" value="compras"/>&nbsp;</div>}          
                         {(item.diez == "1") ? 
                        <div><label>Asociación Plaza Rio</label>&nbsp;<input id={"diez"+item.userid} type="checkbox" value="compras" defaultChecked={true} />&nbsp;</div>
                         :   
                         <div><label>Asociación Plaza Rio</label>&nbsp;<input id={"diez"+item.userid} type="checkbox" value="compras"/>&nbsp;</div>}          
                       </div>
                       <div style={{display:'flex'}}>
                         {(item.once == "1") ? 
                        <div><label>Competro</label>&nbsp;<input id={"once"+item.userid} type="checkbox" value="compras" defaultChecked={true} />&nbsp;</div>
                         :   
                         <div><label>Competro</label>&nbsp;<input id={"once"+item.userid} type="checkbox" value="compras"/>&nbsp;</div>}          
                         {(item.doce == "1") ? 
                        <div><label>Servitanques</label>&nbsp;<input id={"doce"+item.userid} type="checkbox" value="compras" defaultChecked={true} />&nbsp;</div>
                         :   
                         <div><label>Servitanques</label>&nbsp;<input id={"doce"+item.userid} type="checkbox" value="compras"/>&nbsp;</div>}          
                          </div>
                          
                
                  
                 
                  </div>  <div className="d-flex flex-row"  >
                       <button className="Bttn" 
                           onClick={() => editUsuario(item.userid)} ><FaEdit />
                           </button>   
                   <label>&nbsp;&nbsp;</label>
                       <button  className="btn btn-outline-danger btn-sm " 
                           onClick={() => deleteUsuario(item.userid)} ><FaTrash />
                           </button>  
                     </div>  
                      
                  </div> 
              </div>         
            ))}  
     </div>

</div>



       <Nabvar departamento={props.rzonsocial} dptoid={props.dptoid}/>    
      <div className="row p-3">

       <div className="col-md-5 p-2 ">
         <form className="card p-2 mt-2 border-secondary" encType="multipart/form-data">
           <h5>Cargar Firma</h5>
            
           <br></br> 
           <select id='idselect'>
           { value.map(item => ( 
            <option value={item.userid}> {item.name}</option>    
            ))}  
            </select> 

      
           <br></br> 
           <textarea id="desc" cols="4" placeholder="Descripcion" className="form-control" 
           onChange={(e) => setDescripcion(e.target.value)} >
           </textarea>
           <br></br> 
           <div className="form-group">
             <label htmlFor="img">Imagen</label><br></br> 
              <input type="file"  id="agg" className="form-control-file" accept="image/*"
                  onChange={(e) => setImagen(e.target.files[0])} /></div> 
            <br></br> 
              <button  className="btn btn-outline-success btn-sm" 
                onClick={(e) => addImagen(e)} >Agregar <FaCheckCircle /></button> 
         </form>
       </div>

       <div className="col-md-7 p-2" style={{maxHeight:'39vmax', overflowY: 'scroll'}} >
       { lista.map(item => (
            <div className="card p-2 mt-2 border-secondary" key={item.id} >
              <div className="card-body" >
              <img src={"data:image/png;base64,"+item.imagen} className="img-fluid" 
                alt="imagen"/>
            <h5 className="text-primary"> {item.descripcion}</h5>  

                    <div className="d-flex flex-row-reverse" >
                       <button  disabled className="btn btn-outline-danger btn-sm " 
                           onClick={() => deleteImagen(item.id)} ><FaTrash />
                           </button> 
                      
                     </div>  
                      
                  </div> 
              </div>         
            ))}  
     </div>

     </div>




<Nabvar departamento={props.rzonsocial} dptoid={props.dptoid}/>    
      <div className="row p-3">

       <div className="col-md-5 p-2 ">
         <form className="card p-2 mt-2 border-secondary" encType="multipart/form-data">
           <h5>Nuevo Proveedor</h5>
            
           <br></br> 
           <input id='nombreproveedor' placeholder="Proveedor">
           
            </input> 

      
           <br></br> 
           <textarea id="descproveedor" cols="4" placeholder="Descripcion" className="form-control" 
           onChange={(e) => setDescripcionProveedor(e.target.value)} >
           </textarea>
           <br></br> 
             
              <button  className="btn btn-outline-success btn-sm" 
                onClick={(e) => addProveedor(e)} >Agregar <FaCheckCircle /></button> 
         </form>
       </div>

       <div className="col-md-7 p-2" style={{maxHeight:'39vmax', overflowY: 'scroll'}} >
       { listaP.map(item => (
            <div className="card p-2 mt-2 border-secondary" key={item.proveedor} >
              <div className="card-body" >
               
              <b><label >Proveedor: </label></b> <label className="text-primary">{item.proveedor}</label>  <br></br>
              <b><label >Descripción: </label></b> <label className="text-primary">{item.descripcion}</label>  <br></br>
            
                    <div className="d-flex flex-row-reverse" >
                       <button  disabled className="btn btn-outline-danger btn-sm " 
                            ><FaTrash />
                           </button> 
                      
                     </div>  
                      
                  </div> 
              </div>         
            ))}  
     </div>

     </div>



      </div>
       
              
    
  );   
}



 



export default App;
