import crypto from "crypto";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { User, UserCreationAttributes } from "../models/User";
import { Profile } from "../models/Profile";
import ConflictException from "../exceptions/http/ConflictException";
import NotFoundException from "../exceptions/http/NotFoundException";
import { generateAuthorization } from "../helpers/user.helper";

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
      throw new ConflictException("User with email/username already exist");
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
      },
    };
    const user = await User.create(newUser, {
      include: [
        {
          model: Profile,
        },
      ],
    });

    const [auth_token, refresh_token] = await generateAuthorization(user);

    return { auth_token, refresh_token, user };
  }

  public static async loginUser(requestBody: any) {
    const { email, password } = requestBody;

    const where: Partial<User> = {
      email,
    };

    const user = await User.findOne({
      where,
      include: Profile,
    });

    if (!user) {
      throw new NotFoundException("Invalid Account");
    }

    const passwordCorrect = bcrypt.compareSync(password, user.password);
    if (!passwordCorrect) {
      throw new ConflictException("Invalid credentials");
    }

    if (!user.is_verified) {
      throw new NotFoundException(
        "Your account is Unverified, kindly login to your email and click the verify link"
      );
    }

    const [auth_token, refresh_token] = await generateAuthorization(user);

    return { auth_token, refresh_token, user };
  }
}

export default UserService;
