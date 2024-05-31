// src/Profile.js
import React, { useEffect, useState } from 'react';


const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                if (!token) {
                    throw new Error('Unauthorized');
                }
                const response = await fetch("http://localhost:8000/api/v1/user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
                )

                const profileData=await response.json();
                setProfile(profileData.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
    }

    if (!profile) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <div className="mt-1 p-2 border rounded">{profile.Name}</div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <div className="mt-1 p-2 border rounded">{profile.Email}</div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <div className="mt-1 p-2 border rounded">{profile.Role}</div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Employee ID</label>
                <div className="mt-1 p-2 border rounded">{profile.EmployeeID}</div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Team</label>
                <div className="mt-1 p-2 border rounded">{profile.Team}</div>
            </div>
        </div>
    );
};

export default Profile;
