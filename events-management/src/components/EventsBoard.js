import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EventsBoard = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Events Board</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map(event => (
                    <div key={event.id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-300">
                        <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                        <p className="text-gray-700">Date: {event.eventDate}</p>
                        <p className="text-gray-700">Organizer: {event.organizer}</p>
                        <div className="mt-4">
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
