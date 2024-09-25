const db = require('../database');


const Event = {
    getAllEvents: (callback) => {
        db.all("SELECT * FROM events", callback);
    },
    getEventById: (id, callback) => {
        db.get("SELECT * FROM events WHERE id = ?", [id], callback);
    },
    createEvent: (title, eventDate, organizer, description, callback) => {
        db.run("INSERT INTO events (title, eventDate, organizer, description) VALUES (?, ?, ?, ?)",
            [title, eventDate, organizer, description], callback);
    },
    sortEvents: (sortBy, callback) => {
        const query = `SELECT * FROM events ORDER BY ${sortBy}`;
        db.all(query, callback);
    },
    getEventUsers: (eventId, callback) => {
        db.all("SELECT * FROM users WHERE eventId = ?", [eventId], callback);
    }
};

module.exports = Event;
