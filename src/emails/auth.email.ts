import { readFileSync } from "fs";
import { join } from "path";
import { compile } from "ejs";
import juice from "juice";
import { User } from "../models/User";
import Verifier from "../models/Verifier";

const _resetPasswordTemplate = getTemplate("password.reset");

const _verifyEmailTemplate = getTemplate("user.verify");

export function resetPasswordTemplate(user: User, verifier: Verifier) {
  return _resetPasswordTemplate({ user, verifier });
}

export function verifyUserTemplate(user: User, verifier: Verifier) {
  return _verifyEmailTemplate({ user, verifier });
}

function getTemplate(template: string) {
  const content = readFileSync(
    join(__dirname, `templates/${template}.ejs`),
  ).toString();
  const juiced = juice(content);
  return compile(juiced, {
    views: [join(__dirname, "templates")],
  });
}
