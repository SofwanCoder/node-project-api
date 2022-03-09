import bcrypt from "bcrypt";
import { User } from "../models/User";
import ConflictException from "../exceptions/http/ConflictException";
import NotFoundException from "../exceptions/http/NotFoundException";
import { generateAuthorization } from "../helpers/auth.helper";
import { CreateTokenPayload } from "../types/authorization";
import Session from "../models/Session";
import { verifyToken } from "../helpers/token.helper";
import config from "../config";
import { RefreshedUser } from "../types/authorization";

export default class AuthService {
  public static async createToken(requestBody: CreateTokenPayload) {
    const { email, password } = requestBody;

    const where: Partial<User> = {
      email,
    };

    const user = await User.findOne({
      where,
    });

    if (!user) {
      throw new NotFoundException("Invalid Account");
    }

    const passwordCorrect = bcrypt.compareSync(password, user.password);
    if (!passwordCorrect) {
      throw new ConflictException("Invalid credentials");
    }

    const [access_token, refresh_token] = await generateAuthorization(user);

    return {
      token_type: "bearer",
      access_token,
      refresh_token,
      expires_in: 3600,
    };
  }

  public static async refreshToken(token: string) {
    const session = await Session.findOne({
      where: {
        refresh_token: token,
      },
    });

    if (!session) {
      throw new NotFoundException("Session not found");
    }

    verifyToken<RefreshedUser>(config.jwt.key, token);

    const user = await session.getUser();

    const [access_token, refresh_token] = await generateAuthorization(
      user,
      session
    );

    return {
      token_type: "bearer",
      access_token,
      refresh_token,
      expires_in: 3600,
    };
  }
}
