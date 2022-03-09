import { Gender } from "./enums/base";

export interface CreateUserPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: Gender;
  password: string;
}
