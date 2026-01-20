const express = require('express');
const workRouter = express.Router({ mergeParams: true });

const {
  getAllFromDatabase,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  getFromDatabaseById
} = require('./db');

// Helper: validate minion exists
const validateMinion = (minionId) => {
  if (isNaN(minionId)) return false;
  return getFromDatabaseById('minions', minionId);
};

// GET /api/minions/:minionId/work
workRouter.get('/', (req, res) => {
  const { minionId } = req.params;

  const minion = validateMinion(minionId);
  if (!minion) {
    return res.status(404).send();
  }

  const allWork = getAllFromDatabase('work');
  const minionWork = allWork.filter(w => w.minionId === minionId);

  res.status(200).send(minionWork);
});

// POST /api/minions/:minionId/work
workRouter.post('/', (req, res) => {
  const { minionId } = req.params;

  const minion = validateMinion(minionId);
  if (!minion) {
    return res.status(404).send();
  }

  const newWork = {
    ...req.body,
    minionId
  };

  try {
    const created = addToDatabase('work', newWork);
    res.status(201).send(created);
  } catch {
    res.status(400).send();
  }
});

// PUT /api/minions/:minionId/work/:workId
workRouter.put('/:workId', (req, res) => {
  const { minionId, workId } = req.params;

  const minion = validateMinion(minionId);
  if (!minion || isNaN(workId)) {
    return res.status(404).send();
  }

  const existing = getFromDatabaseById('work', workId);
  if (!existing) {
    return res.status(404).send();
  }

  // Wrong minion → 400
  if (existing.minionId !== minionId) {
    return res.status(400).send();
  }

  const updatedWork = {
    ...req.body,
    id: workId,
    minionId
  };

  try {
    const updated = updateInstanceInDatabase('work', updatedWork);
    res.status(200).send(updated);
  } catch {
    res.status(400).send();
  }
});

// DELETE /api/minions/:minionId/work/:workId
workRouter.delete('/:workId', (req, res) => {
  const { minionId, workId } = req.params;

  const minion = validateMinion(minionId);
  if (!minion || isNaN(workId)) {
    return res.status(404).send();
  }

  const existing = getFromDatabaseById('work', workId);
  if (!existing) {
    return res.status(404).send();
  }

  // Wrong minion → 400
  if (existing.minionId !== minionId) {
    return res.status(400).send();
  }

  const deleted = deleteFromDatabasebyId('work', workId);
  if (!deleted) {
    return res.status(404).send();
  }

  res.status(204).send();
});

module.exports = workRouter;