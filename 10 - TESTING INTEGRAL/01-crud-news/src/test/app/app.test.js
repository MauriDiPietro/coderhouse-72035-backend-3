//npm i -D supertest jest @faker-js/faker
import app from "../../server.js";
import request from "supertest";
import mongoose from "mongoose";
import { fakerES as faker } from "@faker-js/faker";

const mockNew = () => {
  return {
    title: faker.lorem.lines(1),
    body: faker.lorem.paragraphs({ min: 1, max: 3 }),
    author: faker.person.fullName(),
    image: faker.image.url(),
  };
};

describe("Tests integrales API News", () => {
  beforeAll(async () => {
    await mongoose.connection.collections["news"].drop();
  });

  test("[POST] /news", async () => {
    const bodyNew = mockNew();
    const response = await request(app).post("/news").send(bodyNew);
    // console.log(response.body);
    const id = response.body._id;
    const titleResponse = response.body.title;
    const bodyResponse = response.body.body;
    const statusCode = response.statusCode;
    expect(id).toBeDefined();
    expect(response.body).toHaveProperty("_id");
    expect(titleResponse).toBe(bodyNew.title);
    expect(bodyResponse).toBe(bodyNew.body);
    expect(statusCode).toBe(201);
  });

  test("[GET] /news", async () => {
    const response = await request(app).get("/news");
    const statusCode = response.statusCode;
    expect(statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("id");
    const dateResponse = response.body[0].date;
    const dateExpected = expect.stringContaining("2025");
    expect(dateResponse).toEqual(dateExpected);
  });

  test("[GET] /news/:id", async () => {
    const bodyNew = mockNew();
    const response = await request(app).post("/news").send(bodyNew);
    // console.log(response.body);
    const id = response.body._id;
    expect(id).toBeDefined();
    const responseGet = await request(app).get(`/news/${id}`);
    const statusCode = responseGet.statusCode;
    expect(statusCode).toBe(200);
    expect(responseGet.body).toHaveProperty("_id");
    expect(responseGet.body.title).toBe(bodyNew.title);
    const idFaker = "507f191e810c19729de860ea";
    const responseGetFail = await request(app).get(`/news/${idFaker}`);
    const statusCodeFail = responseGetFail.statusCode;
    expect(statusCodeFail).toBe(404);
  });

  test("[PUT] /news/:id", async () => {
    const bodyNew = mockNew();
    const response = await request(app).post("/news").send(bodyNew);
    const id = response.body._id;
    expect(id).toBeDefined();
    const bodyUpdate = mockNew();
    const responseUpdate = await request(app)
      .put(`/news/${id}`)
      .send(bodyUpdate);
    const statusCode = responseUpdate.statusCode;
    expect(statusCode).toBe(200);
    expect(responseUpdate.body._id).toBeDefined();
    expect(responseUpdate.body.title).toBe(bodyUpdate.title);
    expect(responseUpdate.body.body).toBe(bodyUpdate.body);
  });

  test("[DELETE] /news/:id", async () => {
    const bodyNew = mockNew();
    const response = await request(app).post("/news").send(bodyNew);
    const id = response.body._id;
    expect(id).toBeDefined();
    const responseDelete = await request(app).delete(`/news/id/${id}`);
    const statusCode = responseDelete.statusCode;
    expect(statusCode).toBe(200);
    expect(responseDelete.body).toHaveProperty("_id");
    expect(responseDelete.body._id).toBe(id);
    const responseGet = await request(app).get(`/news/${id}`);
    const statusCodeGet = responseGet.statusCode;
    expect(statusCodeGet).toBe(404);
    //{msg: `No se encontró el id ${id} en la base de datos.`}
    expect(responseGet.body).toEqual({
      msg: `No se encontró el id ${id} en la base de datos.`,
    });
  });
});
