import express from "express";
import mongoose from "mongoose";
import pg from "pg";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import sqlite3 from "sqlite3";
var upload = multer();

const port = 4000;
const app = express();
let notes = [];

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
  })
);
app.use(bodyParser.json());

// open the database
let db = new sqlite3.Database(
  "./db/Notes.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the Notes database.");
  }
);

db.serialize(() => {
  db.all(`SELECT * FROM notes ORDER BY id DESC LIMIT (6)`, (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    notes = rows;
  });
});

app.get("/", (req, res) => {
  console.log("recived text request");
  res.json(notes);
});

app.get("/images/:id", (req, res) => {
  console.log("recived images request");
  const id = req.params.id;
  res.set("Content-Type", "application/json");

  db.serialize(() => {
    db.all(
      `SELECT photo FROM img WHERE note_id = ? ORDER BY id DESC`,
      [id],
      (err, rows) => {
        if (err) {
          console.error(err.message);
        }
        let imgList = rows.map((row) => row.photo);
        res.json(imgList);
      }
    );
  });
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
    notes: req.body.answer,
    date: todayDate,
    images: imgBlobArray,
    audio: audioBlob,
  };

  console.log(newNote);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server Lisining on port ${port}`);
});
