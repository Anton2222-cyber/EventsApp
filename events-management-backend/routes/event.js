const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Отримати всі події
router.get('/', (req, res) => {
    const sortBy = req.query.sortBy || 'title'; // Отримуємо поле сортування, за замовчуванням 'title'

    Event.sortEvents(sortBy, (err, events) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(events);
    });
});

// Отримати подію за ID
router.get('/:id', (req, res) => {
    const eventId = req.params.id;
    Event.getEventById(eventId, (err, event) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    });
});

// Створити нову подію
router.post('/', (req, res) => {
    const { title, eventDate, organizer, description } = req.body;
    Event.createEvent(title, eventDate, organizer, description, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Event created successfully' });
    });
});



// Отримати всіх учасників події
router.get('/:id/participants', (req, res) => {
    const eventId = req.params.id;
    Event.getEventUsers(eventId, (err, users) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(users);
    });
});

// Сортування подій
router.get('/sort/:sortBy', (req, res) => {
    const sortBy = req.params.sortBy; // Назва поля для сортування
    Event.sortEvents(sortBy, (err, events) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(events);
    });
});
module.exports = router;
