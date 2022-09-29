const express = require("express");
import { Request, Response } from "express";
import { Follow } from "../../entity/Follow";
const router = express.Router();
require("dotenv").config();

router.post(
  "/api/profile/unfollow/:id",
  async (req: Request, res: Response) => {
    try {
      const unfollow = await Follow.delete({
        userId: req.params.id,
        followedUserId: req.body.followedUser,
      });

      res.status(200).send({ unfollow });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export { router as unfollowUser };
