import bcrypt from "bcrypt";
import Sequelize from "sequelize";
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Default,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import { Profile, ProfileCreationAttributes } from "./Profile";
export interface UserAttributes {
  id: number;
  name: string;
  clearance: number;
  email: string;
  username: string;
  password: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserCreationAttributes
  extends Omit<
    UserAttributes,
    "id" | "is_verified" | "created_at" | "updated_at" | "is_premium"
  > {
  Profile: Omit<ProfileCreationAttributes, "user_id">;
}

@Table({ tableName: "user" })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(
    DataType.INTEGER({
      unsigned: true,
    })
  )
  public id!: number;

  @Default(0)
  @Column(
    DataType.SMALLINT({
      unsigned: true,
    })
  )
  public clearance!: number;

  @Column(DataType.STRING)
  public name!: string;

  @Unique
  @Column(DataType.STRING)
  public email!: string;

  @Unique
  @Column(DataType.STRING)
  public username!: string;

  @Column(DataType.STRING)
  public get password() {
    return this.getDataValue("password");
  }
  public set password(value: string) {
    this.setDataValue("password", bcrypt.hashSync(value, 8));
  }

  @Default(false)
  @Column(DataType.BOOLEAN)
  public is_verified!: boolean;

  @CreatedAt
  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column(DataType.DATE)
  public created_at!: Date;

  @UpdatedAt
  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column(DataType.DATE)
  public updated_at!: Date;

  @HasOne(() => Profile, {
    foreignKey: "user_id",
    sourceKey: "id",
  })
  public Profile!: Profile;

  public getProfile!: Sequelize.BelongsToGetAssociationMixin<Profile>;

  public toJSON(): Record<string, any> {
    const {
      id,
      clearance,
      email,
      name,
      username,
      is_verified,
      created_at,
      updated_at,
      Profile,
    } = this;
    return {
      id,
      clearance,
      email,
      name,
      username,
      is_verified,
      created_at,
      updated_at,
      Profile,
    };
  }
}
