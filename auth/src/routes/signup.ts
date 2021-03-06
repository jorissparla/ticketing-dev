import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "@js-tickets/common";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   throw new RequestValidationError(errors.array());
    // }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // console.log("Email in use");
      throw new BadRequestError("Email already in use");
    }

    const user = User.build({ email, password });
    await user.save();
    const userJWT = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!);
    // console.log(userJWT);
    req.session = { jwt: userJWT };
    res.status(201).send(user);
  }
);

export { router as signupRouter };
