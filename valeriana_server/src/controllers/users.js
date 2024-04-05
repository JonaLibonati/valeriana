import { UserModel } from "../models/users.js";
import bcrypt from 'bcrypt';

export class UserController {
    static async create (req, res) {
        try {
            const newUser = await UserModel.create({ input: req.body });
            console.log(newUser)
            res.status(201).json(newUser);
        } catch (e) {
            console.log(e);
            res.status(400);
        }
        res.send()
    };

    static async deleteById (req, res) {
        try {
            await UserModel.deleteById({ input : req.body })
        } catch (e) {
            console.log(e);
            res.status(400);
        }
        res.send()
    };

    static async login (req, res) {
        try {
            const user = await UserModel.login({ input : req.body })
            if (req.body.user_checked) {
                res.status(200).json(user);
            } else res.status(401);
        } catch (e) {
            console.log(e);
            res.status(400);
        }
        res.send()
    };
}