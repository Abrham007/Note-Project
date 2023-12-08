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

app.get("/", (req, res) => {
  console.log("recived text request");

  db.serialize(() => {
    db.all(
      `SELECT * FROM section JOIN notes ON section.id = notes.title_id ORDER BY notes.id ASC  LIMIT(10)`,
      (err, rows) => {
        if (err) {
          console.error(err.message);
        }
        notes = rows;
        res.json(notes);
      }
    );
  });
});

app.get("/modules", (req, res) => {
  db.serialize(() => {
    db.all(`SELECT module FROM module`, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      console.log(rows);
      let moduleList = rows.map((row) => row.module);
      res.json(moduleList);
    });
  });
});

app.get("/images/:id", (req, res) => {
  console.log("recived images request");
  const id = req.params.id;
  res.set("Content-Type", "application/json");

  db.serialize(() => {
    db.all(
      `SELECT photo FROM img JOIN notes ON img.note_id = notes.id WHERE notes.id = (?) ORDER BY img.id DESC`,
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

app.post("/", cpUpload, async (req, res) => {
  let audioBlob = new Blob([req.files.audio[0].buffer], { type: "audio/mp4" });
  let audioBuffer = Buffer.from(await audioBlob.arrayBuffer());
  let todayDate = new Date().toLocaleString();

  db.run(
    `INSERT INTO notes(title, date, question, notes, audio, module, referance ) VALUES(?, ?, ?, ?, ?, ?, ?)`,
    [
      req.body.title,
      todayDate,
      req.body.question,
      req.body.answer,
      audioBuffer,
      req.body.module,
      req.body.referance,
    ],
    async function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(
        `A row has been inserted in notes table with rowid ${this.lastID}`
      );
      let newNoteId = this.lastID;

      req.files.image.forEach((image) => {
        let imageBlob = new Blob([image.buffer], { type: "image/png" });
        imageBlob.arrayBuffer().then((imgArray) => {
          let imageBuffer = Buffer.from(imgArray);

          db.run(
            `INSERT INTO img(photo, note_id) VALUES(?, ?)`,
            [imageBuffer, newNoteId],
            function (err) {
              if (err) {
                return console.log(err.message);
              }
              // get the last insert id
              console.log(
                `A row has been inserted in img table with rowid ${this.change}`
              );
            }
          );
        });
      });
    }
  );

  res.sendStatus(200);
});

app.delete("/:id", (req, res) => {
  let noteId = req.params.id;
  console.log(noteId);

  db.run(`DELETE FROM notes WHERE id = ?`, [noteId], function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(
      `A row has been deleted in notes table with rowid ${this.lastID}`
    );
  });

  db.run(`DELETE FROM img WHERE note_id = ?`, [noteId], function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(
      `A row has been deleted in notes table with rowid ${this.lastID}`
    );
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Server Lisining on port ${port}`);
});
