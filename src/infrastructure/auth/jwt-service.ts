import ID from "../../domain/value-objects/id";
const jwt = require('jsonwebtoken');

export default class JwtService {
  public createToken(userId: ID): string {
    const tokenPayload = { userId: userId.getValue() };

    const tokenExpirationTime = process.env.JWT_EXPIRATION_TIME;

    const tokenString = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET_KEY, {
      expiresIn: tokenExpirationTime,
    });

    return tokenString;
  }

  public verifyTokenAndGetPayload(tokenString: string): {
    userId: string
  }{
    let tokenPayload: {
      userId: string
    };

    try {
      tokenPayload = jwt.verify(
        tokenString,
        process.env.JWT_SECRET_KEY
      );
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return tokenPayload;
  }
}