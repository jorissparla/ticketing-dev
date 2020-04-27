import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [body("email").isEmail().withMessage("Email must be valid"), body("password").trim().notEmpty().withMessage("Password must not be empty")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Login Request Failed");
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJWT = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!);

    req.session = { jwt: userJWT };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
