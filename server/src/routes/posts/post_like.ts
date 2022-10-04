const express = require("express");
import { Request, Response } from "express";
import { Post } from "../../entity/Post";

const router = express.Router();

router.put("/api/post/like/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findOneBy({ id: req.params.id });
    post.likes = req.body.likes;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as postLike };
