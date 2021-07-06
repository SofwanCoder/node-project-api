import { body } from "express-validator";

export function subscribeWebRules() {
  return [body("email").isEmail()];
}

export function contactWebRules() {
  return [
    body("name").isString(),
    body("email").isEmail(),
    body("phone").isString(),
    body("subject").isString(),
    body("message").isString(),
  ];
}
