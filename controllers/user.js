const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const db = mongodb.getDb();
    const user = await db.collection("user").find().toArray();
    if (user.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


const getSingle = async (req, res, next) => {
  try {
    const db = mongodb.getDb();
    const userId = new ObjectId(req.params.id);
    const user = await db.collection("user").findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("user")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the user."
      );
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday, nickname, gender } = req.body;
    const updateduser = {
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
      .collection("user")
      .updateOne({ _id: userId }, { $set: updateduser });

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "user not found, Check the ID" });
    }

    res.status(200).json({ message: "user updated", result });
  } catch (err) {
    next(err);
  }
};



const deleteUser = async (req, res, next) => {
  try {
    const db = mongodb.getDb();
    const userId = new ObjectId(req.params.id);
    const user = await db.collection("user").findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found or no user in the database." });
    }
    
    const result = await db
      .collection("user")
      .deleteOne({ _id: userId });
    res.status(200).json({ message: "User deleted", result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
