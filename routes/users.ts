import { Request, Response, Router } from "express";
import { authorizationGuard } from "../middleware/authorizationGuard";
import User from "../models/User";
import { JwtPayload } from "jsonwebtoken";

const users = Router();

users.get(
  "/",
  [authorizationGuard],
  async (
    req: Request<{ user: string | JwtPayload }, {}, {}, {}>,
    res: Response
  ) => {
    const users = await User.find();
    res.send(users);
  }
);

export default users;
