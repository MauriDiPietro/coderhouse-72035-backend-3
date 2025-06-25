import mongoose from "mongoose";
import { fakerES as faker } from "@faker-js/faker";
import test, { before, describe } from "node:test";
import assert from "node:assert";

const mockNew = () => {
  return {
    title: faker.lorem.lines(1),
    body: faker.lorem.paragraphs({ min: 1, max: 3 }),
    author: faker.person.fullName(),
    image: faker.image.url(),
  };
};

const API_URL = "http://localhost:8080/news";

describe("Tests integrales API News", () => {
  //   before(async () => {
  //     await mongoose.connection.collections["news"].drop();
  //   });

  before(async () => await fetch(API_URL, { method: "DELETE" }));

  test("[GET] /news", async () => {
    const responsePromise = await fetch(API_URL);
    const response = await responsePromise.json();
    // console.log(response);
    const statusCode = responsePromise.status;
    assert.equal(statusCode, 200);
    assert.strictEqual(Array.isArray(response), true);
    assert.equal(response.length, 0);
  });

  test("[POST] /news", async () => {
    const bodyNew = mockNew();
    const responsePromise = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(bodyNew),
      headers: { "Content-Type": "application/json" },
    });
    const response = await responsePromise.json();
    const titleResponse = response.title;
    const bodyResponse = response.body;
    const statusCode = responsePromise.status;
    assert.ok(response, '_id');
    assert.equal(titleResponse, bodyNew.title);
    assert.equal(bodyResponse, bodyNew.body);
    assert.equal(statusCode, 201);
  });

  //   test("[GET] /news/:id", async () => {
  //     const bodyNew = mockNew();
  //     const response = await request(app).post("/news").send(bodyNew);
  //     // console.log(response.body);
  //     const id = response.body._id;
  //     expect(id).toBeDefined();
  //     const responseGet = await request(app).get(`/news/${id}`);
  //     const statusCode = responseGet.statusCode;
  //     expect(statusCode).toBe(200);
  //     expect(responseGet.body).toHaveProperty("_id");
  //     expect(responseGet.body.title).toBe(bodyNew.title);
  //     const idFaker = "507f191e810c19729de860ea";
  //     const responseGetFail = await request(app).get(`/news/${idFaker}`);
  //     const statusCodeFail = responseGetFail.statusCode;
  //     expect(statusCodeFail).toBe(404);
  //   });

  //   test("[PUT] /news/:id", async () => {
  //     const bodyNew = mockNew();
  //     const response = await request(app).post("/news").send(bodyNew);
  //     const id = response.body._id;
  //     expect(id).toBeDefined();
  //     const bodyUpdate = mockNew();
  //     const responseUpdate = await request(app)
  //       .put(`/news/${id}`)
  //       .send(bodyUpdate);
  //     const statusCode = responseUpdate.statusCode;
  //     expect(statusCode).toBe(200);
  //     expect(responseUpdate.body._id).toBeDefined();
  //     expect(responseUpdate.body.title).toBe(bodyUpdate.title);
  //     expect(responseUpdate.body.body).toBe(bodyUpdate.body);
  //   });

  //   test("[DELETE] /news/:id", async () => {
  //     const bodyNew = mockNew();
  //     const response = await request(app).post("/news").send(bodyNew);
  //     const id = response.body._id;
  //     expect(id).toBeDefined();
  //     const responseDelete = await request(app).delete(`/news/id/${id}`);
  //     const statusCode = responseDelete.statusCode;
  //     expect(statusCode).toBe(200);
  //     expect(responseDelete.body).toHaveProperty("_id");
  //     expect(responseDelete.body._id).toBe(id);
  //     const responseGet = await request(app).get(`/news/${id}`);
  //     const statusCodeGet = responseGet.statusCode;
  //     expect(statusCodeGet).toBe(404);
  //     //{msg: `No se encontró el id ${id} en la base de datos.`}
  //     expect(responseGet.body).toEqual({
  //       msg: `No se encontró el id ${id} en la base de datos.`,
  //     });
  //   });
});
