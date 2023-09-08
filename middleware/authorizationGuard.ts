import { NextFunction, Request, Response } from "express";

export const authorizationGuard = (
  req: Request<{ user: {_id: string, type: string} }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
    if(!(req.params.user.type === "Admin")) return res.status(403).send("Invalid role")
    next()
};
