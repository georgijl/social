const express = require("express");
import { Request, Response } from "express";
import { User } from "../../entity/User";
import { Not } from "typeorm";
const router = express.Router();
require("dotenv").config();

router.post("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const users = await User.find({
      where: {
        id: Not(req.params.id),
      },
    });

    res.status(200).send({ users });
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as getAllUsers };
