import jwt from 'jsonwebtoken';

export class JWT {
  private static sign(payload: any, secret: string, options: any): Promise<string> {
    return new Promise((resolve, _reject) => {
      const signOptions = {
        algorithm: 'HS256',
        expiresIn: '1h',
        ...options,
      };
      const sign = jwt.sign(payload, secret, signOptions);
      resolve(sign);
    });
  }

  private static verify(token: string, secret: string) {
    return new Promise((resolve, _reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          resolve(false);
        }
        resolve(decoded);
      });
    });
  }

  public static async generateToken(payload: any): Promise<string> {
    const secret = process.env.JWT_SECRET as string;
    const token = await JWT.sign(payload, secret, {});
    return token as string;
  }

  public static async verifyToken(token: string) {
    const secret = process.env.JWT_SECRET as string;
    const decoded = await JWT.verify(token, secret);
    return decoded;
  }
}
