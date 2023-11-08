import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from "multer";
var upload = multer();

const port = 4000;
const app = express();

// field names of the input's
const cpUpload = upload.fields([
  { name: "image" },
  { name: "audio", maxCount: 1 },
]);

app.post("/", cpUpload, (req, res) => {
  console.log(req.files, req.body);
  res.send();
});

app.listen(port, () => {
  console.log(`Server Lisining on port ${port}`);
});
