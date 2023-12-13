import {
  Attribute,
  PrimaryKey,
  UpdatedAt,
  Table,
  CreatedAt,
  Default,
  BelongsTo,
} from "@sequelize/core/decorators-legacy";
import {
  DataTypes,
  Model,
  type InferAttributes,
  type BelongsToGetAssociationMixin,
} from "@sequelize/core";

import { User } from "./User";
import { ulid } from "ulid";
import { generateRandomNumber, generateRandomString } from "../utils/random";

export type IResetAttributes = InferAttributes<Verifier>;

export type IResetCreationAttributes = Partial<IResetAttributes>;

@Table({ tableName: "verifier" })
export default class Verifier extends Model<
  IResetAttributes,
  IResetCreationAttributes
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING)
  @Default(ulid)
  declare id: string;

  @Attribute(DataTypes.STRING)
  declare user_id: string;

  @Attribute(DataTypes.ENUM(["reset", "verify", "auth"]))
  @Default("verify")
  declare source: string;

  @Attribute(DataTypes.STRING)
  @Default(() => generateRandomNumber(6).toString())
  declare code: string;

  @Attribute(DataTypes.STRING)
  @Default(generateRandomString)
  declare token: string;

  @CreatedAt
  @Attribute(DataTypes.DATE)
  declare created_at: Date;

  @UpdatedAt
  @Attribute(DataTypes.DATE)
  declare updated_at: Date;

  @BelongsTo(() => User, "user_id")
  declare user: User;

  declare getUser: BelongsToGetAssociationMixin<User>;

  public toJSON() {
    const { id, user_id, source, created_at, updated_at } = this;
    return {
      id,
      user_id,
      source,
      created_at,
      updated_at,
    };
  }
}
