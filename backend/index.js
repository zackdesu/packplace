// dotenv
import dotenv from "dotenv";
dotenv.config();
// Express modules
import express from "express";
import cors from "cors";
import session from "express-session";

// Calling Import
const app = express();
const port = 8080;

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 2 },
  })
);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
import Router from "./route/auth.js";

app.use(Router);

app.listen(port, () =>
  console.log(`PackPlace is listening at http://localhost:${port}`)
);
