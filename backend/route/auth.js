// Express
import express from "express";
import { check, validationResult } from "express-validator";

// BcryptJS
import bcrypt from "bcryptjs";

// Database & Contact
import "../utilities/db.js";
import Contact from "../utilities/model.js";

// Calling Import
const Router = express.Router();

// Proses login #1 ( Wajib diletakkan di baris sesudah session! )
Router.post(
  "/login",
  [
    check("email", "Email tidak valid!")
      .isEmail()
      .custom(async (value) => {
        const email = await Contact.findOne({ email: value });
        if (email == null) {
          throw "Akun belum terdaftar.";
        }
        return true;
      }),
    check("password", "Password tidak boleh kosong").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const user = await Contact.findOne({ email: req.body.email });
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          throw "Password yang anda masukkan salah!";
        } else {
          req.session.regenerate((err) => {
            try {
              if (err) throw err;

              req.session.user = user;

              req.session.save((err) => {
                if (err) throw err;
                res.status(200).send({
                  message: "Login success",
                  result: true,
                  user: req.session.user,
                });
              });
            } catch (error) {
              return res.status(400).send({ message: error });
            }
          });
        }
      } catch (error) {
        return res.status(400).send({ message: error });
      }
    } else {
      const error = errors.array();
      return res.status(400).send({ message: error[0].msg });
    }
  }
);

// Proses sign up
Router.post(
  "/signup",
  [
    check("email", "Email tidak valid!")
      .isEmail()
      .custom(async (value) => {
        const duplicate = await Contact.findOne({ email: value });
        if (duplicate) {
          throw `Email ${value} sudah digunakan, gunakan email lain.`;
        }
        return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // console.log(errors)
    if (!errors.isEmpty()) {
      const error = errors.array();
      return res.status(400).send({ message: error[0].msg });
    } else {
      const saltRounds = 10;

      const password = req.body.password;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      req.body.password = hashedPassword;

      Contact.insertMany(req.body, () => {
        req.session.regenerate((err) => {
          try {
            if (err) throw err;

            req.session.user = req.body;

            req.session.save((err) => {
              if (err) throw err;
              res.status(200).send({
                message: "Signup success",
                result: true,
                user: req.session.user,
              });
            });
          } catch (error) {
            return res.status(400).send({ message: error });
          }
        });
      });
    }
  }
);

Router.get("/session", (req, res) => {
  if (req.session.user !== undefined) {
    res.json({ session: req.session.user });
  } else {
    res.send("Session belum ada");
  }
});

export default Router;
