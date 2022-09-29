const express = require("express");
import { Request, Response } from "express";
import { User } from "../../entity/User";
import { Follow } from "../../entity/Follow";
const router = express.Router();
require("dotenv").config();

router.post("/api/user/follow/:id", async (req: Request, res: Response) => {
  try {
    const userFollower = await User.findBy({ id: req.params.id });

    const follow = Follow.create({
      users: [...userFollower],
      userId: req.params.id,
      followedUserId: req.body.id,
    });

    follow.save();

    res.status(200).send({ follow });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post(
  "/api/profile/suggested/follow/:id",
  async (req: Request, res: Response) => {
    try {
      const userFollower = await User.findBy({ id: req.params.id });

      const follow = Follow.create({
        users: [...userFollower],
        userId: req.params.id,
        followedUserId: req.body.id,
      });

      follow.save();

      res.status(200).send({ follow });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export { router as followUser };
