const Task = require("./../Model/Task");
const User=require("./../Model/User")
const jwt = require("jsonwebtoken");
const { roleChecker } = require("./../utils/validate")

exports.getTasks = async (req, res, next) => {
    try {
        const Tasks = await Task.find();
        res.status(200).json({
            status: "Success",
            data: Tasks
        })
        next();
    }
    catch (err) {
        console.log(err);
    }
}

exports.getTask = async (req, res, next) => {
    try {
        const id=req.params.id;
        const Tasks = await Task.findOne({_id:id});
        res.status(200).json({
            status: "Success",
            data: Tasks
        })
        next();
    }
    catch (err) {
        console.log(err);
    }
}
exports.createTask = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_secret);
        const validated = await roleChecker("Manager", decoded);
        if (!validated) {
            return res.status(401).json({
                status: "Unauthorized"
            })
        }
        const task = await Task.create(req.body)
        res.status(201).json({
            status: "Success",
            data: task
        })
        next();
    }

    catch (err) {
        console.log(err);
        res.status(501).json({
            status: "Failed"
        })
    }

}

exports.assignTask = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_secret);
        const validated = await roleChecker("Manager", decoded);
        if (!validated) {
            return res.status(401).json({
                status: "Unauthorized"
            })
        }

        const TaskId=req.body.id;
        const teamName=req.body.teamName;

        const team=await User.updateMany({Team:teamName},{
            $push:{TaskId}
        })

        const assignTask=await Task.findByIdAndUpdate(TaskId,{Assigned_to:teamName});
        res.status(200).json({
            status: "Success",
            message: "Task assigned to all team members"
        });
        next();
    }

    catch (err) {
        console.log(err);
        res.status(501).json({
            status: "Failed"
        })

    }

}

exports.getEmployeeTasks=async(req,res,next)=>{
    try{
    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,process.env.JWT_secret);
    const user=await User.findOne({Email:decoded}).populate("TaskId");
    const tasks=user.TaskId;

    res.status(200).json({
        status:"Success",
        tasks
    })
    next();
}

catch(err){
    console.log(err);
}
    
}


exports.deleteTask=async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_secret);
        const validated = await roleChecker("Manager", decoded);
        if (!validated) {
            return res.status(401).json({
                status: "Unauthorized"
            })
        }

    const taskId=req.query.id;

    const task=await Task.findOneAndDelete({_id:taskId})
    res.status(200).json({
        status:"Success",
        task
    })
    next();
}

catch(err){
    console.log(err);
}
    
}

exports.updateTask = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_secret);
      const user = await User.findOne({ Email: decoded });
      if (!user) {
        return res.status(401).json({
          status: "unauthorized",
        });
      }
      const taskId = req.params.id;
      const updatedTask = req.body;
      console.log(req.body);
      const task = await Task.findOneAndUpdate(
        { _id: taskId },
        updatedTask,
        {
          new: true,
          runValidators: true,
        }
      );
  
      const allTodosCompleted = task.todos.every((todo) => todo.completed);
      if (allTodosCompleted && !task.completed) {
        task.completed = true;
        await task.save();
      }
  
      res.status(200).json({
        status: "Success",
        task,
      });
      next();
    } catch (err) {
      console.log(err);
    }
  };

  exports.getTaskCompletionRate = async (req, res, next) => {
    try {
      const aggregation = await Task.aggregate([
        {
          $group: {
            _id: "$Assigned_to",
            totalTasks: { $sum: 1 },
            completedTasks: { $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] } },
          },
        },
        {
          $project: {
            _id: 1,
            totalTasks: 1,
            completedTasks: 1,
            completionRate: { $divide: ["$completedTasks", "$totalTasks"] },
          },
        },
      ]);
  
      res.status(200).json({
        status: "Success",
        data: aggregation,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "Failed",
      });
    }
  };
  