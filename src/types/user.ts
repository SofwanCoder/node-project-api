import { type CreationAttributes } from "@sequelize/core";
import { type User } from "../models/User";

export interface CreateUserPayload {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
}

export type IUserCreationAttributes = CreationAttributes<User>;
