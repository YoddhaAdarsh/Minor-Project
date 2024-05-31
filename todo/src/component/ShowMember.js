import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TeamMembers({ match }) {
  const [teamData, setTeamData] = useState([]);
  const params=useParams();
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const token = localStorage.getItem('token');
        const id=params.id;
        const res = await axios.get(`http://localhost:8000/api/v1/team/getTeam?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTeamData(res.data.TeamData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeamData();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Team Members</h2>
        <ul>
          {teamData.map((member, index) => (
            <li key={index} className="text-lg">{member.Name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamMembers;
