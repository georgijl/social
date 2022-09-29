const express = require("express");
import { Request, Response } from "express";
import { User } from "../../entity/User";
import { Comments } from "../../entity/Comments";

const router = express.Router();

router.post("/api/comment/:id", async (req: Request, res: Response) => {
  try {
    const { userId, description } = req.body;

    const postId = req.params.id;
    const user = await User.findBy({ id: userId });

    const name = await Promise.all(user.map((user) => user.first_name));
    const userPicture = await Promise.all(user.map((user) => user.picture));

    const comment = Comments.create({
      user_picture: String(userPicture),
      user_name: String(name),
      comment: description,
      ofPostsId: postId,
      userId: userId,
    });

    await comment.save();
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as createNewComment };
