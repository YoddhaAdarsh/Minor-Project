import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TeamList() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/v1/team', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTeams(res.data.Teams);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Teams</h2>
        <ul>
          {teams.map((team, index) => (
            <li><Link to={team} key={index} className="text-lg" >{team}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamList;
