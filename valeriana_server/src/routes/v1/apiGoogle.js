import { Router } from "express";
import { UserMiddelwares } from "../../middlewares/users.js";
import { TokenMiddleware } from "../../middlewares/token.js";
import { GoogleController } from "../../controllers/apiGoogle.js";

export const googleRouter = Router()

googleRouter.get ('/oauth', TokenMiddleware.validate, UserMiddelwares.isPatient, UserMiddelwares.isEmailValidated, GoogleController.oauth);
googleRouter.get ('/oauthcallback', TokenMiddleware.validate, UserMiddelwares.isPatient, UserMiddelwares.isEmailValidated, GoogleController.oauthCallback);

googleRouter.post ('/calendar', TokenMiddleware.validate, UserMiddelwares.isPatient, UserMiddelwares.isEmailValidated, GoogleController.createCalendar);
