const express = require('express');
const ABI = require('./ABI.json');
const cors = require('cors');
const {Web3} = require("web3");

const app = express();
app.use(express.json());
app.use(cors());
//const web3 = new Web3("https://quaint-special-night.ethereum-sepolia.discover.quiknode.pro/493703a7dc78996dda79667143bb9194c12cac4a/");
//const contractAddress = "0x45F91F7a2dba744e9f2ee2F0D598d3CE2852687C";
const contract = new web3.eth.Contract(ABI, contractAddress);
//console.log(contract);

const dateClash = async(taskDate) => {
    const tasks = await contract.methods.allTask().call();
    const foundTask = tasks.find(task=>task.date === taskDate);
    if(foundTask){
        return foundTask.name;
    }
    return "No task found";
}

const priorityCheck = async(id)=>{
         const tasks = await contract.methods.allTask().call();
         const result = tasks[id-1].name.includes("priority")
         return result;
     }


app.post('/api/ethereum/create-task', async(req, res)=>{
    
    const {taskDate} = req.body;
    const task = await dateClash(taskDate);
    try{
        if(task !== "No task found"){
            res.status(409).json({status:409, message: 'Date clash: Task cannot be added'});
        }else{
            res.status(200).json({status:200, message:"Task can be added"});
        }
    }catch(error){
        console.error(error);
    }
})

app.post('/api/ethereum/update-task', async(req, res)=>{
    
    const {taskDate} = req.body;
    const task = await dateClash(taskDate);
    try{
        if(task !== "No task found"){
            res.status(409).json({status:409, message: 'Date clash: Task cannot be updated'});
        }else{
            res.status(200).json({status:200, message:"Task can be updated"});
        }
    }catch(error){
        console.error(error);
    }
})

app.get('/api/ethereum/view-task/:taskId', async(req, res)=>{
    try{
        const {taskId} = req.params;
        const task = await contract.methods.viewTask(taskId).call();
        const {id, name, date} = task;
        const num = Number(id);
        const taskObj = {
            num, name, date
        }
        //console.log(taskObj);
        res.status(200).json({status:200,taskObj, message:'Task exist'})
    }catch(error){
        res.status(500).json({status:500, message:'task id doesnot exist'});
        console.error(error);
    }
    
})

    app.get('/api/ethereum/view-all-task', async(req, res)=>{
        try{
            const task = await contract.methods.allTask().call();
            if(task.length > 0){
                const taskList = task.map(({id, name, date})=>{
                    const taskId = Number(id);
                    return {taskId, name, date};
                })
                console.log(taskList);
                res.status(200).json({status:200, taskList, message:'Task exist'});
            }else{
                
                res.status(400).json({status:400, message:'Task list doesnot exist'});
            } 
        }catch(error){
            console.error(error);
        }
    })

    app.delete('/api/ethereum/delete-task/:taskId', async(req, res)=>{
        try{
            const {taskId}= req.params;
            const isTrue = await priorityCheck(taskId);
            if(isTrue){
                res.status(403).json({status:403,message:"Task cannot be deleted"})
            }else{
                res.status(200).json({status:200,message:"Task can be deleted"})
            }
        }catch(error){
            console.error(error)
        }
        

    })


const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Listening at Port ${PORT}`);
});