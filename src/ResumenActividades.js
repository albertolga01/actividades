 
import React,{useState, useEffect} from 'react'; 
import  {FaCheckCircle, FaTrash, FaEdit} from 'react-icons/fa'
import axios from '../node_modules/axios';
import {Nabvar} from './component/Navbar'; 
import Modal from 'react-modal';
import './App.css'; 
import LineChart from './Charts/LineChart';
import PiesChart from './Charts/PiesChart';
import BarsChart from './Charts/BarsChart';

function App(props) {
	const [lista, setLista] =  useState([]);  
    const [setallProyectos, setAllProyectos] = useState([]);
    const[setactividadesProyecto,setActividadesProyecto] = useState([]);
    const [midata, setMiData] =  useState([]);  
    const [creadas, setCreadas] =  useState([]);
    const [proceso, setProceso] =  useState([]);
    const [finalizadas, setFinalizadas] =  useState([]);  
    const [detalleAct, setDetalleact] =  useState([]);


    const [isOpen, setIsOpen] =  useState(false);  
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
     

    useEffect(()=> { 
        getActividades();
        getAllProyectos();
	}, [])




  


	async function getActividades(){    
        
		setLista([]);  
		
		var id = "getActividades";
		var date = ""; 
		var termino = ""; 
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&date='+date+'&userid=84&termino='+termino);
	 
	    console.log(res.data);
		setLista(res.data); 
	 
	}

    async function getAllProyectos() {
        var id = "getTodosProyectosUsuario";
        const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&userid='+props.userid+'&admin='+props.admin);                  
       if(rese.data != ""){
          setAllProyectos(rese.data);                               
       }
        
    } 

    
    async function getActividadesProyecto(proyecto){     
         
        setCreadas([]);
        setProceso([]);
        setFinalizadas([]);
        setActividadesProyecto([]);  
        var id = "getActividadesProyecto";  
        const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&date=&userid='+props.userid+'&termino=&proyecto='+proyecto);  
        setActividadesProyecto(res.data);           
        setFinalizadas(res.data.filter((x) => (x.activo == 1 && x.estado == 3)));               
        setCreadas(res.data.filter((x) => (x.activo == "1" && x.estado == "1")));        
        setProceso(res.data.filter((x) => (x.activo == "1" && x.estado == "2")));        

      
        let actividades = [creadas.length,proceso.length,finalizadas.length];                         

        var titulos = ["Creadas","Proceso","Finalizadas"];
        let mdata = {
            labels: titulos,
            datasets: [ // Cada una de las líneas del gráfico
                {
                    label: 'Actividades',
                    data: actividades,
                    tension: 0.5,
                    fill : true,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    pointRadius: 5,
                    pointBorderColor: 'rgba(255, 99, 132)',
                    pointBackgroundColor: 'rgba(255, 99, 132)',
                },
                {
                    label: 'Otra línea',
                    data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25]
                },
            ],
        };
        
        setMiData(mdata);        
    }


    async function modalActividad(folio,actividad){
        var id = "obtenerDetalle";
        setDetalleact([]);
        const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folio='+folio); 
        //console.log(rese.data);
        setDetalleact(rese.data);  
        setIsOpen(true);    
    }

    function formatDate(date){
        var index = date.search(" ");
        date = date.substring(0, index);
        date = date.split("-");
        var formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
        return(formatedDate);
    }

    function closeModalDetalleAct() {
		setIsOpen(false);
	}

    

	

	 

  	return (
		<div className="container ">
			<h1 className='bg-info text-center font-monospace fw-bold lh-base'>Graficas</h1>

            {setallProyectos.map(item => ( 
					<button id="filtrarproyeco" style={{width:'24%', marginTop:'0.5%', marginLeft:'1%'}}  class="btn btn-outline-success btn-sm" onClick={() => getActividadesProyecto(item.folio, item.proyecto)}  >
					{item.proyecto}
					</button>

			))}	


             <div style={{display:"flex"}}>

                <div>
                    <p className='m-2'><b>Ejemplo #1: </b> Grafica de lineas basico</p>                    
                    <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px",height:"230px"}}>
                    {(String(midata) != "")?
                    <LineChart actividades={midata} />                 
                        :
                        <></>
                    }
                    </div>
                </div>
                <div style={{margin:"0 0.5rem"}}>
                    <p className='m-2'><b>Ejemplo #2: </b> Grafica de barras</p>
                    <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px",height:"230px"}}>
                        <BarsChart/>
                    </div>
                </div>

                <div style={{margin:"0 0.5rem"}}>
                    <p className='m-2'><b>Ejemplo #3: </b> Grafica circular</p>
                    <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px",height:"230px"}}>
                        <PiesChart/>
                    </div>
                </div>
                
             </div>
             
             <hr className='mt-3 mb-2'></hr>

    
            
            <section className='content pb-3'>
                <div className='container-fluid h-100'>
                    <div className='card card-row card-primary' style={{width:"340px",display:"inline-block",margin:"0 0.5rem",}}>
                        <div className='card-header' style={{ background:"#007bff",color:"white"}}>
                            <h3 className='card-title'>
                                Creadas
                            </h3>
                        </div>
                        <div className='card-body' style={{overflowY:"scroll", height:'300px'}}>
                            {creadas.map(item => ( 
                                <div className='card card-primary card-outline' style={{cursor:"pointer"}} onClick={() => modalActividad(item.folio, item.actividad)}>
                                    <div className='card-header'>
                                        <h5 className='card-title'>{item.actividad}</h5>                            
                                    </div>
                                    <div className='card-body'>
                                        <p>
                                            {item.comentarios}
                                        </p>
                                    </div>
                                </div>                            
                            ))}	
                  

                        </div>
                    </div>

                    <div className='card card-row card-primary' style={{width:"340px",display:"inline-block",margin:"0 0.5rem"}}>
                        <div className='card-header' style={{ background:"#17a2b8",color:"white"}}>
                            <h3 className='card-title'>
                                En Proceso
                            </h3>
                        </div>
                        <div className='card-body' style={{overflowY:"scroll", height:'300px'}}>
                            {proceso.map(item => ( 
                                <div className='card card-primary card-outline'>
                                    <div className='card-header'>
                                        <h5 className='card-title'>{item.actividad}</h5>                            
                                    </div>
                                    <div className='card-body'>
                                        <p>
                                            {item.comentarios}
                                        </p>
                                    </div>
                                </div>
                            
                            ))}	
                        </div>
                    </div>

                    <div className='card card-row card-primary' style={{width:"340px",display:"inline-block",margin:"0 0.5rem"}}>
                        <div className='card-header'  style={{ background:"#28a745",color:"white"}}>
                            <h3 className='card-title'>
                                Terminadas
                            </h3>
                        </div>
                        <div className='card-body' style={{overflowY:"scroll", height:'300px'}}>
                            {finalizadas.map(item => ( 
                                <div className='card card-primary card-outline' >
                                    <div className='card-header'>
                                        <h5 className='card-title'>{item.actividad}</h5>                            
                                    </div>
                                    <div className='card-body'>
                                        <p>
                                            {item.comentarios}
                                        </p>
                                    </div>
                                </div>
                            
                            ))}	
                        </div>
                    </div>
                </div>
            </section>



            <Modal
			isOpen={isOpen}   
			onRequestClose={() => setIsOpen(false)}
			contentLabel="Example Modal"
            style={customStyles}
		    >
			    <h1>Actualizar proyecto</h1> 
                { detalleAct.map(item => ( 							 
                    <div style={{  fontSize:'13.5px'}}>                              
                        <label style={{fontSize:'16px', fontWeight:'bold'}}>Creado por:</label><br></br>
                        <label>{item.creadapor}</label> 
                        <br></br>
                        <br></br>
                        <label style={{fontSize:'16px', fontWeight:'bold'}}>Proyecto:</label><br></br>
                        <label>{item.proyecto}</label>
                        <br></br>
                        <br></br>
                        <label style={{fontSize:'16px', fontWeight:'bold'}}>Responsable:</label><br></br>
                        <label>{item.name}</label> 
                        <br></br>
                        <br></br>
                        <label style={{fontSize:'16px', fontWeight:'bold'}}>Actividad:</label><br></br>
                        <label>{item.actividad}</label> 
                        <br></br>
                        <br></br>
                        <label style={{fontSize:'16px', fontWeight:'bold'}}>Descripción:</label><br></br>
                        <label>{item.descripcion}</label>
                        <br></br>
                        <br></br>
                        <label style={{fontSize:'16px', fontWeight:'bold'}}>Fecha de término estimada:</label> <br></br>
                        <label>{formatDate(item.fechatermino)}</label>                                                                                  
                    </div> 
                ))}
                <br></br>                
                <button onClick={closeModalDetalleAct} class="btn btn-outline-danger btn-sm " style={{ width:'100%'}}>Cerrar</button> 
		 
		    </Modal>

        </div>
       
              
    
  );   
}



 



export default App;
