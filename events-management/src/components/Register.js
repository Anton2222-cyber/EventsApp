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
    source: z.string().min(1, "Source is required")
});

const Register = () => {
    const { id: eventId } = useParams();
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        dateOfBirth: '',
        eventId: '',
        source: 'Found Myself' // нове поле
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
                source: errorMessages.source?._errors[0],
            });
            return;
        }

        try {
            user.eventId = eventId;
            await axios.post(`http://localhost:5000/api/users`, user);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setServerError(error.response.data.message);
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
                {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
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
                <div className="mb-4">
                    <label className="block mb-2 text-amber-50">Where did you hear about this event?</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="source"
                                value="Social Media"
                                checked={user.source === 'Social Media'}
                                onChange={handleChange}
                                className="form-radio text-blue-600 h-5 w-5"
                            />
                            <span className="ml-2 text-amber-50">Social Media</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="source"
                                value="Friends"
                                checked={user.source === 'Friends'}
                                onChange={handleChange}
                                className="form-radio text-blue-600 h-5 w-5"
                            />
                            <span className="ml-2 text-amber-50">Friends</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="source"
                                value="Found Myself"
                                checked={user.source === 'Found Myself'}
                                onChange={handleChange}
                                className="form-radio text-blue-600 h-5 w-5"
                            />
                            <span className="ml-2 text-amber-50">Found Myself</span>
                        </label>
                    </div>
                    {errors.source && <p className="text-red-500">{errors.source}</p>}
                </div>

                <button type="submit" className="mr-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Register</button>
            </form>
        </div>
    );
};

export default Register;
