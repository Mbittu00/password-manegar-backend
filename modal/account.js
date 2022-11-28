import mongoose from "mongoose";

let accountSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    local: {
      type: String,
    },
    number: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    app: {
      type: String,
      enum: [
        "facebook",
        "twitter",
        "instagram",
        "github",
        "google",
        "snapchat",
        "website",
        "app",
        "wifi",
        "samsung",
        "mi",
        "replit",
        "rapid",
        "vercel",
        "flipkart",
        "irctc",
        "amazon",
        "mintra",
        "misho",
        "groww",
        "zee5",
        "hotstast",
        "ganna",
        "spotyfi",
        "netflix",
        "zoom",
        "discord",
        "tinder",
        "happan",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

let account = mongoose.model("Account", accountSchema);
export default account;
