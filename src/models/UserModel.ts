import mongoose, { Document, Model, Schema } from "mongoose";

export interface UserDetails extends Document {
  fullName: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  isConfirmed: boolean;
  updatedAt: Date;
  expiryDate: Date;
  loginThrough: String;
  resetToken: String;
  emailConfirmToken: String;
  resetTokenExpiry: Date;
}

const UserSchema = new Schema<UserDetails>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true, default: true },
    role: { type: String, required: true, default: "u" },
    password: { type: String },
    loginThrough: { type: String, required: false },
    resetToken: { type: String },
    emailConfirmToken: { type: String },
    resetTokenExpiry: { type: Date },
    isConfirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const UserModel: Model<UserDetails> =
  mongoose.models.User || mongoose.model<UserDetails>("User", UserSchema);
