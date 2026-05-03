const express = require("express");
const interviewController = require("../controllers/interview.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user's self description, resume pdf, and job description
 * @access private
 */
interviewRouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewController.generateInterviewReportController,
);

module.exports = interviewRouter;
