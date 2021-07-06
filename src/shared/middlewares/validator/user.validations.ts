import { body } from "express-validator";
import { User } from "../../../models/User";

export function createUserRules() {
  return [
    body("email")
      .isEmail()
      .trim()
      .toLowerCase()
      .custom(async (email) => {
        const exist = await User.findOne({
          where: {
            email,
          },
        });

        if (exist) throw new Error("Email already in use");

        return true;
      }),
    body("username")
      .isString()
      .trim()
      .toLowerCase()
      .isLength({ min: 4 })
      .withMessage("Minimum of 4 Characters")
      .matches(/^[\d\w_]+$/)
      .withMessage("Invalid characters in Username")
      .custom(async (username) => {
        const exist = await User.findOne({
          where: {
            username,
          },
        });

        if (exist) throw new Error("Username already in use");

        return true;
      }),
    body("name").isString().isLength({ min: 2 }),
    body("password").isString().isLength({ min: 6 }),
    body("password_confirm").isString().isLength({ min: 6 }),
    body("referral").isString().isLength({ min: 2 }).optional({
      nullable: true,
    }),
    body("phone")
      .isString()
      .matches(/^\+\d+$/)
      .withMessage("Invalid Phone number")
      .isLength({ min: 10 }),
  ];
}

export function loginUserRules() {
  return [
    body("email").isEmail(),
    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("Minimum password length is 6"),
  ];
}
