import crypto from "crypto";
import moment from "moment";

export function generateReference(base = "trf") {
  return moment().format(
    `[${base}_${crypto.randomBytes(6).toString("hex")}_]YYYYMMDDkkmmss`
  );
}
