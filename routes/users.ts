import { Request, Response, Router } from "express";
import { authenticationGuard } from "../middleware/authenticationGuard";
import User from "../models/User";
import { JwtPayload } from "jsonwebtoken";
import { authorizationGuard } from "../middleware/authorizationGuard";

const users = Router();

users.get(
  "/",
  [authenticationGuard, authorizationGuard],
  async (
    req: Request<{ user: string | JwtPayload }, {}, {}, {}>,
    res: Response
  ) => {
    const users = await User.find();
    res.send(users);
  }
);

export default users;
