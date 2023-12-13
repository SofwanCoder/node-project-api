import joi from "joi";
import { User } from "../../models/User";

export const USER_CREATION_SCHEMA = joi
  .object({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .external(async (value, helpers) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          return helpers.message({ external: "Email already exist" });
        }
        return value;
      })
      .required(),
    password: joi.string().min(6).required(),
    password_confirmation: joi.string().valid(joi.ref("password")).optional(),
  })
  .unknown();
