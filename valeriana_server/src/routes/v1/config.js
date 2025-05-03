import { Router } from "express";
import { UserMiddelwares } from "../../middlewares/users.js";
import { TokenMiddleware } from "../../middlewares/token.js";
import { ConfigController } from "../../controllers/config.js";

export const configRouter = Router();

configRouter.get ('/', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, ConfigController.getConfig);

configRouter.patch('/general/lang', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, ConfigController.setGeneralLang);
configRouter.patch('/general/theme', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, ConfigController.setGeneralTheme);
configRouter.patch('/calendar/locale', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, ConfigController.setCalendarLocale);
configRouter.patch('/calendar/timeZone', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, ConfigController.setCalendarTimeZone);
configRouter.patch('/calendar/timeZoneList', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, ConfigController.setCalendarTimeZonesList);