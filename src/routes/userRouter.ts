import express from "express";
import * as controller from "../controllers/userController";
import * as authController from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const routes = express.Router();

routes.get("/", controller.getAll);
routes.post("/login", authController.login);
routes.post("/register", controller.register);

routes.use(authMiddleware);

routes.get("/dashboard", controller.authenticatedRoute);

export default routes;
