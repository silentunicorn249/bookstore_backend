import { Request, Response, Router } from "express";
import User from "../models/User";
import { compare, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

const auth = Router();

auth.post("/signin", async (req: Request, res: Response) => {
  console.log("Got requesst with body", req.body);
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username: username }).select("-__v");
  if (!user) return res.status(400).send("Invalid username");

  const valid = await compare(password, user.hashedPass);
  if (!valid) return res.status(400).send("Invalid pass");

  const token = sign({ _id: user._id, type: user.type }, "key");
  const tempObj = user.toObject();
  delete tempObj._id;
  delete tempObj.hashedPass;
  console.log("Sending", tempObj);
  tempObj["token"] = token
  res.header("x-auth-token", token).send(tempObj);
});
auth.post("/signup", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;

  const isExists = await User.findOne({ username: username });
  if (isExists) return res.status(401).send("Username already exists");

  const salt = await genSalt(10);
  const hashedPass = await hash(password, salt);

  const user = new User({ username, hashedPass, type });
  const result = await user.save();
  res.send(result);
});

export default auth;
