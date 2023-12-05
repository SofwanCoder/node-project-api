import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull,
  HasMany,
  UpdatedAt,
  Table,
  CreatedAt,
  Default,
  BelongsTo,
} from "@sequelize/core/decorators-legacy";
import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
} from "@sequelize/core";

import { User } from "./User";

export type ISessionAttributes = InferAttributes<Session>;

export type ISessionCreationAttributes = InferCreationAttributes<Session>;

@Table({ tableName: "session" })
export default class Session extends Model<
  ISessionAttributes,
  ISessionCreationAttributes
> {
  @PrimaryKey
  @Attribute(DataTypes.UUID)
  public id!: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  public user_id!: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  public refresh_token!: string;

  @Attribute(DataTypes.STRING)
  public user_agent!: CreationOptional<string>;

  @CreatedAt
  @Attribute(DataTypes.DATE)
  public created_at!: CreationOptional<Date>;

  @UpdatedAt
  @Attribute(DataTypes.DATE)
  public updated_at!: CreationOptional<Date>;

  @BelongsTo(() => User, "user_id")
  public user!: CreationOptional<User>;

  public getUser!: BelongsToGetAssociationMixin<User>;

  public toJSON(): Record<string, unknown> {
    const { id, user_id, refresh_token, created_at, updated_at, user } = this;
    return {
      id,
      user_id,
      refresh_token,
      created_at,
      updated_at,
      User,
    };
  }
}
