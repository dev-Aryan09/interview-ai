const express = require("express");
const authControllers = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

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

/**
 * @route POST /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
authRouter.post("/logout", authControllers.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */

authRouter.get(
  "/get-me",
  authMiddleware.authUser,
  authControllers.getMeController,
);

module.exports = authRouter;
