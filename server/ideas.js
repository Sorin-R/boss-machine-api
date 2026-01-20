const express = require('express');
const ideasRouter = express.Router();

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

// GET /api/ideas
ideasRouter.get('/', (req, res) => {
  const ideas = getAllFromDatabase('ideas');
  res.status(200).send(ideas);
});

// GET /api/ideas/:ideaId
ideasRouter.get('/:ideaId', (req, res) => {
  const idea = getFromDatabaseById('ideas', req.params.ideaId);

  if (!idea) {
    return res.status(404).send();
  }

  res.status(200).send(idea);
});

// POST /api/ideas
ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

// PUT /api/ideas/:ideaId
ideasRouter.put('/:ideaId', (req, res) => {
  const ideaId = req.params.ideaId;

  if (isNaN(ideaId)) {
    return res.status(404).send();
  }

  const updatedIdea = {
    ...req.body,
    id: ideaId,
  };

  try {
    const result = updateInstanceInDatabase('ideas', updatedIdea);

    if (!result) {
      return res.status(404).send();
    }

    res.status(200).send(result);
  } catch (err) {
    return res.status(400).send();
  }
});

// DELETE /api/ideas/:ideaId
ideasRouter.delete('/:ideaId', (req, res) => {
  const ideaId = req.params.ideaId;

  if (isNaN(ideaId)) {
    return res.status(404).send();
  }

  const deleted = deleteFromDatabasebyId('ideas', ideaId);

  if (!deleted) {
    return res.status(404).send();
  }

  res.status(204).send();
});

module.exports = ideasRouter;