import { body } from "express-validator";

export function uploadMediaRules() {
  return [
    body("file").custom((value, { req }) => {
      if (req.file) {
        return true;
      }
      throw new Error("File is required");
    }),
  ];
}
