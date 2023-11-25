const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    stripeId: String,
    subscription: {
      sessionId: String,
      subscriptionId: String,
      planId: String,
      planName: String,
      startDate: String,
      endDate: String,
      durationInDays: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
