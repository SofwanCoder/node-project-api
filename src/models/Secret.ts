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

export interface ISecretAttributes {
  id: number;
  user_id: number;
  token: string;
  created_at: Date;
  updated_at: Date;
}

export type ISecretCreationAttributes = Pick<
  ISecretAttributes,
  "user_id" | "token"
>;

@Table({ tableName: "secret" })
export default class Secret extends Model<
  ISecretAttributes,
  ISecretCreationAttributes
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id!: number;

  @ForeignKey(() => User)
  @Column
  public user_id!: number;

  @Column
  public token!: string;

  @CreatedAt
  @Column(DataType.DATE)
  public created_at!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  public updated_at!: Date;

  @BelongsTo(() => User)
  public User!: User;

  public getUser!: BelongsToGetAssociationMixin<User>;

  public toJSON(): Record<string, unknown> {
    const { id, user_id, token, created_at, updated_at, User } = this;
    return {
      id,
      user_id,
      token,
      created_at,
      updated_at,
      User,
    };
  }
}
