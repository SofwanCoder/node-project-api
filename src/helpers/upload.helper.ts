import crypto from "crypto";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { type Express } from "express";
import multer from "multer";
import slugify from "slugify";
import config from "../config";
export const storageRoot = resolve("./public");
export const storageWebsite = `https://${config.app.baseUrl}/public`;
export const tempStorageLocation = "temp";

export function generateFileName(file: Express.Multer.File) {
  const { originalname } = file;

  const baseHash = crypto.randomBytes(15).toString("hex");
  const cleanedName = slugify(originalname);
  return `${baseHash}_${cleanedName}`;
}

export default function temporaryStorage(file: Express.Multer.File) {
  const uniqueName = generateFileName(file);

  const { publicUrl } = saveToStorage(
    file,
    `${tempStorageLocation}/${uniqueName}`,
  );

  return publicUrl;
}

export function saveToStorage(file: Express.Multer.File, storagePath: string) {
  const fullPath = `${storageRoot}/${storagePath}`;
  const publicUrl = `${storageWebsite}/${storagePath}`;
  writeFileSync(fullPath, file.buffer);

  return {
    fullPath,
    publicUrl,
  };
}

export function expectFile() {
  return multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });
}
