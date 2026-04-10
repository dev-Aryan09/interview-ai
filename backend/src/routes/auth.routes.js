const express = require("express");
const authControllers = require("../controllers/auth.controller");

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authControllers.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a new user
 * @access Public
 */
authRouter.post("/login", authControllers.loginUserController);

module.exports = authRouter;
