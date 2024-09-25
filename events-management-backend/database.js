const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        eventDate TEXT NOT NULL,
        organizer TEXT NOT NULL,
        description TEXT NOT NULL
    );`, (err) => {
        if (err) {
            console.error("Error creating 'events' table:", err.message);
        } else {
            console.log("'events' table created or already exists");
        }
    });

    db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT NOT NULL,
        email TEXT NOT NULL,
        dateOfBirth TEXT,
        source TEXT,
        eventId INTEGER,
        FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE
    );`, (err) => {
        if (err) {
            console.error("Error creating 'users' table:", err.message);
        } else {
            console.log("'users' table created or already exists");
        }
    });
});

module.exports = db;
