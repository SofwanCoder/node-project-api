import bcrypt from "bcrypt";
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import { Gender } from "../types/enums/base";
import Session from "./Session";

export interface IUserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  gender: Gender;
  avatar: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export type IUserCreationAttributes = Partial<IUserAttributes>;

@Table({ tableName: "user" })
export class User extends Model<IUserAttributes, IUserCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id!: number;

  @Column
  public first_name!: string;

  @Column
  public last_name!: string;

  @Column
  public phone!: string;

  @Column
  public gender!: Gender;

  @Column
  public avatar!: string;

  @Column
  public email!: string;

  @Column(DataType.STRING)
  public get password() {
    return this.getDataValue("password");
  }
  public set password(value: string) {
    this.setDataValue("password", bcrypt.hashSync(value, 8));
  }

  @CreatedAt
  public created_at!: Date;

  @UpdatedAt
  public updated_at!: Date;

  @HasMany(() => Session)
  public Sessions!: Session[];

  public toJSON() {
    const {
      id,
      first_name,
      last_name,
      phone,
      gender,
      avatar,
      email,
      password,
      created_at,
      updated_at,
    } = this;
    return {
      id,
      first_name,
      last_name,
      phone,
      gender,
      avatar,
      email,
      password,
      created_at,
      updated_at,
    };
  }
}
