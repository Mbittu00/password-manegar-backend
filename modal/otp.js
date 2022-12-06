import mongoose from "mongoose";

let otpSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  {
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "5m" },
    },
  }
);

let model = mongoose.model("otp", otpSchema);
export default model;
