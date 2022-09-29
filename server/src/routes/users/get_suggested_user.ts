const express = require("express");
import { Request, Response } from "express";
import { User } from "../../entity/User";
const router = express.Router();
require("dotenv").config();

router.post("/api/suggested", async (req: Request, res: Response) => {
  try {
    const { users } = req.body;

    const allUsers = users.map((u: { id: string }) => u.id);

    if (allUsers.length === 0) {
      const user = await User.find();

      return res.status(200).send({ users: user });
    } else {
      const allNotFollowedUsers = await User.createQueryBuilder("users")
        .select(["users"])
        .where("users.id NOT IN (:...id)", { id: allUsers })
        .getMany();

      return res.status(200).send({ users: allNotFollowedUsers });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

export { router as getSuggestedUser };
