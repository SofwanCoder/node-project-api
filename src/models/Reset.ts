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

export interface IResetAttributes {
  id: number;
  user_id: number;
  ref: string;
  code: string;
  created_at: Date;
  updated_at: Date;
}

export type IResetCreationAttributes = Pick<
  IResetAttributes,
  "user_id" | "ref" | "code"
>;

@Table({ tableName: "reset" })
export default class Reset extends Model<
  IResetAttributes,
  IResetCreationAttributes
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id!: number;

  @ForeignKey(() => User)
  @Column
  public user_id!: number;

  @Column
  public ref!: string;

  @Column
  public code!: string;

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
    const { id, user_id, ref, created_at, updated_at } = this;
    return {
      id,
      user_id,
      ref,
      created_at,
      updated_at,
    };
  }
}
