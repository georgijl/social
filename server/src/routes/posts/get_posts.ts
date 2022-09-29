const express = require("express");
import { Request, Response } from "express";
import { Post } from "../../entity/Post";
import { Follow } from "../../entity/Follow";

const router = express.Router();

router.get("/api/post/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userPosts = await Post.findBy({ postsId: userId });
    const followRelation = await Follow.find({
      where: {
        userId: req.params.id,
      },
    });

    const followed = followRelation.map((user) => user.followedUserId);
    const followedUsers = await Promise.all(
      followed.map((post) =>
        Post.find({
          where: {
            postsId: post,
          },
        })
      )
    );
    if (followedUsers) {
      return res.status(200).json(userPosts.concat(...followedUsers));
    } else {
      return res.status(200).json(userPosts);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as getUserPosts };
