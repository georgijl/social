const express = require("express");
import { Request, Response } from "express";
import { Comments } from "../../entity/Comments";

const router = express.Router();

router.delete("/api/comment/:id", async (req: Request, res: Response) => {
  try {
    const comment = await Comments.find({
      where: {
        id: req.params.id,
      },
    });
    const commentId = comment.map((c) => c.id).toString();
    await Comments.delete({ id: commentId });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as removeComment };
