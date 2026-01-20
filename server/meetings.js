const express = require('express');
const meetingsRouter = express.Router();

const {
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
    createMeeting,
} = require('./db');

// GET all meetings
meetingsRouter.get('/', (req, res) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings);
});

// POST create meeting
meetingsRouter.post('/', (req, res) => {
    const newMeeting = createMeeting();
    const created = addToDatabase('meetings', newMeeting);
    res.status(201).send(created);
});

// DELETE all meetings
meetingsRouter.delete('/', (req, res) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});

module.exports = meetingsRouter;
