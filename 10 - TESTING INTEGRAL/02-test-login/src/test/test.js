import { describe, test } from "node:test"; //en proximas versiones de node, van a ser obligatorio el prefijo node:
import assert from "node:assert";
import { fakerES as faker } from "@faker-js/faker";

const mockUser = () => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ max: 100 }),
    password: faker.string.hexadecimal(),
  };
};

const apiURL = "http://localhost:8080/api";

describe("TESTS API", () => {
  let userRegister = null;
  let cookieToken = null;

  test("[POST] /register", async () => {
    const user = mockUser();

    userRegister = {
      email: user.email,
      password: user.password,
    };

    const responsePromise = await fetch(`${apiURL}/users/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });

    const response = await responsePromise.json();

    assert.ok(response, "_id");
    assert.equal(responsePromise.status, 201);
    assert.rejects();
  });

  test("[POST] /login", async () => {
    const responsePromise = await fetch(`${apiURL}/users/login`, {
      method: "POST",
      body: JSON.stringify(userRegister),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    /*
    headers
    	Set-Cookie:
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiI2ODViZTg4NDJmNmRhOTZlYTdmZDB
iODEiLCJmaXJzdF9uYW1lIjoiTWlndWVsIiwibGFzdF9u
YW1lIjoiR29tZXoiLCJlbWFpbCI6Im0uZ29tZXozQG1ha
WwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTA4NT
QyNzIsImV4cCI6MTc1MDg1NDU3Mn0.4pfHyiapUmHBFVdYzRRng8RMNGJcF0jUl_3npSlK-E4
; Path=/; HttpOnly
    */

    const setCookieHeader = responsePromise.headers.get("set-cookie");
    cookieToken = setCookieHeader.split(";")[0];
    // console.log(cookieToken);
    // assert.ok(response, "token");
    assert.equal(responsePromise.status, 200);
    assert.rejects();
  });

  test("[GET] /current", async () => {
    console.log(cookieToken);
    const responsePromise = await fetch(`${apiURL}/users/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieToken,
      },
      credentials: "include",
    });

    const response = await responsePromise.json();
    console.log(response);
    assert.equal(response.data.email, userRegister.email);
    assert.equal(responsePromise.status, 200);
    assert.rejects();
  });
});
