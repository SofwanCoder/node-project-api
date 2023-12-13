import { readFileSync } from "fs";
import { join } from "path";
import { compile } from "ejs";
import juice from "juice";
import { User } from "../models/User";
import Verifier from "../models/Verifier";
import config from "../config";

const _resetPasswordTemplate = compile(
  readFileSync(join(config.dir.views, "emails/password.reset.ejs")).toString(),
  {
    views: [join(config.dir.views, "emails")],
  },
);

const _verifyEmailTemplate = compile(
  readFileSync(join(config.dir.views, "emails/user.verify.ejs")).toString(),
  {
    views: [join(config.dir.views, "emails")],
  },
);

export function resetPasswordTemplate(user: User, verifier: Verifier) {
  const result = _resetPasswordTemplate({ user, verifier });
  return juice(result);
}

export function verifyUserTemplate(user: User, verifier: Verifier) {
  const result = _verifyEmailTemplate({ user, verifier });
  return juice(result);
}
