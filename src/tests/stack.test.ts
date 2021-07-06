import faker from "faker";
import request from "supertest";
import { app } from "../app";

const user = {
  email: faker.internet.email(),
  password: faker.name.findName() + faker.name.lastName(),
};
let token: string;
beforeAll(async () => {});
describe("Describe User Authentication", () => {
  test("it should register user", async () => {
    return request(app)
      .post("/auth/register")
      .send(user)
      .expect((res) => {
        token = res.body.data.token;
      })
      .expect(201);
  });

  test("it should fail to register an existing user", async () => {
    return request(app).post("/auth/register").send(user).expect(400);
  });

  test("it should login user in", async () => {
    return request(app)
      .post("/auth/login")
      .send(user)
      .expect((res) => {
        token = res.body.data.token;
      })
      .expect(200);
  });

  test("it should fail to log user in with invalid credentials", async () => {
    return request(app)
      .post("/auth/login")
      .send({ email: user.email, password: "randomwrongpassword" })
      .expect(400);
  });
});
