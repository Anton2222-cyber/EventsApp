const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const eventsRouter = require('./routes/event');
const usersRouter = require('./routes/users');

app.use(cors());
app.use(bodyParser.json());

// Підключення роутів
app.use('/api/events', eventsRouter);
app.use('/api/users', usersRouter);

// Додати нову подію
app.post('/api/events', (req, res) => {
    const { title, eventDate, organizer, description } = req.body;
    db.run("INSERT INTO events (title, eventDate, organizer, description) VALUES (?, ?, ?, ?)",
        [title, eventDate, organizer, description], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ id: this.lastID, title, eventDate, organizer, description });
        }
    );
});

// Отримати всі події
app.get('/api/events', (req, res) => {
    db.all("SELECT * FROM events", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
