const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
// Connect URL
const url = "mongodb://127.0.0.1:27017";
// Connect to MongoDB

const client = new mongoClient(url);
const addUser = async (req, res) => {
  console.log("req", req.body);
  let payload = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };
  console.log("payload", payload);

  let result = await client.connect();
  let db = result.db("Assignment");
  let collection = db.collection("user");
  collection
    .insertOne(payload)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send(error);
    });
};

const getUser = async (req, res) => {
  let result = await client.connect();
  let db = result.db("Assignment");
  let collection = db.collection("user");
  let ress = await collection.find({}).toArray();
  res.json(ress);
};

const updateUser = async (req, res) => {
  let result = await client.connect();
  let db = result.db("Assignment");
  let collection = db.collection("user");
  let payload = {};
  Object.keys(req.body).forEach((key) => {
    if (req.body[key]) {
      if (key === "password") {
        payload[key] = bcrypt.hashSync(req.body[key], 8);
      } else {
        payload[key] = req.body[key];
      }
    }
  });
  await collection
    .updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: {
          ...payload,
        },
      }
    )
    .then((ress) => {
      res.send(ress);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};

module.exports = { addUser, getUser, updateUser };
