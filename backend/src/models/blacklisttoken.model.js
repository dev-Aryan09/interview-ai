const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token is required to be added in blacklist"],
    },
  },
  {
    timestamps: true, // tells when the entry is created or updated in DB
  },
);

const blacklistTokenModel = mongoose.model(
  "blacklistToken",
  blacklistTokenSchema,
);

module.exports = blacklistTokenModel;
