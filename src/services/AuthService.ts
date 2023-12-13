import bcrypt from "bcrypt";
import { User } from "../models/User";
import ConflictException from "../exceptions/http/ConflictException";
import NotFoundException from "../exceptions/http/NotFoundException";
import { generateAuthorization } from "../helpers/auth.helper";
import Session from "../models/Session";
import { verifyToken } from "../helpers/token.helper";
import config from "../config";
import {
  CreateTokenPayload,
  DoEmailVerificationPayload,
  RefreshedUser,
} from "../types/authorization";
import { sendEmailMessage } from "../helpers/email.helper";
import { verifyUserTemplate } from "../emails/auth.email";
import Verifier from "../models/Verifier";
import BadRequestException from "../exceptions/http/BadRequestException";

export default class AuthService {
  public static async createSession(requestBody: CreateTokenPayload) {
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

    const { access_token, refresh_token } = await generateAuthorization(user);

    return {
      token_type: "bearer",
      access_token,
      refresh_token,
      expires_in: 3600,
    };
  }

  public static async refreshToken(session_id: string) {
    const session = await Session.findOne({
      where: {
        id: session_id,
      },
    });

    if (!session) {
      throw new NotFoundException("Session not found");
    }

    verifyToken<RefreshedUser>(config.jwt.key, "");

    const user = await session.getUser();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { access_token, refresh_token } = await generateAuthorization(
      user,
      session,
    );

    return {
      token_type: "bearer",
      access_token,
      refresh_token,
      expires_in: 3600,
    };
  }

  public static async logout(session_id: string) {
    const session = await Session.findOne({
      where: {
        id: session_id,
      },
    });

    if (!session) {
      throw new NotFoundException("Session not found");
    }

    await session.destroy();
  }

  public static async sendVerificationEmail(user_id: string) {
    const user = await User.findByPk(user_id);

    if (!user) {
      throw new NotFoundException("Profile not found");
    }

    if (user.is_verified) {
      throw new ConflictException("Account is already verified");
    }

    const verifier = await user.createVerifier({});

    await sendEmailMessage(
      verifyUserTemplate(user, verifier),
      "Verify your email",
      user.email,
    );

    return verifier;
  }

  public static async doEmailVerification(
    user_id: string,
    payload: DoEmailVerificationPayload,
  ) {
    const { id, code } = payload;

    const user = await User.findByPk(user_id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.is_verified) {
      throw new ConflictException("User already verified");
    }

    const verifier = await Verifier.findByPk(id);

    if (!verifier) {
      throw new NotFoundException("Invalid Request! Please request a new OTP");
    }

    if (verifier.code !== code) {
      throw new BadRequestException("Invalid OTP");
    }

    await user.update({
      is_verified: true,
    });

    await verifier.destroy();

    return verifier;
  }
}
