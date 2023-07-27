//SPDX-License-Identifier: GPL3.0
pragma solidity ^0.8.0;

contract Bern{
    struct Task{
        uint id;
        string name;
        string date;
    }

    address owner;
    Task task;
    mapping (uint => Task) tasks;
    uint taskId = 1;


    modifier checkId(uint id){
        require(id!=0 && id < taskId, "invalid id");
        _;
    }

    constructor (){
        owner = msg.sender;
    }

    function createTask(string calldata _taskName, string calldata _date)public {
        tasks[taskId] = Task(taskId, _taskName, _date);
        taskId++;
    }

    function updateTask(uint _taskId, string calldata _taskName, string calldata _date) public {
        tasks[_taskId] = Task(_taskId, _taskName, _date);
    }

    function allTask() public view returns(Task[] memory){
        Task[] memory taskList = new Task[](taskId-1);
        for(uint i=0; i< taskList.length; i++){
            taskList[i] = tasks[i+1];
        }
        return taskList;
    }

    function viewTask(uint _taskId) public view checkId(_taskId) returns (Task memory){
        return tasks[_taskId];
    }

    function deleteTask(uint _taskId) public checkId(_taskId){
        delete tasks[_taskId];
    }
}

