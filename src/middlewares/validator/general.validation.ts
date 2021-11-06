import { param, query } from "express-validator";

export function pagingRules() {
  return [query(["page", "per_page"]).isNumeric().optional()];
}

export function pagingParamRules(rules: string[]) {
  return rules.map((rule) => {
    return param(rule).isString();
  });
}
