const express = require("express");
import { Request, Response } from "express";
import { User } from "../../entity/User";
const router = express.Router();
require("dotenv").config();

router.get("/api/user/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findBy({ id: req.params.id });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as getUserInfo };
