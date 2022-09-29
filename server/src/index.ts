const express = require("express");
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { typeOrmConfig } from "./data-source";
import requests from "./imports";
const multer = require("multer");

const app = express();

app.use("/images", express.static("../social/src/images"));

// Upload files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../social/src/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post(
  "/api/upload",
  upload.single("file"),
  (req: Request, res: Response) => {
    try {
      return res.status(200).json("File uploaded successfully");
    } catch (error) {
      return res.status(401).send({ message: error });
    }
  }
);

createConnection(typeOrmConfig);
app.listen(8080, () => {
  console.log("Server is running on 8080");

  app.use(express.json());
  requests(app);
});

export default app;
