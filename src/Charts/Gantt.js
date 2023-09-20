import { Gantt,  EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import React,{useState, useEffect} from 'react'; 

import "gantt-task-react/dist/index.css";

function GanttC(props) {
  const [isChecked, setIsChecked] = React.useState(true);

  var Task = [];
  let progress;
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
    
        Task.push({
            
              
                start:  new Date(props.actividades[i].fechainicio),
                end:  new Date(fechatermino),
                name: props.actividades[i].actividad,
                id: props.actividades[i].folio,
                type:'task',
                progress: progress,
                isDisabled: true,
                styles: { progressColor: '#00e23f', progressSelectedColor: '#0071ce' }
              
            }   ); 
    }

     
  }
  console.log(Task);
  

    return  <div>
                <div>
                <label>Mostrar descripción </label>
                          <input type="checkbox" defaultChecked={isChecked}  onClick={() => setIsChecked(!isChecked)}/>
                </div>
                 <Gantt tasks={Task} 
                 listCellWidth={isChecked ? "155px" : ""} 
                 onExpanderClick={false}/>
            </div>
}
export default GanttC;