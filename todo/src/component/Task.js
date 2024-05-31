import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Task() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8000/api/v1/Task/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const formattedTask = {
          ...res.data.data,
          End_Date: new Date(res.data.data.End_Date).toLocaleDateString(),
          Assigned_Date: new Date(res.data.data.Assigned_Date).toLocaleDateString()
        };
        setTask(formattedTask);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [id]);

  const assignTask = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8000/api/v1/task/assignTask',
        { id: id, teamName: teamName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Task assigned to all team members');
    } catch (error) {
      console.error(error);
      alert('Failed to assign task');
    }
  };

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  };

  const calculateCompletion = () => {
    const completedTodos = task.todos.filter(todo => todo.completed).length;
    const totalTodos = task.todos.length;
    return totalTodos === 0 ? 0 : (completedTodos / totalTodos) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center relative">
      {loading && (
        <div className="absolute top-0 right-0 p-4">
          <div className="rounded-full h-12 w-12 border-4 border-t-4 border-blue-500 border-opacity-25 animate-spin"></div>
        </div>
      )}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Task Details</h2>
        {task && (
          <div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Title: {task.Title}</p>
              <p className="text-gray-700">Description: {task.Description}</p>
              <p className="text-gray-700">End Date: {task.End_Date}</p>
              <p className="text-gray-700">Assigned Date: {task.Assigned_Date}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Todos:</h3>
              <ul className="list-disc pl-5">
                {task.todos.map((todo, index) => (
                  <li key={index} className="text-gray-700">
                    <p>Title: {todo.title}</p>
                    <p>Description: {todo.description}</p>
                    <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
                   { <p>Assigned To: {task.Assigned_to}</p>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter team name"
                value={teamName}
                onChange={handleInputChange}
                className="border rounded py-2 px-3 mr-2"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={assignTask}
              >
                Assign Task
              </button>
            </div>
            <div className="mt-4">
              <div className="bg-gray-200 h-4 rounded-lg overflow-hidden">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${calculateCompletion()}%` }}
                ></div>
              </div>
              <p className="text-gray-700 text-center mt-2">
                Completion: {calculateCompletion()}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
