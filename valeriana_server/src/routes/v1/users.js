import { Router } from "express";
import { UserController } from "../../controllers/users.js";
import { UserMiddelwares } from "../../middlewares/users.js";
import { TokenMiddleware } from "../../middlewares/token.js";

export const usersRouter = Router();

usersRouter.get ('/', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, UserController.getUser);

usersRouter.post ('/', UserMiddelwares.validateUserInput, UserMiddelwares.hashPassword, UserController.create);

usersRouter.delete ('/', UserController.deleteById)

usersRouter.get ('/self', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, UserController.getSelfUser)
usersRouter.patch ('/self/email', TokenMiddleware.validate, UserController.validateEmail)
usersRouter.patch ('/self/password', TokenMiddleware.validateOldPassword, UserMiddelwares.validatePasswordInput, UserMiddelwares.hashPassword, UserController.setSelfPassword)

usersRouter.post ('/login', UserMiddelwares.checkpassword, UserController.login)

usersRouter.get ('/logout', TokenMiddleware.validate, UserMiddelwares.isEmailValidated, UserController.logout)

usersRouter.get ('/send/VerificationEmail', TokenMiddleware.validate, UserController.sendVerificationEmail)

usersRouter.post ('/send/PasswordEmail', UserController.sendPasswordEmail)