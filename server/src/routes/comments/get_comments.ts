const express = require("express");
import { Request, Response } from "express";
import { Comments } from "../../entity/Comments";

const router = express.Router();

router.get("/api/comment/:id", async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const comments = await Comments.findBy({ ofPostsId: postId });

    return res
      .status(200)
      .json({ commentsContent: comments, commentsCount: comments.length });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as getComments };
