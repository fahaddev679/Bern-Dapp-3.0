import { useState, useEffect } from "react";
import Navigate from './navigation';

const ViewAllTask=()=>{
    const [taskList, setTaskList] = useState([]);

    useEffect(()=>{
        const allTasks = async()=>{
        try{
            const res = await fetch('http://localhost:3000/api/ethereum/view-all-task',{
                method: 'GET',
                headers:{
                    "content-type": "application/json"
                }
            })
            const data = await res.json();
            if(data.status === 200){
                console.log(data.taskList);
                setTaskList(data.taskList);
            }

        }catch(error){
            console.error(error);
        }
    }
    allTasks();
    },[])

    return<>
      <Navigate/>
      <div className="view_all_tasks">
      {taskList.map((task)=>{
        return(
            <div 
            className="view_all_tasks_card"
            key={task.id}
            style={task.id!=="" && task.name!=="" && task.date!=="" ? {} : {display:"none"}}
            >   
                <p>{task.taskId}</p>
                <p>{task.name}</p>
                <p>{task.date}</p>
            </div>
        )
      })}
      </div>
    </>
}
    export default ViewAllTask;