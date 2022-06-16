import authRouter from "./auth.router";
import userRouter from "./users";
import Middlewares from "../middlewares";
import Controllers from "../controllers";
var express = require("express");
var router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.post("/handle-questions", [Middlewares.Auth.isUser], Controllers.Survey.handleQuestions);
router.get("/answer", [Middlewares.Auth.isUser], Controllers.Survey.getAnswer);
router.post(
  "/questions",
  // [Middlewares.Auth.isUser],
  Controllers.Survey.getQuestions
);

router.get(
  "/comments/:appName",
  // [Middlewares.Auth.isUser],
  Controllers.Survey.getComments
);

router.put("/instruction", [Middlewares.Auth.isUser], Controllers.Survey.updateInstruction);

router.post("/success", [Middlewares.Auth.isUser], Controllers.Survey.success);

module.exports = router;
