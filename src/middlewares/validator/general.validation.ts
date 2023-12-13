import joi from "joi";

export const PAGING_RULES_SCHEMA = joi.object({
  page: joi.number().optional(),
  limit: joi.number().optional(),
});
