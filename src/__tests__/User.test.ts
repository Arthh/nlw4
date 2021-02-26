import  request  from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Deve criar um user", async () => {
    const resp = await request(app).post("/users").send({
      email: "jesat@jest.com",
      name: "Jeast",
    });

    expect(resp.status).toBe(201);
  });

  it("Não deve criar um user", async () => {
    const resp = await request(app).post("/users").send({
      email: "jesat@jest.com",
      name: "Jeast",
    });

    expect(resp.status).toBe(400);
  })
})