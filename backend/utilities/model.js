import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: {
    type: String,
  },
});

const Contact = mongoose.model("data", ContactSchema);

export default Contact;
