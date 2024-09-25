const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    // Таблиця для подій
    db.run(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        eventDate TEXT NOT NULL,
        organizer TEXT NOT NULL,
        description TEXT NOT NULL
    );`);

    // Таблиця для користувачів з зовнішнім ключем
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT NOT NULL,
        email TEXT NOT NULL,
        dateOfBirth TEXT,
        source TEXT,
        eventId INTEGER,
        FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE
    );`);
});

module.exports = db;
