import bcrypt from "bcrypt";
import { UserModel } from "../models/users.js";
import { validateNewPassword, validateUser } from "../schemes/userSchema.js";

export class UserMiddelwares {
  static async checkpassword(req, res, next) {
    try {
      const user = await UserModel.getPassword({ input: req.body });
      if (!user) res.status(401).json({ code: "ER_WRONG_LOG" }).end();
      else {
        const user_checked = await bcrypt.compare(
          req.body.user_password,
          user.user_password
        );
        if (!user_checked) res.status(401).json({ code: "ER_WRONG_LOG" }).end();
        else next();
      }
    } catch {
      console.error;
      res.status(401).json({ code: "ER_WRONG_LOG" }).end();
    }
  }

  static async hashPassword(req, res, next) {
    const saltRounds = 10;

    console.log(req.body.user_password);

    try {
      const hash = await bcrypt.hash(req.body.user_password, saltRounds);
      req.body.user_password = hash;
      next();
    } catch {
      console.error;
    }
  }

  static async isEmailValidated(req, res, next) {
    try {
      const user = await UserModel.isEmailValidated({
        input: req.body.payload,
      });
      console.log(user);
      if (user.email_isValidated) {
        next();
      } else {
        res.status(401).json({ code: "ER_EMAIL_NO_VALIDATED" });
      }
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }

  static async validateUserInput(req, res, next) {
    try {
      const user = await validateUser(req.body);

      if (user.success) {
        req.body.first_name = req.body.first_name
          .trimStart()
          .trimEnd()
          .replaceAll(/\s+/g, " ");
        req.body.last_name = req.body.last_name
          .trimStart()
          .trimEnd()
          .replaceAll(/\s+/g, " ");
        req.body.email_address = req.body.email_address.trimStart().trimEnd();
        next();
      } else {
        res.status(400).json({ code: "ER_ZOD_VALIDATION" });
        console.error(user.error);
      }
    } catch {
      console.error;
    }
  }

  static async validatePasswordInput(req, res, next) {
    try {
      const user = await validateNewPassword(req.body);

      if (user.success) {
        next();
      } else {
        res.status(400).json({ code: "ER_ZOD_VALIDATION" });
        console.error(user.error);
      }
    } catch {
      console.error;
    }
  }
}
