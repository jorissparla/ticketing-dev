import { currentUser } from "@js-tickets/common";
import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req?.currentUser });
});

export { router as currentUserRouter };
