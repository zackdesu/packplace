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
