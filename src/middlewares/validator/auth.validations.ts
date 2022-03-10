import { body } from "express-validator";

export function loginUserRules() {
  return [body("email").isString().isEmail(), body("password").isString()];
}

export function refreshTokenRules() {
  return [body("refresh_token").isString()];
}

export function resetRules() {
  return [body("email").isString().isEmail().trim()];
}

export function secretRules() {
  return [body("ref").isString(), body("code").isString().isNumeric()];
}

export function passwordRules() {
  return [
    body("password").isString().isLength({
      min: 6,
    }),
    body("token").isString(),
  ];
}
