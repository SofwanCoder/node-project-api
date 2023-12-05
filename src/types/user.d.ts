import { CreationAttributes } from "@sequelize/core";
import { User } from "../models/User";

export interface CreateUserPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: import("../enums/base").Gender;
  password: string;
}

export type IUserCreationAttributes = CreationAttributes<User>;
