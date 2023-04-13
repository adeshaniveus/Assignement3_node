const request = require("supertest");
const controller = require("../controller/user.controller");

const { app } = require("../index");

const res = {
  status: jest.fn((x) => x), //mocking a function
  send: jest.fn((x) => x),
};

describe("Testing add/list/update user", () => {
  test("Checking user list api, should return status 200", async () => {
    let response = await request(app).get("/user");
    console.log(response);
    expect(response.statusCode).toBe(200);
  });

  test("Checking user list api, should return status 404", async () => {
    let response = await request(app).get("/use");
    console.log(response);
    expect(response.statusCode).toBe(404);
  });

  test("Add user", async () => {
    let req = {
      name: "test",
      email: "test@gmail.com",
      password: "123456546",
    };
    await request(app)
      .post("/user")
      .send(req)
      .then((response) => {
        expect(response.body.data.acknowledged).toBe(true);
      });
  });

  test("Update the user", async () => {
    let id = "6437ec3aa8d154aa0c45c010";
    let payload = {
      name: "test_update15",
    };
    await request(app)
      .put(`/user/${id}`)
      .send(payload)
      .then((response) => {
        console.log(response);
        expect(response.body.modifiedCount).toBe(1);
      });
  });
});
