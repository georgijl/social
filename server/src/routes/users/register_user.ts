const express = require("express");
import { Request, Response } from "express";
import { User } from "../../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
const router = express.Router();
require("dotenv").config();

router.post("/api/user/register", async (req: Request, res: Response) => {
  const { userName, firstName, lastName, email, picture, password, cover } =
    req.body;

  const isUsernameTaken = await User.findOneBy({ username: userName });
  const isEmailTaken = await User.findOneBy({ email: email });

  if (isEmailTaken) {
    res.status(401).send({ message: `This email ${email} is already taken` });
    return;
  }

  if (isUsernameTaken) {
    res
      .status(401)
      .send({ message: `This username ${userName} is already taken` });
    return;
  }

  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = User.create({
      username: userName,
      first_name: firstName,
      password: hashedPassword,
      last_name: lastName,
      picture: picture,
      email: email,
      cover_photo: cover,
    });

    await user.save();

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 3000,
    });

    res.status(200).send({ token });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as registerUser };
