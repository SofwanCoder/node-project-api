import crypto from "crypto";
import moment from "moment";

export function generateReference() {
  return moment().format(
    `[trx_${crypto.randomBytes(6).toString("hex")}_]YYYYMMDDkkmmss`
  );
}
