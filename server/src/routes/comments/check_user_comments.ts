const express = require("express");
import { Request, Response } from "express";
import { Comments } from "../../entity/Comments";

const router = express.Router();

router.get("/api/comment/:id/:userId", async (req: Request, res: Response) => {
  let isUsersComment = false;

  try {
    const comment = await Comments.find({
      where: {
        userId: req.params.userId,
        id: req.params.id,
      },
    });
    const commentId = comment.map((c) => c.id).toString();

    if (commentId) isUsersComment = true;

    res.status(200).send({ isUsersComment });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as checkUserComments };
