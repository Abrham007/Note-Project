import express from "express";
import mongoose from "mongoose";

const port = 4000;
const app = express();

app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://0.0.0.0:27017/noteDb");
const noteSchema = new mongoose.Schema({
  title: String,
  date: Date,
  question: String,
  answer: String,
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log(`Server Lisining on port ${port}`);
});
