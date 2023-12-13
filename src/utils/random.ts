import { randomBytes } from "crypto";

export function generateRandomString(length = 32) {
  return randomBytes(length).toString("hex");
}

export function generateRandomNumber(length = 6) {
  return Math.floor(Math.random() * 10 ** length);
}
