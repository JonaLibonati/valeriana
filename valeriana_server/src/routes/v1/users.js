import { Router } from "express";
import { UserController } from "../../controllers/users.js";
import { UserMiddelwares } from "../../middlewares/users.js";

export const usersRouter = Router();

usersRouter.post ('/', UserMiddelwares.hashPassword, UserController.create);

usersRouter.delete ('/', UserController.deleteById)

usersRouter.post ('/login', UserMiddelwares.checkpassword, UserController.login)