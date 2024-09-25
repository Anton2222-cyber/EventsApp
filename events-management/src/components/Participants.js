import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Participants = () => {
    const { id: eventId } = useParams(); // Отримуємо eventId з параметрів маршруту
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                console.log("Fetching participants for event with ID:", eventId);
                const response = await axios.get(`http://localhost:5000/api/events/${eventId}/participants`);
                setParticipants(response.data);
            } catch (error) {
                console.error('Error fetching participants:', error);
            }
        };

        fetchParticipants();
    }, [eventId]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Participants</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                <tr>
                    <th className="border-b p-2">Full Name</th>
                    <th className="border-b p-2">Email</th>
                    <th className="border-b p-2">Date of Birth</th>
                </tr>
                </thead>
                <tbody>
                {participants.map(participant => (
                    <tr key={participant.id}>
                        <td className="border-b p-2">{participant.fullName}</td>
                        <td className="border-b p-2">{participant.email}</td>
                        <td className="border-b p-2">{participant.dateOfBirth}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Participants;
