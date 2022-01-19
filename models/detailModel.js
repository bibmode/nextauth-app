import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

let Dataset = mongoose.models.todo || mongoose.model("details", todoSchema);

export default Dataset;
