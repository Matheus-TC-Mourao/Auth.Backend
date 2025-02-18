import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET variable is not defined in the environment!");
  }
  const JWT_SECRET = process.env.JWT_SECRET;

  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    res.status(401).json({ message: "Token not provided" });
    return;
  }

  const token = tokenHeader && tokenHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      statusCode: 401,
      message: "Invalid token",
    });
    return;
  }

   jwt.verify(token, JWT_SECRET, (error)=>{
    if (error) {
      return res.status(401).json({
        statusCode:401,
        message:"User unauthorized", error
      })
    }
   });

  next();
};