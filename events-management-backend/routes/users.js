const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Отримати всіх користувачів
router.get('/', (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(users);
    });
});

// Отримати користувача за ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    User.getUserById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    });
});

// Створити нового користувача
router.post('/', (req, res) => {
    const { fullName, email, dateOfBirth, source, eventId } = req.body;
    User.createUser(fullName, email, dateOfBirth, source, eventId, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User created successfully' });
    });
});

module.exports = router;
