const express = require('express');
const router = express.Router()
const {Task} = require('../models/todoTaskModel.js');
const { sequelize } = require("../database/db.js");


//Endpoint to getAll tasks
router.get('/todoTasks', async(request,response)=>{

    try {

      await sequelize.sync(); // Synchronize models with the database

      // Fetch tasks using Task.findAll()
      const tasks = await Task.findAll({ raw: true });
      console.log('List of Tasks', tasks);
      response.send(tasks);


    } catch (error) {
        console.log('Failed to synchronize with the database', error);
        // Handle errors and send appropriate response
        response.status(500).send('Failed to fetch tasks');
    }
  
});


//Endpoint to get task by taskID
router.get('/todoTaskID/:taskID', async(request,response)=>{
  try{
      sequelize.sync()
      .then(async () => {
          let task;
          // Select a row using `findOne()` method and where clause
          task = await Task.findOne({ where: { taskID: request.params.taskID } });
          if(!task){
            response.status(404).json({ message: 'Task not found.' });
            console.log('Task not found.');
          }
          else{
            console.log('Fetched Task by ID'+request.params.id+' ', task);
            response.send(task);
          }
      })
    } catch(error) {
      console.log('Failed to synchronize with the database', error);
      response.status(500).json({ message: 'Failed to fetch Task.' });
    }
  
});


//Endpoint to post task 
router.post('/addTodoTask', async (request,response)=>{
  const {taskName, taskID , isTaskCompleted} = request.body;

  const newTask = Task.build({
      'taskName': taskName,
      'taskID': taskID,
      'isTaskCompleted': isTaskCompleted
  })

  try{
      await sequelize.sync(); // Synchronize models with the database
      await newTask.save()
      response.status(201).json(newTask);
      console.log('New task Added', newTask);
  }
  catch(error){
      response.json(error)
  }
});


//Endpoint to update task
router.put('/updateTodoTask/:taskID', async (request, response) => {
  try {
      const taskID = request.params.taskID;
      const { taskName, isTaskCompleted } = request.body;

      sequelize.sync()
          .then(async () => {
              let task = await Task.findOne({ where: { taskID: taskID } });

              if (!task) {
                  response.status(404).json({ message: 'Task not found.' });
                  console.log('Task not found.');
              } else {
                  // Update the task attributes
                  task.taskName = taskName;
                  task.isTaskCompleted = isTaskCompleted;

                  await task.save(); // Save the changes to the database

                  console.log('Updated Task by ID ' + taskID + ': ', task);
                  response.send(task);
              }
          })
  } catch (error) {
      console.log('Failed to update task.', error);
      response.status(500).json({ message: 'Failed to update task.' });
  }
});




//Endpoint to Delete task
router.delete('/deleteTodoTask/:taskID', async (request, response) => {
  try {
      const taskID = request.params.taskID;

      sequelize.sync()
          .then(async () => {
              let task = await Task.findOne({ where: { taskID: taskID } });

              if (!task) {
                  response.status(404).json({ message: 'Task not found.' });
                  console.log('Task not found.');
              } else {
                  await task.destroy(); // Delete the task from the database

                  console.log('Deleted Task by ID ' + taskID);
                  response.status(204).send(); // Send a success response with no content
              }
          })
  } catch (error) {
      console.log('Failed to delete task.', error);
      response.status(500).json({ message: 'Failed to delete task.' });
  }
});



module.exports = router;




// router.put('/todo/:id', async(request,response)=>{
//     const task = await Task.findOne({
//         where: {
//             id:request.params.id
//         }
//     });

//     const {is_complete,content,description} = request.body;

//     await task.set(
//         {
//             is_complete:is_complete,
//             content:content,
//             description:description
//         }
//     )

//     await task.save();  

//     response.status(200).json(task);
// });

// router.delete('/todo/:id', async(request,response)=>{
//     const task = await Task.findOne({
//         where: {
//             id:request.params.id
//         }
//     });

//     await task.destroy();

//     response.status(204).json({});
// });

// module.exports = router;










