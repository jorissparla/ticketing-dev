import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});
it("returns a 400 on signup with bad email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "bsbbjd",
      password: "password",
    })
    .expect(400);
});
it("returns a 400 on signup with bad password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "bsbbjd",
      password: "pad",
    })
    .expect(400);
});
it("returns a 400 on signup with missing email and password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});
it("rdisallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});
it("sets a cookie after successfull signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
