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
apiRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send({ error: "Minion not found" });
  }

})
apiRouter.get("/minions", (req, res, next) => {
  const minions = getAllFromDatabase("minions");
  res.send(minions);
});

apiRouter.post("/minions", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});
apiRouter.get("/minions/:minionId", (req, res, next) => {
  const minion = getFromDatabaseById("minions", req.params.minionId);
  if (minion) {
    res.send(minion);
  } else {
    res.status(404).send({ error: "Minion not found" });
  }
});
apiRouter.put("/minions/:minionId", (req, res, next) => {
  const minionId = req.params.minionId;
  const minionExists = getFromDatabaseById("minions", minionId);
  if (minionExists) {
    const updatedMinion = updateInstanceInDatabase("minions", req.body);
    res.send(updatedMinion);
  } else {
    res.status(404).send({ error: "Minion not found" });
  }
});
apiRouter.delete("/minions/:minionId", (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deletedMinion) {
    res.status(204).send();
  } else {
    res.status(404).send({ error: "Minion not found" });
  }
});
apiRouter.get("/ideas", (req, res, next) => {
  const ideas = getAllFromDatabase("ideas");
  res.send(ideas);
});
apiRouter.post("/ideas", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase("ideas", req.body);
  if (newIdea) {
    res.status(201).send(newIdea);
  } else {
    res.status(400).send({ error: "Invalid idea" });
  }
});

apiRouter.get("/ideas/:ideaId", (req, res, next) => {
  const idea = getFromDatabaseById("ideas", req.params.ideaId);
  if (idea) {
    res.send(idea);
  } else {
    res.status(404).send({ error: "Idea not found" });
  }
});
apiRouter.put("/ideas/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  const ideaExists = getFromDatabaseById("ideas", ideaId);
  if (ideaExists) {
    const updatedIdea = updateInstanceInDatabase("ideas", req.body);
    res.send(updatedIdea);
  } else {
    res.status(404).send({ error: "Idea not found" });
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

  //Error handling middleware
  apiRouter.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send({ error: err.message });
  });
});
module.exports = apiRouter;
