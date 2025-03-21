const checkMillionDollarIdea = (req, res, next) => {
  const { weeklyRevenue, numWeeks } = req.body;
  if (!weeklyRevenue || !numWeeks) {
    res.status(400).send({ error: "weeklyRevenue or numWeeks is empty!" });
  }
  const totalRevenue = weeklyRevenue * numWeeks;
  if (totalRevenue >= 1000000) {
    next();
  } else {
    res.status(400).send({error: "Idea is not worth a million dollars!"});
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
