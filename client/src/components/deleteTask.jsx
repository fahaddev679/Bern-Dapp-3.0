import Navigate from './navigation';

const DeleteTask=({state})=>{
    const {contract, account} = state;

    const deleteTask = async(event)=>{
        event.preventDefault();
        const taskID = document.querySelector('#taskID').value;
        try{
            const res = await fetch(`http://localhost:3000/api/ethereum/delete-task/${taskID}`, {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({taskID:taskID})
            })
            const data = await res.json();
            if(data.status===200){
                await contract.methods.deleteTask(taskID).send({from:account});
            }else{
                throw new Error("task cannot be deleted");
            }
            await contract.methods.deleteTask(taskID).send({from:account});
        }catch(error){
            console.error(error);
        }
    }


    return (<>
    <Navigate/>
    <div className="update_task todo_btn">
    <form onSubmit={deleteTask}>
    <label>
        ID:
        <input id="taskID"/>
    </label>
    <button type = 'submit'>Delete Task</button>
    </form>
    </div>
    </>)
    }
    export default DeleteTask;