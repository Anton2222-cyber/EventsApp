import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Participants = () => {
    const { id: eventId } = useParams();
    const [participants, setParticipants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                console.log("Fetching participants for event with ID:", eventId);
                const response = await axios.get(`https://events-api.tohaproject.click/api/events/${eventId}/participants`);
                setParticipants(response.data);
            } catch (error) {
                console.error('Error fetching participants:', error);
            }
        };

        fetchParticipants();
    }, [eventId]);


    const filteredParticipants = participants.filter(participant =>
        participant.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-amber-50 font-bold mb-4">Participants</h1>


            <input
                type="text"
                placeholder="Search by full name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 p-2 w-full border border-gray-300 rounded"
            />


            <table className="min-w-full text-amber-50 border border-gray-300">
                <thead>
                <tr>
                    <th className="border-b p-2 text-left">Full Name</th>
                    <th className="border-b p-2 text-left">Email</th>
                    <th className="border-b p-2 text-left">Date of Birth</th>
                    <th className="border-b p-2 text-left">Source</th>
                </tr>
                </thead>
                <tbody>
                {filteredParticipants.map(participant => (
                    <tr key={participant.id}>
                        <td className="border-b p-2 text-left">{participant.fullName}</td>
                        <td className="border-b p-2 text-left">{participant.email}</td>
                        <td className="border-b p-2 text-left">{participant.dateOfBirth}</td>
                        <td className="border-b p-2 text-left">{participant.source}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Participants;
