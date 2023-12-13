import { User } from "../models/User";
import { generateAuthorization } from "../helpers/auth.helper";
import {
  type CreateUserPayload,
  type IUserCreationAttributes,
} from "../types/user";
import { sequelize } from "../sequelize";
import NotFoundException from "../exceptions/http/NotFoundException";

export default class UserService {
  public static async createNewUser(requestBody: CreateUserPayload) {
    const { email, password, firstname, lastname } = requestBody;

    const newUser: IUserCreationAttributes = {
      firstname,
      lastname,
      email,
      password,
    };

    const { access_token, refresh_token } = await sequelize.transaction(
      async () => {
        const user = await User.create(newUser);

        return await generateAuthorization(user);
      },
    );

    return {
      token_type: "bearer",
      access_token,
      refresh_token,
      expires_in: 3600,
    };
  }

  public static async fetchUser(id: string) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }
}
