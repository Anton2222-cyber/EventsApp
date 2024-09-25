import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Register = () => {
    const { id: eventId } = useParams(); // Отримуємо eventId з параметрів маршруту
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        dateOfBirth: '',
        eventId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            user.eventId = eventId;
            await axios.post(`http://localhost:5000/api/users`, user);
            alert('Registration successful!');
            // Можливо, ви хочете перенаправити користувача або скинути форму тут
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Registration failed!');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Register for Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={user.fullName}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={user.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">Register</button>
            </form>
        </div>
    );
};

export default Register;
