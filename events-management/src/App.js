import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsBoard from './components/EventsBoard';
import Register from './components/Register';
import Participants from './components/Participants';

const App = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            <Router>
                <Routes>
                    <Route path="/" element={<EventsBoard />} />
                    <Route path="/register/:id" element={<Register />} />
                    <Route path="/participants/:id" element={<Participants />} />
                </Routes>
            </Router>

        </div>
    );
};

export default App;
