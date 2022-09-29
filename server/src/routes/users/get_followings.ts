const express = require("express");
import { Request, Response } from "express";
import { User } from "../../entity/User";
import { Follow } from "../../entity/Follow";
const router = express.Router();
require("dotenv").config();

router.get("/api/user/followings/:id", async (req: Request, res: Response) => {
  try {
    const followRelation = await Follow.find({
      where: {
        userId: req.params.id,
      },
    });

    const followed = followRelation.map((user) => user.followedUserId);
    const followedUsers = await User.findByIds(followed);

    res.status(200).json(followedUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as getFollowingUsers };
