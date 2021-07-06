import crypto from "crypto";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { StatusCodes } from "http-status-codes";
import { jwtHelper } from "../helpers/jwt.helper";
import { User, UserCreationAttributes } from "../models/User";
import {
  generateMessage,
  generateErrorMessage,
} from "../shared/utils/responseManager";
import { Profile } from "../models/Profile";
import NotFoundException from "../shared/exceptions/http/NotFoundException";
import ConflictException from "../shared/exceptions/http/ConflictException";

class UserService {

  public static async createNewUser(requestBody: any) {
    const { email, name, phone, password } = requestBody;

    let username = requestBody.username;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: {
          email,
          username,
        },
      },
    });

    if (existingUser) {
      return generateErrorMessage(
        "User email/username already exists",
        StatusCodes.BAD_REQUEST
      );
    }

    if (!username) {
      username = crypto.randomBytes(20).toString("hex");
    }

    const newUser: UserCreationAttributes = {
      clearance: 1,
      email,
      password,
      username,
      name,
      Profile: {
        name,
        phone: phone || "",
      }
    };
    const user = await User.create(newUser, {
      include: [
        {
          model: Profile,
        },
      ],
    });

    const userToken = jwtHelper.generateUserToken(user.id, 0);

    const data = {
      token: userToken,
      user,
    }

    return generateMessage(
      "Created user successfully",
      StatusCodes.CREATED,
      data
    );
  }

  public static async loginUser(requestBody: any) {
    const { email, password } = requestBody;

    const where: Partial<User> = {
      email,
    };

    const existingUser = await User.findOne({
      where,
      include: Profile,
    });

    if (!existingUser) {
      throw new NotFoundException("Invalid Account");
    }

    const passwordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!passwordCorrect) {
      throw new ConflictException("Invalid credentials");
    }

    if (!existingUser.is_verified) {
      throw new NotFoundException(
        "Your account is Unverified, kindly login to your email and click the verify link"
      );
    }

    let userToken;
    try {
      userToken = jwtHelper.generateUserToken(
        existingUser.id,
        existingUser.clearance
      );
    } catch (e) {
      return generateErrorMessage(
        "Unable to complete login",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    const data = {
      token: userToken,
      user: existingUser,
    };
    return generateMessage("User logged in successfully", StatusCodes.OK, data);
  }

}

export default UserService;
