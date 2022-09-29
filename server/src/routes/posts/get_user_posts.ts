const express = require("express");
import { Request, Response } from "express";
import { Post } from "../../entity/Post";

const router = express.Router();

router.get("/api/user/post/:id", async (req: Request, res: Response) => {
  try {
    const userPosts = await Post.findBy({ postsId: req.params.id });

    return res.status(200).json(userPosts);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as getOnlyUserPosts };
