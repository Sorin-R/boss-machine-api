const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;

  if (!numWeeks || !weeklyRevenue) {
    return res.status(400).send();
  }

  const weeks = Number(numWeeks);
  const revenue = Number(weeklyRevenue);

  if (isNaN(weeks) || isNaN(revenue)) {
    return res.status(400).send();
  }

  const total = weeks * revenue;

  if (total < 1000000) {
    return res.status(400).send();
  }

  next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
