import { NextFunction, Request, Response } from "express";
import userSchema, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET!;

const login = (req: Request, res: Response) => {
  try {
    userSchema.findOne(
      { email: req.body.email },
      (error: Error, user: IUser) => {
        if (!user) {
          return res.status(401).json({
            statusCode: 401,
            message: "User not found",
            data: { email: req.body.email },
          });
        }

        const validatePassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!validatePassword) {
          return res
            .status(401)
            .json({ statusCode: 401, message: "User unauthorized" });
        }

        const token = jwt.sign({ name: user.name, email: user.email }, SECRET, {
          expiresIn: 2 * 60,
        });

        return res.status(200).json({
          statusCode: 200,
          message: "Login Successfully",
          data: { token },
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscode: 500, message: error });
  }
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader = req.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: "User unauthorized",
    });
  }

  try {
    jwt.verify(token, SECRET);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Invalid token",
    });
  }
};

export { login, verifyToken };
