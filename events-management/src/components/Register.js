import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';

// Створюємо схему валідації за допомогою zod
const userSchema = z.object({
    fullName: z.string().min(1, "Full Name is required").max(100, "Full Name is too long"),
    email: z.string().email("Invalid email address"),
    dateOfBirth: z.string().refine((date) => {
        const userDate = new Date(date);
        const currentDate = new Date();
        return userDate <= currentDate;
    }, "Date of birth cannot be in the future"),
});

const Register = () => {
    const { id: eventId } = useParams();
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        dateOfBirth: '',
        eventId: '',
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валідація з Zod
        const validationResult = userSchema.safeParse(user);
        if (!validationResult.success) {
            const errorMessages = validationResult.error.format();
            setErrors({
                fullName: errorMessages.fullName?._errors[0],
                email: errorMessages.email?._errors[0],
                dateOfBirth: errorMessages.dateOfBirth?._errors[0],
            });
            return;
        }

        try {
            user.eventId = eventId;
            await axios.post(`http://localhost:5000/api/users`, user);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setServerError(error.response.data.message); // Отримуємо повідомлення про помилку з сервера
            } else {
                console.error('Error registering user:', error);
                alert('Registration failed!');
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-amber-50 font-bold mb-4">Register for Event</h1>
            <form onSubmit={handleSubmit}>
                {serverError && <p className="text-red-500 mb-4">{serverError}</p>} {/* Виведення серверної помилки */}
                <div className="mb-4">
                    <label className="block mb-2 text-amber-50" htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={user.fullName}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                    {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-amber-50" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-amber-50" htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={user.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                    {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth}</p>}
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">Register</button>
            </form>
        </div>
    );
};

export default Register;
