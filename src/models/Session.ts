import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import { BelongsToGetAssociationMixin } from "sequelize";
import { User } from "./User";

export interface SessionAttributes {
  id: number;
  user_id: number;
  auth_token: string;
  refresh_token: string;
  created_at: Date;
  updated_at: Date;
}

export type SessionCreationAttributes = Pick<
  SessionAttributes,
  "user_id" | "auth_token" | "refresh_token"
>;

@Table({ tableName: "session" })
export default class Session extends Model<
  SessionAttributes,
  SessionCreationAttributes
> {
  @AutoIncrement
  @PrimaryKey
  @Column(
    DataType.INTEGER({
      unsigned: true,
    })
  )
  public id!: number;

  @ForeignKey(() => User)
  @Column(
    DataType.INTEGER({
      unsigned: true,
    })
  )
  public user_id!: number;

  @Column(DataType.STRING)
  public auth_token!: string;

  @Column(DataType.STRING)
  public refresh_token!: string;

  @CreatedAt
  @Column(DataType.DATE)
  public created_at!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  public updated_at!: Date;

  @BelongsTo(() => User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  })
  public User!: User;

  public getUser!: BelongsToGetAssociationMixin<User>;

  public toJSON(): Record<string, unknown> {
    const {
      id,
      user_id,
      auth_token,
      refresh_token,
      created_at,
      updated_at,
      User,
    } = this;
    return {
      id,
      user_id,
      auth_token,
      refresh_token,
      created_at,
      updated_at,
      User,
    };
  }
}
