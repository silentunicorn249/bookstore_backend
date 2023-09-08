import { Request, Response, Router } from "express";
import { JwtPayload } from "jsonwebtoken";

const user = Router();

user.get(
  "/",
  async (
    req: Request<{ user: string | JwtPayload }, {}, {}, {}>,
    res: Response
  ) => {
    
  }
);

export default user;
