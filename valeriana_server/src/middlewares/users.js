import bcrypt from 'bcrypt';
import { UserModel } from '../models/users.js';

export class UserMiddelwares {

    static async checkpassword (req, res, next) {

        try {
            const user = await UserModel.getPassword({ input : req.body });
            req.body.user_checked  = await bcrypt.compare( req.body.user_password , user.user_password);

        } catch {
            console.error
        } finally {
            next()
        }
    }

    static async hashPassword (req, res, next) {
        const saltRounds = 10;

        console.log(req.body.user_password)

        try {
            const hash = await bcrypt.hash(req.body.user_password, saltRounds);
            req.body.user_password = hash;
        } catch {
            console.error
        } finally {
            next()
        }
    }
}




