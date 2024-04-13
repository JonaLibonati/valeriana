import jwt from 'jsonwebtoken';

export class TokenMiddleware {
  static async validate(req, res, next) {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.cookies.token;
        const payload = jwt.verify(token, jwtSecretKey);
        console.log(payload)
        if (payload) {
            req.body.payload = payload;
            next()
        } else {
            // Access Denied
            res.status(498).json({code: 'ER_TOKEN_DENIED'});
        }
    } catch (error) {
        // Access Denied
        console.error(error)
        res.status(498).json({code: 'ER_TOKEN_DENIED'});
    }
  }
}
