const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const TaskSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description:{
        type:String,
        required:true
    },
    todos: [TodoSchema],
    completed: {
        type: Boolean,
        default: false
    },
    End_Date:{
        type:Date
    },
    Assigned_Date:{
        type:Date,
        default:Date.now
    },
    Assigned_to:String
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
