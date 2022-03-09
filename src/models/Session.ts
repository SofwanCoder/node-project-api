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

export interface ISessionAttributes {
  id: number;
  user_id: number;
  refresh_token: string;
  ip_address: string;
  user_agent: string;
  created_at: Date;
  updated_at: Date;
}

export type ISessionCreationAttributes = Pick<
  ISessionAttributes,
  "user_id" | "refresh_token"
>;

@Table({ tableName: "session" })
export default class Session extends Model<
  ISessionAttributes,
  ISessionCreationAttributes
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id!: number;

  @ForeignKey(() => User)
  @Column
  public user_id!: number;

  @Column
  public refresh_token!: string;

  @Column
  public ip_address!: string;

  @Column
  public user_agent!: string;

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
    const { id, user_id, refresh_token, created_at, updated_at, User } = this;
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
