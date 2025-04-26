import { Router } from "express";
import { UserMiddelwares } from "../../middlewares/users.js";
import { TokenMiddleware } from "../../middlewares/token.js";
import { GoogleController } from "../../controllers/apiGoogle.js";
import { GoogleMiddelwares } from "../../middlewares/apiGoogle.js";

export const googleRouter = Router()

googleRouter.get ('/oauth', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, GoogleController.oauth);
googleRouter.post ('/oauthcallback', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, GoogleController.oauthCallback);

/* googleRouter.get ('/tokens', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, GoogleController.getTokens); */
googleRouter.delete ('/tokens', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, GoogleMiddelwares.getTokens, GoogleController.revokeTokens);

googleRouter.get ('/calendar', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, GoogleMiddelwares.getTokens, GoogleMiddelwares.getCalendarId, GoogleController.getCalendar);
googleRouter.post ('/calendar', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, GoogleMiddelwares.getTokens, GoogleController.createCalendar);
googleRouter.delete ('/calendar', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, GoogleMiddelwares.getTokens, GoogleMiddelwares.getCalendarId, GoogleController.deleteCalendar);

googleRouter.get ('/calendar/isSync', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, GoogleController.getCalendarIsSync);
googleRouter.post ('/calendar/isSync', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, GoogleController.setCalendarIsSync);