import bcrypt from "bcrypt";
import {
  Attribute,
  PrimaryKey,
  NotNull,
  UpdatedAt,
  Table,
  CreatedAt,
  Default,
  HasMany,
  AllowNull,
} from "@sequelize/core/decorators-legacy";
import {
  DataTypes,
  Model,
  type InferAttributes,
  type HasManyCreateAssociationMixin,
  type HasManyGetAssociationsMixin,
  HasManyRemoveAssociationsMixin,
} from "@sequelize/core";
import Session from "./Session";
import { ulid } from "ulid";
import Verifier from "./Verifier";

export type IUserAttributes = InferAttributes<User>;
export type IUserCreationAttributes = Partial<IUserAttributes>;

@Table({ tableName: "user" })
export class User extends Model<IUserAttributes, IUserCreationAttributes> {
  @PrimaryKey
  @Attribute(DataTypes.STRING)
  @Default(ulid)
  declare id: string;

  @Attribute(DataTypes.STRING)
  declare firstname: string;

  @Attribute(DataTypes.STRING)
  declare lastname: string;

  @Attribute(DataTypes.STRING)
  @AllowNull
  declare phone: string;

  @Attribute(DataTypes.STRING)
  declare email: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare is_verified: boolean;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare is_2fa_enabled: boolean;

  @Attribute(DataTypes.STRING)
  @NotNull
  public get password() {
    return this.getDataValue("password");
  }

  public set password(value: string) {
    this.setDataValue("password", bcrypt.hashSync(value, 8));
  }

  @CreatedAt
  @Attribute(DataTypes.DATE)
  declare created_at: Date;

  @UpdatedAt
  @Attribute(DataTypes.DATE)
  declare updated_at: Date;

  @HasMany(() => Session, "user_id")
  declare sessions: Session[];

  @HasMany(() => Verifier, "user_id")
  declare verifier: Verifier[];

  declare createSession: HasManyCreateAssociationMixin<Session>;
  declare createVerifier: HasManyCreateAssociationMixin<Verifier>;
  declare getVerifiers: HasManyGetAssociationsMixin<Verifier>;
  declare removeVerifiers: HasManyRemoveAssociationsMixin<
    Verifier,
    Verifier["id"]
  >;

  public toJSON() {
    const {
      id,
      firstname,
      lastname,
      email,
      phone,
      is_verified,
      is_2fa_enabled,
      created_at,
      updated_at,
    } = this;
    return {
      id,
      firstname,
      lastname,
      phone,
      email,
      is_verified,
      is_2fa_enabled,
      created_at,
      updated_at,
    };
  }
}
