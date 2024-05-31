import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmployeeTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8000/api/v1/task/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const formattedTask = {
          ...res.data.data,
          End_Date: new Date(res.data.data.End_Date),
          Assigned_Date: new Date(res.data.data.Assigned_Date)
        };
        setTask(formattedTask);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [id]);

  useEffect(() => {
    if (task) {
      const allTodosChecked = task.todos.every(todo => todo.completed);
      setAllChecked(allTodosChecked);
    }
  }, [task]);

  const handleTodoCompletion = async (todoId, completed) => {
    try {
      const updatedTask = { ...task };
      updatedTask.todos = updatedTask.todos.map(todo => {
        if (todo._id === todoId) {
          todo.completed = completed;
        }
        return todo;
      });
      setTask(updatedTask);
      const allTodosChecked = updatedTask.todos.every(todo => todo.completed);
      setAllChecked(allTodosChecked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8000/api/v1/task/${id}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAllChecked(true);
      setTask(prevTask => ({ ...prevTask, completed: true }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Task Details</h2>
        {task && (
          <div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Title: {task.Title}</p>
              <p className="text-gray-700">Description: {task.Description}</p>
              <p className="text-gray-700">End Date: {task.End_Date.toLocaleDateString('en-GB')}</p>
              <p className="text-gray-700">Assigned Date: {task.Assigned_Date.toLocaleDateString('en-GB')}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Todos:</h3>
              <ul className="list-disc pl-5">
                {task.todos.map((todo, index) => (
                  <li key={index} className="text-gray-700">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(e) => handleTodoCompletion(todo._id, e.target.checked)}
                        className="mr-2"
                      />
                      <div>
                        <p>Title: {todo.title}</p>
                        <p>Description: {todo.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
              >
                {allChecked ? 'Task Completed' : 'Complete Task'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeTask;