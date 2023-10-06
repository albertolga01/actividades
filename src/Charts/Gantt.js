import { Gantt,  EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import React,{useState, useEffect} from 'react'; 

import "gantt-task-react/dist/index.css";

function GanttC(props) {
  const [isChecked, setIsChecked] = React.useState(true);
  const [tasks1, setTasks1] = React.useState(true);

  var Task = [];
  let progress;
  let progressSub;
  let termino;
  let timestamp;
  let timestamp1;
  for (let i = 0; i < props.actividades.length; i++) {
    timestamp = Date.parse(props.actividades[i].fechainicio);
    timestamp1 = Date.parse(props.actividades[i].fechatermino);
    let fechatermino = props.actividades[i].fechatermino;
    let fechafinalizado = props.actividades[i].fechafinalizado; 

    if(isNaN(Date.parse(props.actividades[i].fechafinalizado)) == false){
        fechatermino = fechafinalizado;
        
    }

    
    if ((isNaN(timestamp) == false) && (isNaN(timestamp1) == false)) {
        if(props.actividades[i].estado == 1){
          progress = 0;
        }else if (props.actividades[i].estado == 2){
          progress = 50;
        }else{
          progress = 100;

        }
     /*
    if(props.actividades[i].fechatermino == null){
      termino  = new Date(props.actividades[i].fechainicio);
    }else{
      termino = new Date(props.actividades[i].fechatermino);
    }
    */
    
    let tipo = "task";
    if(props.actividades[i].subactividades != null){
      tipo = "project";
    } 

        Task.push({
            
              
                start:  new Date(props.actividades[i].fechainicio),
                end:  new Date(fechatermino),
                name: props.actividades[i].actividad,
                id: props.actividades[i].folio,
                type:tipo,
                progress: progress, 
                hideChildren: true, 
                styles: { progressColor: '#00e23f', progressSelectedColor: '#0071ce' }
              
            }   ); 



            if(props.actividades[i].subactividades != null){
              for (let x = 0; x < props.actividades[i].subactividades.length; x++) {
               // console.log(props.actividades[i].subactividades[x][0].fechainiciosub);

               let fechaterminoSub;
               console.log(isNaN(Date.parse(props.actividades[i].subactividades[x][0].fechafinalizado)));
                if(isNaN(Date.parse(props.actividades[i].subactividades[x][0].fechafinalizado)) == false){
                  
                   fechaterminoSub = props.actividades[i].subactividades[x][0].fechafinalizado;
                }else{
                   fechaterminoSub = props.actividades[i].subactividades[x][0].fechainiciosub;
                }
                if(props.actividades[i].subactividades[x][0].finalizado == 1){
                  progressSub = 100;
                }else{
                  progressSub = 0;
                } 
                
                     Task.push({
                  
                    
                        start:  new Date(props.actividades[i].subactividades[x][0].fechainiciosub),
                        end:  new Date(fechaterminoSub),
                        name: props.actividades[i].subactividades[x][0].subactividad,
                        id: props.actividades[i].subactividades[x][0].folio,
                        type:'task',
                        project: props.actividades[i].folio, 
                        progress: progressSub,  
                        dependencies: [props.actividades[i].folio],
                        styles: { progressColor: '#00e23f', progressSelectedColor: '#0071ce' }
                      
                    }); 
              }
             
             /* */
            }
    }

    
  }
 
  const handleExpanderClick = (task) => { 
    task.hideChildren = false;
    console.log(task.hideChildren);
    
     Task = task; 
   // console.log(Task1);
  //    console.log("On expander click Id:" + task.id); 
  };
  
  

    return  <div>
                <div>
                <label>Mostrar descripción </label>
                          <input type="checkbox" defaultChecked={isChecked}  onClick={() => setIsChecked(!isChecked)}/>
                </div>
                 <Gantt tasks={Task} 
                 listCellWidth={isChecked ? "155px" : ""} 
                  
                />
            </div>
}
export default GanttC;