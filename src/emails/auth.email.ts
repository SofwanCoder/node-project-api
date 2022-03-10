import { readFileSync } from "fs";
import { join } from "path";
import { compile } from "ejs";
import juice from "juice";
import { User } from "../models/User";
import Reset from "../models/Reset";
import config from "../config";

const _resetPasswordTemplate = compile(
  readFileSync(
    join(config.dir.root, "views/emails/password.reset.ejs")
  ).toString()
);

export function resetPasswordTemplate(user: User, reset: Reset) {
  const result = _resetPasswordTemplate({ user, reset });
  return juice(result);
}
