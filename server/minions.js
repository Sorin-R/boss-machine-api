const express = require('express');
const minionsRouter = express.Router();
const workRouter = require('./work');

// Mount nested work routes
minionsRouter.use('/:minionId/work', workRouter);

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

// GET /api/minions
minionsRouter.get('/', (req, res) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).send(minions);
});

// GET /api/minions/:minionId
minionsRouter.get('/:minionId', (req, res) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (!minion) {
    return res.status(404).send();
  }
  res.status(200).send(minion);
});

// POST /api/minions
minionsRouter.post('/', (req, res) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

// PUT /api/minions/:minionId
minionsRouter.put('/:minionId', (req, res) => {
  const updatedMinion = {
    ...req.body,
    id: req.params.minionId
  };

  const result = updateInstanceInDatabase('minions', updatedMinion);
  if (!result) {
    return res.status(404).send();
  }

  res.status(200).send(result);
});

// DELETE /api/minions/:minionId
minionsRouter.delete('/:minionId', (req, res) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (!deleted) {
    return res.status(404).send();
  }
  res.status(204).send();
});

module.exports = minionsRouter;
