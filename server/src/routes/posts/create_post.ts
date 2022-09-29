const express = require("express");
import { Request, Response } from "express";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";

const router = express.Router();

router.post("/api/post/:id", async (req: Request, res: Response) => {
  try {
    const { description, image, feeling } = req.body;
    const postsId = req.params.id;

    const username = await User.findBy({ id: postsId });
    const name = await Promise.all(username.map((user) => user.first_name));
    const pricture = await Promise.all(username.map((user) => user.picture));

    const post = Post.create({
      description: description,
      postsId: postsId,
      image: image,
      username: String(name),
      userImg: String(pricture),
      feeling: feeling,
      likes: 0,
    });

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as createNewPost };
