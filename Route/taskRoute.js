const { addTask, deleteTask, updateTask, getAllTask, updateTaskStatus } = require('../Conroller/taskController');

const taskRoute = require('express').Router();

taskRoute.get("/test" , (request , response) => {
    response.status(200).json({message : "test route is work"});
}); 

// get all tasks
taskRoute.get("/get/task" , getAllTask);

// update delete add tasks
taskRoute.post("/add/task" , addTask); 
taskRoute.post("/update/task" , updateTask);
taskRoute.post("/delete/task" , deleteTask); 

// update task status
taskRoute.post("/status/update" , updateTaskStatus); 


module.exports = taskRoute;