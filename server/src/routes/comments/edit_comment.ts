const express = require("express");
import { Request, Response } from "express";
import { Comments } from "../../entity/Comments";

const router = express.Router();

// edit comment
router.put("/api/comment/:id", async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const comment = await Comments.findOneBy({
      id: req.params.id,
    });

    comment.comment = description;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as editComment };
