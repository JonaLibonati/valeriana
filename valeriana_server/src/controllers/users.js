import { UserModel } from "../models/users.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export class UserController {
  static async create(req, res) {
    try {
      const newUser = await UserModel.create({ input: req.body });
      res.status(201).json(newUser);
    } catch (e) {
      console.error(e);
      if (e.code === "ER_DUP_ENTRY") {
        if (e.sqlMessage.includes("users.email_address") === true)
          res.status(400).json({ code: "ER_DUP_ENTRY_EMAIL" });
        else if (e.sqlMessage.includes("users.user_name") === true)
          res.status(400).json({ code: "ER_DUP_ENTRY_USER_NAME" });
        else res.status(400).json({ code: "ER_DUP_ENTRY" });
      } else res.status(400);
    }
    res.send();
  }

  static async deleteById(req, res) {
    try {
      await UserModel.deleteById({ input: req.body });
    } catch (e) {
      console.error(e);
      res.status(400);
    }
    res.send();
  }

  static async login(req, res) {
    try {
      const pp = req.cookies;
      console.log(pp);
      const payload = await UserModel.login({ input: req.body });
      const secretKey = process.env.JWT_SECRET_KEY;
      const expiration = "24h"; // Token will expire in 1 hour
      const token = jwt.sign(payload, secretKey, { expiresIn: expiration });
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .json({ message: "login successfully" });
    } catch (e) {
      console.error(e);
      res.status(400);
    }
    res.send();
  }

  static async logout(req, res) {
    try {
      res
        .status(200)
        .cookie("token", "", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .json({ message: "logout successfully" });
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserModel.getUser({ input: req.body });
      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }

  static async getSelfUser(req, res) {
    try {
      const user = await UserModel.getUser({ input: req.body.payload });
      console.log(user);
      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }

  static async setSelfPassword(req, res) {
    try {
      const user = await UserModel.getPassword({ input: req.body.payload });

      if (user.user_password === req.body.payload.user_password) {
        await UserModel.setPassword({
          input: {
            user_password: req.body.user_password,
            email_address: req.body.payload.email_address,
          },
        });
        res
          .status(200)
          .cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
          .json({ message: "Password was updated successfully" });
      } else {
        res.status(401).json({ code: "ER_WRONG_LOG" });
      }
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }

  static async sendVerificationEmail(req, res) {
    const html = `
        <h1>Valeriana</h1>
        <h1>Correo de autentificación</h1>
        <p>Haz clink en el siguiente link para autentificarte</p>
        <a href = 'http://localhost:5173/app/validate/${req.body.payload.user_id}' >http://localhost:5173/app/validate/${req.body.payload.user_id}</a>
        <p>Si no creaste un usuario nuevo con Valeriana por favor ignora este mail.</p>
    `;

    try {
      const user = await UserModel.getEmail({ input: req.body.payload });
      console.log(user);
      if (user.email_isValidated !== 1) {
        const emailRes = await sendEmail({
          html: html,
          subject: "Correo de autentificación",
          to: "libonati.jonathan@gmail.com",
        });
        if (emailRes.isSent) {
          res
            .status(200)
            .json({ ...user, message: "Email send" })
            .send();
        } else {
          res.status(400).json({ code: "ER_EMAIL_NO_SEND" }).send();
        }
      } else {
        res.status(400).json({ code: "ER_EMAIL_ALREADY_VALID" }).send();
      }
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }

  static async sendPasswordEmail(req, res) {
    const html = (token) => `
        <h1>Valeriana</h1>
        <h1>Recupera tu contraseña</h1>
        <p>Haz click en el siguiente link recuperar tu contraseña</p>
        <a href = 'http://localhost:5173/app/password/${token}' >http://localhost:5173/app/password/${token}</a>
        <p>Si no creaste un usuario nuevo con Valeriana por favor ignora este mail.</p>
    `;

    try {
      console.log(req.body);
      const payload = await UserModel.getPassword({ input: req.body });
      if (!payload) {
        res.status(401).json({ code: "ER_WRONG_LOG" }).send();
      } else {
        const secretKey = process.env.JWT_SECRET_KEY;
        const expiration = "1h"; // Token will expire in 1 hour
        const token = jwt.sign({ ...payload, ...req.body }, secretKey, {
          expiresIn: expiration,
        });
        const emailRes = await sendEmail({
          html: html(token),
          subject: "Correo de recuperación de contraseña",
          to: "libonati.jonathan@gmail.com",
        });
        if (emailRes.isSent) {
          res.status(200).json({ message: "Email send" }).send();
        } else {
          res.status(400).json({ code: "ER_EMAIL_NO_SEND" }).send();
        }
      }
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  }

  static async setUserName(req, res) {
    try {
      const input = {
        user_name: req.body.user_name,
        user_id: req.body.payload.user_id,
      };
      const user = await UserModel.setUserName({ input });
      console.log(user);
      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(400);
    }
    res.send();
  }

  static async setFirstName(req, res) {
    try {
      const input = {
        first_name: req.body.first_name,
        user_id: req.body.payload.user_id,
      };
      const user = await UserModel.setFirstName({ input });
      console.log(user);
      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(400);
    }
    res.send();
  }

  static async setLastName(req, res) {
    try {
      const input = {
        last_name: req.body.last_name,
        user_id: req.body.payload.user_id,
      };
      const user = await UserModel.setLastName({ input });
      console.log(user);
      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(400);
    }
    res.send();
  }

  static async setEmail(req, res) {
    try {
      const input = {
        email_address: req.body.email_address,
        user_id: req.body.payload.user_id,
      };
      const user = await UserModel.setEmail({ input });
      console.log(user);
      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(400);
    }
    res.send();
  }

  static async validateEmail(req, res) {
    try {
      console.log(req.body);
      if (req.body.payload.user_id === req.body.user_id) {
        const user = await UserModel.validateEmail({ input: req.body });
        console.log(user);
        res.status(200).json(user);
      } else {
        res.status(498).json({ code: "ER_TOKEN_DENIED" });
      }
    } catch (e) {
      console.error(e);
      res.status(400);
    }
    res.send();
  }
}

const sendEmail = async ({ html, subject, to }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_NO_REPLAY,
      pass: process.env.EMAIL_NO_REPLAY_KEY,
    },
  });

  let mailOptions = {
    from: "libonati.jonathan@gmail",
    to: to,
    subject: `Valeriana - ${subject}`,
    html: html,
  };

  try {
    const emailRes = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + emailRes.response);
    return { ...emailRes, isSent: true };
  } catch (e) {
    console.error(e);
    return { ...e, isSent: false };
  }
};
