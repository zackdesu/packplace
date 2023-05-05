// dotenv
import dotenv from "dotenv";
dotenv.config();
// Express modules
import express from "express";
import cors from "cors";
import { check, validationResult } from "express-validator";

// Calling Import
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

import "./utilities/db.js";
import Contact from "./utilities/model.js";

app.get("/tes", async (req, res) => {
  const mains = await Contact.find();

  res.json(mains);
});

app.post(
  "/tes/new",
  [
    check("name", "nama sudah digunakan").custom(async (value) => {
      const duplicate = await Contact.findOne({ name: value });
      if (duplicate) {
        throw "Nama sudah digunakan";
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = errors.array();
      res.send(error);
      return false;
    }

    const acc = new Contact({
      name: req.body.name,
    });

    acc.save();

    res.json(acc);
  }
);

app.delete("/tes/delete/:id", async (req, res) => {
  try {
    const result = await Contact.findByIdAndDelete(req.params.id);

    res.json(result);
  } catch {
    console.log("ID tidak ditemukan");
  }
});

app.put(
  "/tes/edit/:id",
  [
    check("name", "nama sudah digunakan").custom(async (value) => {
      const duplicate = await Contact.findOne({ name: value });
      if (duplicate) {
        throw "Nama sudah digunakan";
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = errors.array();
      res.send(error);
      return false;
    }

    const result = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: { name: req.body.name } },
      { new: true }
    );

    res.json(result);
  }
);

app.listen(port, () =>
  console.log(`PackPlace is listening at http://localhost:${port}`)
);
