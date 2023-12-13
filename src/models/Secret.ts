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
  type InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
} from "@sequelize/core";

import { User } from "./User";
import { ulid } from "ulid";

export type ISecretAttributes = InferAttributes<Secret>;

export type ISecretCreationAttributes = InferCreationAttributes<Secret>;

@Table({ tableName: "secret" })
export default class Secret extends Model<
  ISecretAttributes,
  ISecretCreationAttributes
> {
  @PrimaryKey
  @Attribute(DataTypes.UUID)
  @Default(ulid)
  public id!: CreationOptional<string>;

  @Attribute(DataTypes.UUID)
  public user_id!: number;

  @Attribute(DataTypes.UUID)
  public token!: string;

  @CreatedAt
  @Attribute(DataTypes.DATE)
  public created_at!: CreationOptional<Date>;

  @UpdatedAt
  @Attribute(DataTypes.DATE)
  public updated_at!: CreationOptional<Date>;

  @BelongsTo(() => User, "user_id")
  public user!: User;

  public getUser!: BelongsToGetAssociationMixin<User>;

  public toJSON(): Record<string, unknown> {
    const { id, user_id, token, created_at, updated_at, user } = this;
    return {
      id,
      user_id,
      token,
      created_at,
      updated_at,
      user,
    };
  }
}
