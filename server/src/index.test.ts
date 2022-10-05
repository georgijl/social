import { send } from "process";
import { createConnection, getConnectionManager } from "typeorm";
import { typeOrmConfig } from "./data-source";
import app from "./index";
const request = require("supertest");

beforeAll(async () => {
  await createConnection(typeOrmConfig);
});

describe("Login", () => {
  test("Give wrong credentials", async () => {
    const data = {
      email: "oho@abv.bg",
      password: "password",
    };
    await request(app).post("/api/user/login").send(data).expect(401);
  });

  test("Give correct credentials", async () => {
    const data = {
      email: "test@abv.bg",
      password: "123456789Mm",
    };

    await request(app).post("/api/user/login").send(data).expect(200);
  });

  test("Try to register with existing credentials", async () => {
    const data = {
      userName: "oho",
      firstName: "Georgi",
      lastName: "Ivanov",
      email: "oho@abv.bg",
      password: "123456789Mm",
    };

    await request(app).post("/api/user/register").send(data).expect(401);
  });

  test("Try to register with right credentials", async () => {
    const data = {
      userName: "ehe",
      firstName: "ehe",
      lastName: "ehe",
      email: "ehe@abv.bg",
      password: "123456789Mm",
    };

    await request(app).post("/api/user/register").send(data).expect(200);
  });

  test("Getting suggested users", async () => {
    const userId = [
      {
        id: "c5e48954-e7dd-4637-8d50-3c05740e8683",
        username: "Stavri",
        first_name: "Dimitrov",
        last_name: "Yordanov",
        cover_photo: null,
        picture: "1661857523097head-search.jpg",
        email: "testUser@abv.bg",
        password:
          "$2b$10$fX5TH5ablTUah3uC1tNF7ea5aJ3XFw66pssBZjBDOYPamRcON3el.",
      },
    ];

    await request(app)
      .post("/api/suggested")
      .send({ users: userId })
      .expect(200);
  });
});

afterAll(async () => {
  const conn = getConnectionManager().get();
  if (conn.isConnected) await conn.close();
});
