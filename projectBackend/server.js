import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
var upload = multer();

const port = 4000;
const app = express();
let notes = [];

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("recived");
  res.json(notes);
});

// field names of the input's

const cpUpload = upload.fields([
  { name: "image" },
  { name: "audio", maxCount: 1 },
]);

app.post("/", cpUpload, (req, res) => {
  let imgBlobArray = req.files.image.map(
    (image) => new Uint8Array(image.buffer)
  );
  let audioBlob = new Uint8Array(req.files.audio[0].buffer);
  let todayDate = new Date().toLocaleDateString();
  let newNote = {
    title: req.body.title,
    question: req.body.question,
    answer: req.body.answer,
    date: todayDate,
    images: imgBlobArray,
    audio: audioBlob,
  };

  notes.push(newNote);
  console.log(notes);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server Lisining on port ${port}`);
});
