const express=require('express');
const router=express.Router();
const TaskController=require("./../Controller/TaskController")
router.route("/").post(TaskController.createTask).get(TaskController.getTasks);
router.route("/assignTask").post(TaskController.assignTask);
router.route("/getTasks").get(TaskController.getEmployeeTasks);
router.route("/:id").get(TaskController.getTask).post(TaskController.updateTask).delete(TaskController.deleteTask);

module.exports=router;