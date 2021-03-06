import React, { Component } from 'react';
import { db } from '../../firebase';
import '../../css/UserTasks.css';


class CompletedTasks extends Component{

  removeTask = (taskKey) =>{
    db.removeTask(taskKey,this.props.projectId);
  }

  uncheckTask = (taskKey) =>{
    db.uncheckTask(taskKey,this.props.projectId);
  }

  getPriorityClass = (priority) => {
    var priorityClass;
    if(priority==="low"){
      priorityClass="Priority-low";
    }else if(priority==="medium"){
      priorityClass="Priority-medium";
    }else if(priority==="high"){
      priorityClass="Priority-high";
    }
    return priorityClass;
  }

  createTaskCards(tasks) {
    const taskComponent = tasks.length !== 0 ?
    tasks.map((task,indexTask) =>{
     return(
         <div  className="Task-card" key={indexTask}>

           <div className= "Task-card-checked-header">
           <h3>{task.title} </h3>
           <span className={"Priority "+this.getPriorityClass(task.priority)}> {task.priority} </span>
           </div>

           <div className="Task-card-body">
             <div className="Task-responsible">
               <h4>Responsible</h4>
                  <p>{task.responsibleName}</p>
             </div>
             <div className="Task-description">
               <h4> Description</h4>
               <p>{task.description}</p>
             </div>
             <div className="Task-footer">
                <h4>Actions</h4>
                <button  className="Button-update" onClick = { () => this.removeTask(task.key) }>Remove</button>
                <button  className="Button-update" onClick = { () => this.uncheckTask(task.key) }>Uncheck</button>
            </div>
          </div>

        </div>
       )
     })
     :
     <p className="No-tasks-warning">You have not completed any task</p>
     return taskComponent;
   }

   render(){
     const {tasks} = this.props;
     return(
       <React.Fragment>
        <section className="taskContainer">
        <h3 className="Section-title">Completed Tasks</h3>
          {this.createTaskCards(tasks)}
        </section>
       </React.Fragment>
     )
   }
}

export default CompletedTasks;
