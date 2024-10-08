 
import React,{useState, useEffect} from 'react'; 
import  {FaCheckCircle, FaTrash, FaEdit} from 'react-icons/fa'
import axios from '../node_modules/axios';
import {Nabvar} from './component/Navbar'; 
import Modal from 'react-modal';
import './App.css'; 
import LineChart from './Charts/LineChart';
import PiesChart from './Charts/PiesChart';
import BarsChart from './Charts/BarsChart';  
import GanttChart from './Charts/GanttChart';  
import GanttC from './Charts/Gantt'; 
import Draggable, {DraggableCore} from "react-draggable";
function App(props) {
 
   

	const [lista, setLista] =  useState([]);  
    const [setallProyectos, setAllProyectos] = useState([]);
    const[setactividadesProyecto,setActividadesProyecto] = useState([]);
    const [midata, setMiData] =  useState([]);  
    const [mipdata, setMiPData] =  useState([]);  
    const [mibdata, setMiBData] =  useState([]); 
    const [creadas, setCreadas] =  useState([]);
    const [proceso, setProceso] =  useState([]);
    const [finalizadas, setFinalizadas] =  useState([]);  
    const [detalleAct, setDetalleact] =  useState([]);
    const [ganttData, setGanttData] =  useState([]);
	const [listadocumentos, setListaDocumentos] =  useState([]);

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

    async function getActividades(){    
		//tipo usuario si 1 solo las del dpto si 2 todas las requisiciones 
		setLista([]);
		  
		//document.getElementById("ocultas").checked = false;
		var id = "getActividadesDepartamento"; 
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&date=&userid='+props.userid+'&termino=&iddepartamento='+props.iddepartamento);
		  
	}
    
    async function getActividadesProyecto(proyecto, consulta, iddepartamento){     
         
        setCreadas([]);
        setProceso([]);
        setFinalizadas([]);
        setActividadesProyecto([]);  
        var id = consulta;  
        const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&date=&userid='+props.userid+'&termino=&proyecto='+proyecto+'&iddepartamento='+iddepartamento);  
        setActividadesProyecto(res.data);           
        setFinalizadas(res.data.filter((x) => (x.activo == 1 && x.estado == 3 && x.activo == "1" && x.finalizado == "1")));               
        setCreadas(res.data.filter((x) => (x.activo == "1" && x.estado == "1" && x.activo == "1" && x.finalizado == "0")));        
        setProceso(res.data.filter((x) => (x.activo == "1" && x.estado == "2" && x.activo == "1" && x.finalizado == "0")));        

      
        let actividades = [creadas.length,proceso.length,finalizadas.length];                         
        var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        var titulos = ["Creadas","Proceso","Finalizadas"];
        var beneficios = makeDateArray(res.data);

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
                } 
            ],
        };

        let bdata={
            labels:meses,
            datasets:[
                {
                    label:'Actividades',                    
                    data: beneficios,
                    backgroundColor:'rgba(0,220,195,0.5)'
                }
            ]
        }

        let pdata ={
            labels:titulos,
            datasets:[
                {
                   
                    labels:'Resumen Actividades',
                    data:actividades,
                    backgroundColor:[
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor:[
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth:1,
                },
            ],
        };
        
        setMiData(mdata);   
        setMiPData(pdata);  
        setMiBData(bdata);   

        let gantt = [
            {
              key: "task-1",
              title: "Some task without data",
              children: [
                {
                  key: "task-1-1",
                  title: "Some non repeating task",
                  data: {
                    startDate: "2023-09-11T08:00:00.000Z",
                    endDate: "2023-09-20T08:00:00.000Z",
                  },
                  children: [
                    {
                      key: "task-1-1-1",
                      title: "Some weekly repeating task",
                      data: {
                        repeatType: "WEEK",
                        fromTime: 28800,
                        endDate: 64800,
                        weekdays: [1, 3, 6],
                      },
                    },
                  ],
                },
                {
                  key: "task-1-2",
                  title: "Some daily repeating task",
                  data: {
                    repeatType: "DAY",
                    fromTime: 28800,
                    endDate: 64800,
                  },
                },
              ],
            },
            {
              key: "task-2",
              title: "Some monthly repeating task",
              data: {
                repeatType: "MONTH",
                fromTime: 28800,
                endDate: 64800,
                monthdays: [1, 3, 5, 9, 11, 14, 21, 31],
              },
            },
        ];    
          
          setGanttData(gantt);
    }

    
    const findMonth = (datestring) => { 
        let date = new Date(datestring); 
        return date.getMonth(); 
    }; 
    
    const makeDateArray = (orders) => { 
        let monthFreq = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  
        for (const order of orders) { 
            let year = new Date(order.fechatermino).getFullYear(); 
            let currentYeat = new Date().getFullYear();  
            if(currentYeat == year){ 
                const month = parseInt(findMonth(order.fechatermino)); 
                monthFreq[month] = monthFreq[month] + 1; 
            } 
        } 
        return monthFreq; 
    };


    async function modalActividad(folio,actividad){
        var id = "obtenerDetalle";
        setDetalleact([]);
        const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folio='+folio); 
        //console.log(rese.data);
        setDetalleact(rese.data);  
        setIsOpen(true);
        getDocumentos(folio);   
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

    async function getDocumentos(folio){
		var id = "getDocumentos";
		setListaDocumentos([]);
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folio='+folio); 
		//console.log(rese.data);
		setListaDocumentos(rese.data);    
	}

    const handleClick = (task) => {
        modalActividad(task.id);
      };
	

      function mostrarDesc(){
        
	}


    
	function diff (start, end) {
		var date1 = new Date(start);
		var date2 = new Date(end);
		// One day in milliseconds
		var oneDay = 1000 * 60 * 60 * 24;

		// Calculating the time difference between two dates
		var diffInTime = date2.getTime() - date1.getTime();
	
		// Calculating the no. of days between two dates
		var diffInDays = Math.round(diffInTime / oneDay);
	
		return diffInDays;
	 }


	function getColor(date){
		var color = "";  
	    var dateActividad = date.slice(0, 10);
		var dateToday = new Date().toISOString().slice(0, 10); 
		var diffs = diff(dateActividad, dateToday);
		//var diffs = 0;
		//notify(diffs);
		if (diffs >= 0) {
			//rojo    
			 color = "rgba(255, 62, 62, 1)";
			 
		 }else if(diffs >= -3) {  
			 //naranja 
	     	 color = "rgba(255, 122, 5, 0.71)";
				
		 } else if(diffs >= -7){
			 // verde
			 color = "rgba(18, 255, 5, 0.71)";
		 }else{
			 color = "";
		 }
 			   
		 return color;
	}
	 

  	return (
		<div className="container ">
			{/*<h1 className='bg-info text-center font-monospace fw-bold lh-base'>Graficas</h1>*/}
            <Nabvar titulo="Resumen de actividades" departamento={props.rzonsocial} dptoid={props.dptoid}/>    
            {setallProyectos.map(item => ( 
					<button id="filtrarproyeco" style={{width:'24%', marginTop:'0.5%', marginLeft:'1%'}}  class="btn btn-outline-success btn-sm" onClick={() => getActividadesProyecto(item.folio, "getActividadesProyecto", "")}  >
					{item.proyecto}
					</button>

			))}
             { props.rooms.map(item => ( 
							<button id="filtrarproyeco" style={{width:'24%', marginTop:'0.5%', marginLeft:'1%'}}  class="btn btn-outline-success btn-sm" onClick={() => getActividadesProyecto(item.folio, "getActividadesDepartamento", item.folio)}  >
                            {item.nombre}
                            </button>
                ))}	

              

             <div style={{display:"flex", justifyContent: 'space-between'}}>

                <div style={{width:'33%'}}>
                    <p className='m-2'><b>Ejemplo #1: </b> Grafica de lineas basico</p>                    
                    <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"100%",height:"230px"}}>
                    {(String(midata) != "")?
                    <LineChart actividades={midata} />                 
                        :
                        <></>
                    }
                    </div>
                </div>
                <div style={{width:'33%'}}>

                    <p className='m-2'><b>Ejemplo #2: </b> Grafica de barras</p>
                    <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"100%",height:"230px"}}>
                    {(String(mibdata) != "")?
                        <BarsChart actividades={mibdata}/>
                        :
                        <></>
                    }
                    </div>
                </div>

                <div style={{width:'33%'}}>

                    <p className='m-2'><b>Ejemplo #3: </b> Grafica circular</p>
                    <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"100%",height:"230px"}}>
                    {(String(mipdata) != "")?
                        <PiesChart actividades={mipdata}/>
                        :
                        <></>
                    }
                    </div>
                </div>
                
             </div>
             
             <hr className='mt-3 mb-2'></hr>

    
            
           
                <div style={{display:"flex"}}> 
                    <div className='card card-row card-primary' style={{width:"500px",margin:"0 0.5rem",}}>
                        <div className='card-header' style={{ background:"#007bff",color:"white"}}>
                            <h3 className='card-title'>
                                Creadas
                            </h3>
                        </div>
                                  
                        <div className='card-body' style={{overflowY:"scroll", height:'600px'}}>
                            
                                {creadas.map(item => ( 
                                    /* <Draggable> */
                                    <div className='card card-primary card-outline' style={{cursor:"pointer", marginBottom: "8px"}} onClick={() => modalActividad(item.folio, item.actividad)} >
                                        <div className='card-header' style={{backgroundColor: getColor(item.fechatermino)}} >
                                            <label style={{fontSize: '15px', fontWeight:'bold'}} className='card-title'>{item.actividad}</label>                            
                                        </div>
                                        <div className='card-body'>
                                            <p>
                                                {item.comentarios}
                                                <br></br>
                                                <label style={{fontSize: '12px', fontWeight:'bold'}} >{item.name}</label>
                                                <label style={{fontSize: '12px', fontWeight:'bold'}} >DÍAS VENCIDOS: { diff(item.fechatermino, new Date().toISOString().slice(0, 10))}</label>
                                            </p>
                                        </div>
                                    </div>      
                                /* </Draggable>*/

                                ))}	
                    

                        </div>
                    </div>

                    <div className='card card-row card-primary' style={{width:"500px",margin:"0 0.5rem"}}>
                        <div className='card-header' style={{ background:"#17a2b8",color:"white"}}>
                            <h3 className='card-title'>
                                En Proceso
                            </h3>
                        </div>
                        <div className='card-body' style={{overflowY:"scroll", height:'600px'}}>
                            {proceso.map(item => ( 
                                <div className='card card-primary card-outline' style={{cursor:"pointer", marginBottom: "8px"}} onClick={() => modalActividad(item.folio, item.actividad)}>
                                    <div className='card-header' style={{backgroundColor: getColor(item.fechatermino)}}>
                                        <label style={{fontSize: '15px', fontWeight:'bold'}} className='card-title'>{item.actividad}</label>                            
                          
                                    </div>
                                    <div className='card-body'>
                                        <p>
                                            {item.comentarios}
                                            <br></br>
                                            <label style={{fontSize: '12px', fontWeight:'bold'}} >{item.name}</label>
                                            <label style={{fontSize: '12px', fontWeight:'bold'}} >DÍAS VENCIDOS: { diff(item.fechatermino, new Date().toISOString().slice(0, 10))}</label>
                                        </p>
                                    </div>
                                </div>
                            
                            ))}	
                        </div>
                    </div>

                    <div className='card card-row card-primary' style={{width:"500px",margin:"0 0.5rem"}}>
                        <div className='card-header'  style={{ background:"#28a745",color:"white"}}>
                            <h3 className='card-title'>
                                Terminadas
                            </h3>
                        </div>
                        <div className='card-body' style={{overflowY:"scroll", height:'600px'}}>
                            {finalizadas.map(item => ( 
                                <div className='card card-primary card-outline' style={{cursor:"pointer", marginBottom: "8px"}} onClick={() => modalActividad(item.folio, item.actividad)}>
                                    <div className='card-header' >
                                        <label style={{fontSize: '15px', fontWeight:'bold'}} className='card-title'>{item.actividad}</label>                            
                          
                                    </div>
                                    <div className='card-body'>
                                        <p>
                                            {item.comentarios}
                                            <br></br>
                                            <label style={{fontSize: '12px', fontWeight:'bold'}} >{item.name}</label>
                                            <label style={{fontSize: '12px', fontWeight:'bold'}} >DÍAS VENCIDOS: { diff(item.fechainicio, item.fechafinalizado)}</label>
                                        </p>
                                    </div>
                                </div>
                            
                            ))}	
                        </div>
                    </div>
                </div>
           

            <div style={{marginTop:"20px"}}>
               

                {/* <GanttChart actividades={setactividadesProyecto}/>*/}
                {(String(setactividadesProyecto) != "")? 
                     <GanttC actividades={setactividadesProyecto}   
                     handleClick={handleClick}  
                     />


                :
                <></>
                }
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>


            <Modal
			isOpen={isOpen}   
			onRequestClose={() => setIsOpen(false)}
			contentLabel="Example Modal"
            style={customStyles}
		    >
                <div style={{width:'100%'}}>
			    <h1>Detalles de la actividad</h1> 
                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', borderRadius:'5px', width:'800px', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%',}} > 
                    { detalleAct.map(item => ( 							 
                    <div style={{  fontSize:'13.5px'}}>                              
                        <label style={{fontSize:'16px', fontWeight:'bold'}}>Creado por:</label><br></br>
                        <label>{item.creadapor}</label> 
                        <br></br> 
                        <label style={{fontSize:'16px', fontWeight:'bold'}}>Proyecto:</label><br></br>
                        <label>{item.proyecto}</label>
                        <br></br> 
                        <label style={{fontSize:'16px', fontWeight:'bold'}}>Responsable:</label><br></br>
                        <label>{item.name}</label> 
                        <br></br> 
                        <label style={{fontSize:'16px', fontWeight:'bold'}}>Actividad:</label><br></br>
                        <label>{item.actividad}</label> 
                        <br></br> 
                        <label style={{fontSize:'16px', fontWeight:'bold'}}>Descripción:</label><br></br>
                        <label>{item.comentarios}</label>
                        <br></br>
                        <label style={{fontSize:'16px', fontWeight:'bold'}}>Fecha de término estimada:</label> <br></br>
                        <label>{formatDate(item.fechatermino)}</label>
                        <br></br>
                        <br></br>
                        <label style={{fontSize: '12px', fontWeight:'bold'}} >DÍAS VENCIDOS: { diff(item.fechatermino, new Date().toISOString().slice(0, 10))}</label>
                        <br></br>
                        <br></br>
                        <span class="dot" style={{backgroundColor: getColor(item.fechatermino)}}></span>
                    </div> 
                            ))}
                    </div>
                    <div style={{width:'70%', height:'400px', overflowY:'scroll'}}> 
                    <tr >  
							<th>Descripción</th> 
							<th>Documento</th> 
							  
						</tr>
                    { listadocumentos.map(item => ( 
							 
							 <tr id="tabletr" style={{  fontSize:'13.5px', border: '2px solid #ABB2B9'}}>
								 <td  align='center' className='id-orden'>{item.descripcion}</td>
								 <td  align='center' className='id-orden'><a target="_blank" rel="noreferrer" href={"https://actividades.grupopetromar.com/apirest/actividades/" + item.documento}><img src={"https://actividades.grupopetromar.com/apirest/actividades/" + item.documento} style={{width:'180px'}}  onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png";
  }}></img></a></td>
							 </tr> 
							 ))}
                    <br></br>
                    </div>
                </div>
                
                <br></br>                
                <button onClick={closeModalDetalleAct} class="btn btn-outline-danger btn-sm " style={{ width:'100%'}}>Cerrar</button> 
                </div>
		    </Modal>

        </div>
       
              
    
  );   
}



 



export default App;
