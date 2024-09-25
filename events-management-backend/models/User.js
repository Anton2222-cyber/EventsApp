const db = require('../database');

const User = {
    getAllUsers: (callback) => {
        db.all("SELECT * FROM users", callback);
    },
    getUserById: (id, callback) => {
        db.get("SELECT * FROM users WHERE id = ?", [id], callback);
    },
    createUser: (fullName, email, dateOfBirth, source, eventId, callback) => {
        db.run("INSERT INTO users (fullName, email, dateOfBirth, source, eventId) VALUES (?, ?, ?, ?, ?)",
            [fullName, email, dateOfBirth, source, eventId], callback);
    },
    getUserByEmail: (email, callback) => {
        db.get("SELECT * FROM users WHERE email = ?", [email], callback);
    },
};

module.exports = User;
