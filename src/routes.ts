import { Router } from "express";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

routes.post("/users", UsersController.create);

export { routes };
