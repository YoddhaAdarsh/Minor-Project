import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/task");
      const tasks = res.data.data;

      // Count tasks completed on time by each team
      const completionMap = {};
      tasks.forEach(task => {
        if (task.Assigned_to in completionMap) {
          completionMap[task.Assigned_to] += task.completed ? 1 : 0;
        } else {
          completionMap[task.Assigned_to] = task.completed ? 1 : 0;
        }
      });

      const chartData = Object.keys(completionMap).map(teamName => ({
        teamName: teamName,
        tasksCompletedOnTime: completionMap[teamName]
      }));

      setData(chartData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
    <p className="font-bold text-2xl my-4">Dashboard </p>
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="teamName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tasksCompletedOnTime" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
};

export default Dashboard;
