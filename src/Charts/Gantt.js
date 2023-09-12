import { Gantt,  EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

function GanttC(props) {
  let Task = [];
  let progress;
  let termino;

  for (let i = 0; i < props.actividades.length; i++) {
     if(props.actividades[i].estado == 1){
      progress = 0;
     }else if (props.actividades[i].estado == 1){
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
            end:  new Date(props.actividades[i].fechatermino),
            name: props.actividades[i].actividad,
            id: props.actividades[i].folio,
            type:'task',
            progress: progress,
            isDisabled: true,
            styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
          
   }   );
  }
  console.log(Task);
    return  <Gantt tasks={Task} />
}
export default GanttC;