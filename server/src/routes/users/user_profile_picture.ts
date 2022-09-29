const express = require("express");
import { Request, Response } from "express";
import { User } from "../../entity/User";
const router = express.Router();
require("dotenv").config();

router.put("/api/user/profile/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findOneBy({ id: req.params.id });
    user.picture = req.body.fileName;

    user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as changeProfilePicture };
