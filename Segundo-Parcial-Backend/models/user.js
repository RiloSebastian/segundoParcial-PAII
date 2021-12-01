const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform: (document, userToJson) => {
    userToJson.id = userToJson._id.toString();
    delete userToJson._id;
    delete userToJson.__v;
  },
});

module.exports = model("user", userSchema);
