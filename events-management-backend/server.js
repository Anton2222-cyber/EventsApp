const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express(); // Видалити виклик () після app
const eventsRouter = require('./routes/event');
const usersRouter = require('./routes/users');

app.use(cors()); // CORS має бути до роутів
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

// Додати багато подій без API
const addBulkEvents = () => {
    const events = [
        { title: "Event 1", eventDate: "2024-10-01", organizer: "Organizer 1", description: "Description 1" },
        { title: "Event 2", eventDate: "2024-10-02", organizer: "Organizer 2", description: "Description 2" },
        { title: "Event 3", eventDate: "2024-10-03", organizer: "Organizer 3", description: "Description 3" },
        { title: "Event 4", eventDate: "2024-10-04", organizer: "Organizer 4", description: "Description 4" },
        { title: "Event 5", eventDate: "2024-10-05", organizer: "Organizer 5", description: "Description 5" },
        { title: "Event 6", eventDate: "2024-10-06", organizer: "Organizer 6", description: "Description 6" },
        { title: "Event 7", eventDate: "2024-10-07", organizer: "Organizer 7", description: "Description 7" },
        { title: "Event 8", eventDate: "2024-10-08", organizer: "Organizer 8", description: "Description 8" },
        { title: "Event 9", eventDate: "2024-10-09", organizer: "Organizer 9", description: "Description 9" },
        { title: "Event 10", eventDate: "2024-10-10", organizer: "Organizer 10", description: "Description 10" }
    ];

    const stmt = db.prepare("INSERT INTO events (title, eventDate, organizer, description) VALUES (?, ?, ?, ?)");
    events.forEach(event => {
        stmt.run(event.title, event.eventDate, event.organizer, event.description, function(err) {
            if (err) {
                console.error("Error inserting event:", err.message);
            } else {
                console.log(`Inserted event with ID: ${this.lastID}`);
            }
        });
    });
    stmt.finalize();
};

// Додати нових користувачів без API
const addBulkUsers = () => {
    const users = [
        { fullName: "User 1", email: "user1@example.com", dateOfBirth: "1990-01-01", source: "source 1", eventId: 1 },
        { fullName: "User 2", email: "user2@example.com", dateOfBirth: "1991-01-02", source: "source 2", eventId: 2 },
        { fullName: "User 3", email: "user3@example.com", dateOfBirth: "1992-01-03", source: "source 3", eventId: 3 },
        { fullName: "User 4", email: "user4@example.com", dateOfBirth: "1993-01-04", source: "source 4", eventId: 4 },
        { fullName: "User 5", email: "user5@example.com", dateOfBirth: "1994-01-05", source: "source 5", eventId: 5 },
        { fullName: "User 6", email: "user6@example.com", dateOfBirth: "1995-01-06", source: "source 6", eventId: 6 },
        { fullName: "User 7", email: "user7@example.com", dateOfBirth: "1996-01-07", source: "source 7", eventId: 7 },
        { fullName: "User 8", email: "user8@example.com", dateOfBirth: "1997-01-08", source: "source 8", eventId: 8 },
        { fullName: "User 9", email: "user9@example.com", dateOfBirth: "1998-01-09", source: "source 9", eventId: 9 },
        { fullName: "User 10", email: "user10@example.com", dateOfBirth: "1999-01-10", source: "source 10", eventId: 10 }
    ];

    const stmt = db.prepare("INSERT INTO users (fullName, email, dateOfBirth, source, eventId) VALUES (?, ?, ?, ?, ?)");
    users.forEach(user => {
        stmt.run(user.fullName, user.email, user.dateOfBirth, user.source, user.eventId, function(err) {
            if (err) {
                console.error("Error inserting user:", err.message);
            } else {
                console.log(`Inserted user with ID: ${this.lastID}`);
            }
        });
    });
    stmt.finalize();
};

// Викликати функції для додавання даних
addBulkEvents();
addBulkUsers();

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
