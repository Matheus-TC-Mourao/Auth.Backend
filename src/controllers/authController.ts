import { Request, Response } from "express";
import userSchema from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET variable is not defined in the environment!");
}
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req: Request, res: Response) => {
  userSchema
    .findOne({ email: req.body.email })
    .then((user) => {
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

      const token = jwt.sign(
        { name: user.name, email: user.email },
        JWT_SECRET,
        {
          expiresIn: 2 * 60,
        }
      );

      return res.status(200).json({
        statusCode: 200,
        message: "Login Successfully",
        data: { token },
      });
    })
    .catch((error: Error) => {
      console.error(error);
      res.status(500).json({ statuscode: 500, message: error.message });
    });
};

export { login };
