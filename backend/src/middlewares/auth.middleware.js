require("dotenv").config();
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklisttoken.model");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  const isTokenBlackListed = await blacklistTokenModel.findOne({ token });

  if (isTokenBlackListed) {
    return res.status(401).json({
      message: "Token is B,invalid",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.log("Error occured", err);
    res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = { authUser };
