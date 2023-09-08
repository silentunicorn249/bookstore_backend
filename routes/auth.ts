import { Request, Response, Router } from "express";
import User from "../models/User";
import { compare, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

const auth = Router();


auth.post("/signin", async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({username: username})
    if (!user) return res.status(400).send("Invalid username")

    const valid = await compare(password, user.hashedPass)
    if (!valid) return res.status(400).send("Invalid pass")

    const token = sign({_id: user._id}, "key")
    res.header("x-auth-token", token).send(true)

});
auth.post("/signup", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  const salt = await genSalt(10);
  const hashedPass = await hash(password, salt);

  const user = new User({ username, hashedPass });
  const result = await user.save();
  res.send(result);
});

export default auth;
