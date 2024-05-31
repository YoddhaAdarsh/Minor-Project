import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TaskList.css'; // Import CSS file

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const onClickHandler = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/v1/task', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedTasks = res.data.data.map((task) => ({
          ...task,
          End_Date: new Date(task.End_Date).toLocaleDateString(),
          Assigned_Date: new Date(task.Assigned_Date).toLocaleDateString(),
        }));

        // Sort tasks by end date
        formattedTasks.sort((a, b) => new Date(a.End_Date) - new Date(b.End_Date));

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
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>
        <div className="grid grid-cols-3 gap-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="task-card"
              onClick={() => onClickHandler(task._id)}
            >
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

export default TaskList;
