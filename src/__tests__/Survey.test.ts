import  request  from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Deve criar um survey", async () => {
    const resp = await request(app).post("/surveys").send({
      title: "Jest Survey",
      description: "Jest Survey Teste",
    });

    expect(resp.status).toBe(201);
    expect(resp.body).toHaveProperty("id");
  });

  it("Deve retornar os surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Jest2 Survey",
      description: "Jest2 Survey Teste",
    });

    const response = await request(app).get("/surveys");
    expect(response.body.length).toBe(2);
  })
})