import express from "express";
import mongoose from "mongoose";
import pg from "pg";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
var upload = multer();

const port = 4000;
const app = express();
let notes = [];

app.use(
  cors({
    origin: "http://127.0.0.1:3001",
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("recived text request");
  res.json(notes);
});

app.get("/audio/:id", (req, res) => {
  console.log("recived audio request");
  const id = req.params.id;
  res.set("Content-Type", "application/octet-stream");
  notes[id].audio.arrayBuffer().then((buffer) => {
    res.send(Buffer.from(buffer));
  });
});

app.get("/images/:id", (req, res) => {
  console.log("recived images request");
  const id = req.params.id;
  res.set("Content-Type", "application/json");
  let list = [];
  let noteImg = notes[id].images;

  for (let i = 0; i < noteImg.length; i++) {
    noteImg[i].arrayBuffer().then((imgArrayBuffer) => {
      let imgBuffer = Buffer.from(imgArrayBuffer);
      list.push(imgBuffer);

      if (list.length === noteImg.length) {
        res.json(list);
      }
    });
  }
});

// field names of the input's

const cpUpload = upload.fields([
  { name: "image" },
  { name: "audio", maxCount: 1 },
]);

app.post("/", cpUpload, (req, res) => {
  let imgBlobArray = req.files.image.map(
    (image) => new Blob([image.buffer], { type: "image/png" })
  );
  let audioBlob = new Blob([req.files.audio[0].buffer], { type: "audio/mp4" });
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
