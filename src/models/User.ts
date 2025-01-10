import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  tokens: { token: string }[];
  createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    tokens: [{ token: { type: String, required: true } }],
    createdAt: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
