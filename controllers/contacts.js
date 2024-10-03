const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const db = mongodb.getDb();
    const clients = await db.collection("clients").find().toArray();
    if (clients.length === 0) {
      return res.status(404).json({ message: "No clients found." });
    }
    res.status(200).json(clients);
  } catch (err) {
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  try {
    const db = mongodb.getDb();
    const clientId = new ObjectId(req.params.id);
    const client = await db.collection("clients").findOne({ _id: clientId });
    if (!client) {
      return res.status(404).json({ message: "client not found." });
    }
    res.status(200).json(client);
  } catch (err) {
    next(err);
  }
};

const createclient = async (req, res, next) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday, nickname, gender } = req.body;
    const newclient = { firstName, lastName, email, favoriteColor, birthday, nickname, gender };
    const db = mongodb.getDb();
    const result = await db.collection("clients").insertOne(newclient);
    res.status(201).json({ message: "client created", result });
  } catch (err) {
    next(err);
  }
};

const updateclient = async (req, res, next) => {
  try {
    const clientId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday, nickname, gender } = req.body;
    const updatedclient = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
      nickname,
      gender
    };

    const db = mongodb.getDb();
    const result = await db
      .collection("clients")
      .updateOne({ _id: clientId }, { $set: updatedclient });

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "client not found, Check the ID" });
    }

    res.status(200).json({ message: "client updated", result });
  } catch (err) {
    next(err);
  }
};

const deleteclient = async (req, res, next) => {
  try {
    const db = mongodb.getDb();
    const clientId = new ObjectId(req.params.id);
    const client = await db.collection("clients").findOne({ _id: clientId });
    if (!client) {
      return res.status(404).json({ message: "client not found or no client in the database." });
    }
    
    const result = await db
      .collection("clients")
      .deleteOne({ _id: clientId });
    res.status(200).json({ message: "client deleted", result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createclient,
  updateclient,
  deleteclient,
};
