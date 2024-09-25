const db = require('./database');


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
        console.log(`Inserting event: ${event.title}`);
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


const addBulkUsers = () => {
    const users = [
        { fullName: "User 1", email: "user1@example.com", dateOfBirth: "1990-01-01", source: "Social Media", eventId: 1 },
        { fullName: "User 2", email: "user2@example.com", dateOfBirth: "1991-01-02", source: "Friends", eventId: 2 },
        { fullName: "User 3", email: "user3@example.com", dateOfBirth: "1992-01-03", source: "Social Media", eventId: 3 },
        { fullName: "User 4", email: "user4@example.com", dateOfBirth: "1993-01-04", source: "Found Myself", eventId: 4 },
        { fullName: "User 5", email: "user5@example.com", dateOfBirth: "1994-01-05", source: "Found Myself", eventId: 5 },
        { fullName: "User 6", email: "user6@example.com", dateOfBirth: "1995-01-06", source: "Social Media", eventId: 6 },
        { fullName: "User 7", email: "user7@example.com", dateOfBirth: "1996-01-07", source: "Found Myself", eventId: 7 },
        { fullName: "User 8", email: "user8@example.com", dateOfBirth: "1997-01-08", source: "Friends", eventId: 8 },
        { fullName: "User 9", email: "user9@example.com", dateOfBirth: "1998-01-09", source: "Found Myself", eventId: 9 },
        { fullName: "User 10", email: "user10@example.com", dateOfBirth: "1999-01-10", source: "Friends", eventId: 10 }
    ];

    const stmt = db.prepare("INSERT INTO users (fullName, email, dateOfBirth, [source], eventId) VALUES (?, ?, ?, ?, ?)");
    users.forEach(user => {
        console.log(`Inserting user: ${user.fullName}`);
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


const seedDatabase = () => {
    addBulkEvents();
    addBulkUsers();
};

seedDatabase();
