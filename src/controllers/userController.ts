import { Request, Response } from "express";
import userSchema, { IUser } from "../models/User";
import bcrypt from "bcrypt";

const getAll = async (req: Request, res: Response) => {
  userSchema
    .find()
    .then((users: IUser[]) => {
      res.status(200).json({
        statusCode: 200,
        data: { users },
      });
    })
    .catch((err: Error) => {
      res.status(500).json({
        statusCode: 500,
        message: err.message,
      });
    });
};

const register = async (req: Request, res: Response) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  console.log(req.body);

  const newUser = new userSchema(req.body);

  if (!newUser) {
    res.status(500).json({
      statusCode: 500,
      message: "New user could not be created",
    });
  }

  newUser
    .save()
    .then((savedUser) => {
      res.status(201).json({
        statusCode: 201,
        message: "User created successfully",
        data: { savedUser },
      });
    })
    .catch((error) => {
      res.status(500).json({ statuscode: 500, message: error });
    });
};

const authenticatedRoute = (req: Request, res: Response) => {
  res.status(200).json({
    statusCode: 200,
    message: "Route authenticated",
  });
};

export { getAll, register, authenticatedRoute };
