import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";

import { User } from "./User";

export interface ProfileAttributes {
  id?: number;
  user_id: number;
  name: string;
  phone?: string;
  is_phone_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type ProfileCreationAttributes = Pick<
  ProfileAttributes,
  "user_id" | "name" | "phone"
>;

@Table({ tableName: "profile" })
export class Profile extends Model<
  ProfileAttributes,
  ProfileCreationAttributes
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id!: number;

  @Unique
  @ForeignKey(() => User)
  @Column(
    DataType.INTEGER({
      unsigned: true,
    })
  )
  public user_id!: number;

  @Column(DataType.STRING)
  public name!: string;

  @Default(null)
  @Column(
    DataType.STRING({
      length: 20,
    })
  )
  public phone!: string;

  @CreatedAt
  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column(DataType.DATE)
  public created_at!: Date;

  @UpdatedAt
  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column(DataType.DATE)
  public updated_at!: Date;

  @BelongsTo(() => User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    targetKey: "id",
  })
  public User!: User;

  public toJSON(): Record<string, any> {
    const { id, user_id, name, phone, created_at, updated_at, User } = this;
    return {
      id,
      user_id,
      name,
      phone,
      created_at,
      updated_at,
      User,
    };
  }
}
