import request from "supertest";
import { app } from "../../app";

it("Clears out cookie after signout", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);
  const response = request(app).post("/api/users/signout").send({}).expect(200);
  //   console.log(response.get("Set-Cookie"));
  //   expect(response.get("Set-Cookie")).;
});
