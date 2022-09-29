const express = require("express");
import { Request, Response } from "express";
import { User } from "../../entity/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

// Login in
router.post("/api/user/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOneBy({ email: email });

  if (!user) {
    res.status(401).send({ message: "Invalid email or password" });
    return;
  }

  const isSuccess = await bcrypt.compare(password, user.password);
  if (isSuccess) {
    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 6000,
    });

    res.status(200).send({ token });
  } else {
    return res.status(401).send({ message: "Invalid email or password" });
  }
});

export { router as userLogin };
