import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTask.css';

function CreateTask() {
  const [task, setTask] = useState({
    Title: '',
    Description: '',
    End_Date: '',
    todos: [{
      title: '',
      description: '',
      completed: false
    }]
  });

  const navigate=useNavigate();
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleTodoChange = (e, index) => {
    const { name, value } = e.target;
    const todos = [...task.todos];
    todos[index][name] = value;
    setTask({ ...task, todos });
  };

  const addTodo = () => {
    setTask({
      ...task,
      todos: [...task.todos, { title: '', description: '', completed: false }]
    });
  };

  const removeTodo = (index) => {
    const todos = [...task.todos];
    todos.splice(index, 1);
    setTask({ ...task, todos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8000/api/v1/task',
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate("/showtask")
    } catch (error) {
      console.error(error);
      alert('Failed to create task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="Title"
              value={task.Title}
              onChange={handleTaskChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              name="Description"
              value={task.Description}
              onChange={handleTaskChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="end_date" className="block text-gray-700 font-bold mb-2">End Date</label>
            <input
              type="date"
              id="end_date"
              name="End_Date"
              value={task.End_Date}
              onChange={handleTaskChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Todos</h3>
            {task.todos.map((todo, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  name="title"
                  value={todo.title}
                  onChange={(e) => handleTodoChange(e, index)}
                  placeholder="Todo Title"
                  className="border rounded py-2 mb-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                  required
                />
                
                <textarea
                  name="description"
                  value={todo.description}
                  onChange={(e) => handleTodoChange(e, index)}
                  placeholder="Todo Description"
                  className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                  rows="2"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => removeTodo(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={addTodo}
            >
              Add Todo
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;