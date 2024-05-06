const db = require("../db");

const userSchema = new db.mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
    email: { type: String },
    name: { type: String },
    avartar: { type: String },
    available: { type: Boolean, default: false },
  },
  {
    collection: "users",
  }
);

const UserModel = db.mongoose.model("UserModel", userSchema);

module.exports = UserModel;
