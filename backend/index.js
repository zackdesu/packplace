// dotenv
import dotenv from "dotenv";
dotenv.config();
// Express modules
import express from "express";
import cors from "cors";

// Calling Import
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const uri = "mongodb://127.0.0.1:27017/test";

import mongoose from "mongoose";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

import Contact from "./utilities/model.js";

app.get("/tes", async (req, res) => {
  const mains = await Contact.find();

  res.json(mains);
});

app.post("/tes/new", (req, res) => {
  const acc = new Contact({
    name: req.body.name,
  });

  acc.save();

  res.json(acc);
});

app.listen(port, () =>
  console.log(`PackPlace is listening at http://localhost:${port}`)
);
