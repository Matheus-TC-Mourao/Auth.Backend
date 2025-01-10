import { Request, Response } from "express";
import userSchema, { IUser } from "../models/User";
import bcrypt from "bcrypt";

const getAll = async (req: Request, res: Response) => {
  userSchema.find((err: Error, users: IUser[]) => {
    if (err) {
      res.status(500).json({
        statusCode: 500,
        message: err.message,
      });
    }
    res.status(200).json({
      statusCode: 200,
      data: { users },
    });
  });
};

const register = async (req: Request, res: Response) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  try {
    console.log(req.body);

    const newUser = new userSchema(req.body);
    const savedUser = await newUser.save();

    res.status(201).json({
      statusCode: 201,
      message: "User created successfully",
      data: { savedUser },
    });
  } catch (error) {
    res.status(500).json({ statuscode: 500, message: error });
  }
};

const authenticatedRoute = (req: Request, res: Response) => {
  res.status(200).json({
    statusCode: 200,
    message: "Route authenticated",
  });
};

export { getAll, register, authenticatedRoute };
