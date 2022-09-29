const express = require("express");
import { Request, Response } from "express";
import { Post } from "../../entity/Post";

const router = express.Router();

router.delete("/api/post/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findBy({ id: req.params.id });
    const userId = await Promise.all(post.map((post) => post.postsId));

    if (String(userId) === req.body.postsId) Post.delete({ id: req.params.id });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as removePost };
