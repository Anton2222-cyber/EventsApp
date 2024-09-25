import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EventsBoard = () => {
    const [events, setEvents] = useState([]);
    const [sortBy, setSortBy] = useState('title'); // Поле сортування

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Надсилаємо запит на сервер з полем сортування
                const response = await axios.get(`http://localhost:5000/api/events?sortBy=${sortBy}`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [sortBy]); // Викликаємо запит щоразу при зміні сортування

    // Функція для зміни методу сортування
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-amber-50 font-bold mb-4">Events Board</h1>

            {/* Випадаючий список для вибору методу сортування */}
            <div className="mb-4">
                <label htmlFor="sort" className="text-amber-50 mr-2">Sort events by:</label>
                <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="bg-gray-800 text-amber-50 p-2 rounded"
                >
                    <option value="title">Title</option>
                    <option value="eventDate">Event Date</option>
                    <option value="organizer">Organizer</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map(event => (
                    <div key={event.id} className="bg-black shadow-lg rounded-xl hover:cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-blue-700 p-8 shadow-red-600">
                        <h2 className="text-xl text-amber-50 font-semibold mb-2">{event.title}</h2>
                        <p className="text-amber-900">Date: {event.eventDate}</p>
                        <p className="text-amber-400">Organizer: {event.organizer}</p>
                        <div className="mt-4 flex justify-between">
                            <Link to={`/register/${event.id}`} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">Register</Link>
                            <Link to={`/participants/${event.id}`} className="bg-green-500 text-white py-2 px-4 rounded">View Participants</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsBoard;
