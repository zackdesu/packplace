import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/test";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.log(err));
