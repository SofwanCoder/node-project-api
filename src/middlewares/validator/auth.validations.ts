import joi from "joi";

export const AUTH_SESSION_CREATION_SCHEMA = joi.object({
  email: joi.string().email({ tlds: { allow: false } }),
  password: joi.string().min(6).required(),
});

export const AUTH_DO_EMAIL_VERIFICATION_SCHEMA = joi.object({
  code: joi.string().length(6).required(),
  id: joi.string().length(26).required(),
});
