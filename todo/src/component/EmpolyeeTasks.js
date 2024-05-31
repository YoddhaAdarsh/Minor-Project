import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmployeeTasks() {
  const [tasks, setTasks] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/v1/task/getTasks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const formattedTasks = res.data.tasks.map(task => ({
          ...task,
          End_Date: new Date(task.End_Date).toLocaleDateString(),
          Assigned_Date: new Date(task.Assigned_Date).toLocaleDateString()
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
        <div className="grid grid-cols-3 gap-4">
          {tasks.map((task, index) => (
            <div key={index} className="bg-blue-100 p-4 rounded shadow-md" onClick={()=>{
              navigate(`/task/${task._id}`)
            }}>
              <h3 className="text-lg font-bold mb-2">{task.Title}</h3>
              <p className="text-gray-700">{task.Description}</p>
              <p className="text-gray-500 mt-2">End Date: {task.End_Date}</p>
              <p className="text-gray-500">Assigned Date: {task.Assigned_Date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeTasks;
