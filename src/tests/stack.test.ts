import request from "supertest";

import { faker } from "@faker-js/faker";
import { app } from "../app";

const user = {
  email: faker.internet.email(),
  password: faker.person.firstName() + faker.person.lastName(),
};

beforeAll(async () => {});
describe("Describe User Authentication", () => {
  test("it should register user", async () => {
    return request(app).post("/auth/register").send(user).expect(404);
  });

  test("it should fail to register an existing user", async () => {
    return request(app).post("/auth/register").send(user).expect(404);
  });

  test("it should login user in", async () => {
    return request(app).post("/auth/login").send(user).expect(404);
  });

  test("it should fail to log user in with invalid credentials", async () => {
    return request(app)
      .post("/auth/login")
      .send({ email: user.email, password: "randomwrongpassword" })
      .expect(404);
  });
});
