import jwt from 'jsonwebtoken';

export class TokenMiddleware {

  static async validate(req, res, next) {

    console.log('validating token')

    const token = validateToken(req.cookies.token);

    if (token.isValid) {
      req.body.payload = token.payload;
      next()
    } else {
      // Access Denied
      res.status(498).json({ code: token.code });
    }
  }

  static async validateOldPassword(req, res, next) {
    const token = validateToken(req.body.token);

    if (token.isValid) {
      req.body.payload = token.payload;
      next()
    } else {
      // Access Denied
      res.status(498).json({ code: token.code });
    }
  }
}

const validateToken = (token) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const payload = jwt.verify(token, jwtSecretKey);
    console.log(payload)
    if (payload) {
      return { isValid: true, payload: payload }
    } else {
      // Access Denied
      return { isValid: false, code: 'ER_TOKEN_DENIED' }
    }
  } catch (error) {
    // Access Denied
    console.error(error)
    return { isValid: false, code: 'ER_TOKEN_DENIED' }
  }
}
