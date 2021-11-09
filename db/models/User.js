const { model, Schema } = require("mongoose");

const UserSchema = Schema({
  username: { type: String },
  password: String,
});

module.exports = model("User", UserSchema);
