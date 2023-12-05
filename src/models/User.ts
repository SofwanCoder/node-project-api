import bcrypt from "bcrypt";
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
} from "@sequelize/core/decorators-legacy";
import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";
import Session from "./Session";

export type IUserAttributes = InferAttributes<User>;
export type IUserCreationAttributes = InferCreationAttributes<User>;

@Table({ tableName: "user" })
export class User extends Model<IUserAttributes, IUserCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Attribute(DataTypes.UUID)
  @Default(() => "hello")
  public id!: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  public first_name!: string;

  @Attribute(DataTypes.STRING)
  public last_name!: string;

  @Attribute(DataTypes.STRING)
  public email!: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  public get password() {
    return this.getDataValue("password");
  }
  public set password(value: string) {
    this.setDataValue("password", bcrypt.hashSync(value, 8));
  }

  @CreatedAt
  public created_at!: CreationOptional<Date>;

  @UpdatedAt
  public updated_at!: CreationOptional<Date>;

  // @HasMany(() => Session)
  // public Sessions!: CreationOptional<Session[]>;

  public toJSON() {
    const {
      id,
      first_name,
      last_name,
      email,
      password,
      created_at,
      updated_at,
    } = this;
    return {
      id,
      first_name,
      last_name,
      email,
      password,
      created_at,
      updated_at,
    };
  }
}
