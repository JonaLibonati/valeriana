import { Router } from "express";
import { UserMiddelwares } from "../../middlewares/users.js";
import { TokenMiddleware } from "../../middlewares/token.js";
import { MeetingController } from "../../controllers/meetings.js";

export const meetingsRouter = Router()

meetingsRouter.post ('/', TokenMiddleware.validate, UserMiddelwares.isPsychologist, UserMiddelwares.isEmailValidated, MeetingController.create);
meetingsRouter.delete ('/', TokenMiddleware.validate, UserMiddelwares.isPsychologist, UserMiddelwares.isEmailValidated, MeetingController.delete);
meetingsRouter.get ('/', TokenMiddleware.validate, UserMiddelwares.isPsychologist, UserMiddelwares.isEmailValidated, MeetingController.getContactList);
