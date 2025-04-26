import { Router } from "express";
import { UserMiddelwares } from "../../middlewares/users.js";
import { TokenMiddleware } from "../../middlewares/token.js";
import { ConfigController } from "../../controllers/config.js";

export const configRouter = Router();

configRouter.get ('/', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, ConfigController.getConfig);
