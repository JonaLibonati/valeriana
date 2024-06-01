import { Router } from "express";
import { UserMiddelwares } from "../../middlewares/users.js";
import { TokenMiddleware } from "../../middlewares/token.js";
import { ContactPsychologistController } from "../../controllers/contacts.js";

export const contactsRouter = Router()

contactsRouter.post ('/psychologist', TokenMiddleware.validate, UserMiddelwares.isPatient, UserMiddelwares.isEmailValidated, ContactPsychologistController.create);
contactsRouter.delete ('/psychologist', TokenMiddleware.validate, UserMiddelwares.isPatient, UserMiddelwares.isEmailValidated, ContactPsychologistController.delete);
contactsRouter.get ('/psychologist/', TokenMiddleware.validate, UserMiddelwares.isPatient, UserMiddelwares.isEmailValidated, ContactPsychologistController.getContactList);