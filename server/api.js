const express = require("express");
const apiRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db");
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

//Middleware

//Check if the minion exists in the database and attaching it to the request object
apiRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send({error: "Minion not found"});
  }
});
//Check if the ideaId exists in the database and attaching it to the request object
apiRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send({error: "Idea not found"});
  }
});

//Minion Routes
apiRouter.get("/minions", (req, res, next) => {
  const minions = getAllFromDatabase("minions");
  res.send(minions);
});

apiRouter.post("/minions", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});
apiRouter.get("/minions/:minionId", (req, res, next) => {
  res.send(req.minion);
});
apiRouter.put("/minions/:minionId", (req, res, next) => {
  if (req.minion) {
    const updatedMinion = updateInstanceInDatabase("minions", req.body);
    res.send(updatedMinion);
  }
});
apiRouter.delete("/minions/:minionId", (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deletedMinion) {
    res.status(204).send();
  }
});

//Idea Routes
apiRouter.get("/ideas", (req, res, next) => {
  const ideas = getAllFromDatabase("ideas");
  res.send(ideas);
});
//Inclues middleware to check if the idea is a million dollar idea
apiRouter.post("/ideas", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase("ideas", req.body);
  if (newIdea) {
    res.status(201).send(newIdea);
  } else {
    res.status(400).send({ error: "Invalid idea" });
  }
});

apiRouter.get("/ideas/:ideaId", (req, res, next) => {
  if (req.idea) {
    res.send(req.idea);
  }
});
apiRouter.put("/ideas/:ideaId", (req, res, next) => {
  if (req.idea) {
    const updatedIdea = updateInstanceInDatabase("ideas", req.body);
    res.send(updatedIdea);
  }
});
apiRouter.delete("/ideas/:ideaId", (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId("ideas", req.params.ideaId);
  if (deletedIdea) {
    res.status(204).send();
  } else {
    res.status(404).send({ error: "Idea not found" });
  }
});

//Meeting Routes
apiRouter.get("/meetings", (req, res, next) => {
  const meetings = getAllFromDatabase("meetings");
  res.send(meetings);
});
apiRouter.post("/meetings", (req, res, next) => {
  const newMeeting = createMeeting();
  if (newMeeting) {
    addToDatabase("meetings", newMeeting);
    res.status(201).send(newMeeting);
  } else {
    res.status(400).send({ error: "Invalid meeting" });
  }
});
apiRouter.delete("/meetings", (req, res, next) => {
  const deletedMeeting = deleteAllFromDatabase("meetings");
  if (deletedMeeting) {
    res.status(204).send();
  } else {
    res.status(404).send({ error: "Meeting not found" });
  }
});

module.exports = apiRouter;
