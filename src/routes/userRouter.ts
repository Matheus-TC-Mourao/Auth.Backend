import express from "express";
import * as controller from "../controllers/userController";
import * as authController from "../controllers/authController";

const routes = express.Router();

routes.get("/", controller.getAll);
routes.post("/login", authController.login);
routes.post("/register", controller.register);

export default routes;
