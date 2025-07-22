import { UserModel } from "@/models/UserModel";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodbconn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { method, query, body } = req;
  const functionName = req.headers["functionname"];
  const jwt = req.headers["jwt"];

  try {
    if (functionName === "ForgotPasswordLink") {
      await ForgotPasswordLink(res, body, jwt);
    } else if (functionName === "ResetPassword") {
      await ResetPassword(res, body, jwt);
    } else if (functionName === "EmailConfirmation") {
      await EmailConfirmation(res, body, jwt);
    } else {
      res.status(500).json({ error: `Method ${functionName} not found` });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

export async function EmailConfirmation(
  res: NextApiResponse,
  data: any,
  jwtHeader: any
) {
  const { token } = data;

  const requiredFields = {
    token: "Email verification failed. Please try again!",
  };

  for (const [field, message] of Object.entries(requiredFields)) {
    if (!data[field]) {
      return res.status(200).json({ message });
    }
  }

  const user = await UserModel.findOne({ emailConfirmToken: token });

  if (!user) {
    return res.status(200).json({ message: "Invalid user !" });
  }

   if (user.isConfirmed === true) {
    return res.status(200).json({ message: "Email already verified !" });
  }

  const password = generateRandomPassword();

  const newPassword = await bcrypt.hash(password, 10);
  user.isConfirmed = true;
  user.password = newPassword;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"EchoLink" <${process.env.SMTP_EMAIL}>`,
    to: user.email,
    subject: "Your EchoLink Account Password",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #eee; border-radius: 10px; background-color: #fdfdfd;">
      <h2 style="color: #4CAF50; text-align: center;">Welcome to EchoLink!</h2>
      <p style="font-size: 16px; color: #333;">Hi <strong>${user.email}</strong>,</p>

      <p style="font-size: 16px; color: #333; line-height: 1.6;">
        Thank you for signing up with <strong>EchoLink</strong>. Your account has been created successfully.
        Please find your login credentials below:
      </p>

      <div style="margin: 20px 0; padding: 15px; background-color: #f1f1f1; border-radius: 6px;">
        <p style="font-size: 16px; color: #000;"><strong>Email:</strong> ${user.email}</p>
        <p style="font-size: 16px; color: #000;"><strong>Password:</strong> ${password}</p>
      </div>

      <p style="font-size: 16px; color: #333;">
        Please log in using the credentials above and change your password immediately for security.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://yourdomain.com/login" 
           style="padding: 12px 25px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
          Login to EchoLink
        </a>
      </div>

      <p style="font-size: 14px; color: #777;">If you didn’t request this account, please ignore this email.</p>
      <p style="font-size: 14px; color: #4CAF50; margin-top: 40px;">— The EchoLink Team</p>
    </div>
  `,
  };

  // transporter.sendMail(mailOptions);
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Email sending error: ", err);
      // return res.status(200).json({ message: "Error sending email" });
    } else {
      // return res.status(200).json({ message: "ok" });
      console.error("=done");
    }
  });

  return res.status(201).json({ message: "ok" });
}

export async function ResetPassword(
  res: NextApiResponse,
  data: any,
  jwtHeader: any
) {
  const { ConfirmPass, token } = data;

  const requiredFields = {
    ConfirmPass: "Password is required",
    token: "Token is required",
  };

  for (const [field, message] of Object.entries(requiredFields)) {
    if (!data[field]) {
      return res.status(200).json({ message });
    }
  }

  const user = await UserModel.findOne({ resetToken: token });
  console.log(user, "user");

  if (!user) {
    return res.status(200).json({ message: "Invalid user !" });
  }

  if (new Date() > user.resetTokenExpiry) {
    return res.status(200).json({ message: "Reset link expired !" });
  }

  const hashedPass = await bcrypt.hash(ConfirmPass, 10);

  user.password = hashedPass;
  await user.save();

  return res.status(201).json({ message: "ok" });
}

export async function ForgotPasswordLink(
  res: NextApiResponse,
  data: any,
  jwtHeader: any
) {
  const { email } = data;

  const requiredFields = {
    email: "Email is required",
  };

  for (const [field, message] of Object.entries(requiredFields)) {
    if (!data[field]) {
      return res.status(200).json({ message });
    }
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(200).json({ message: "Invalid email !" });
  }

  // Generate reset token
  const token = crypto.randomBytes(32).toString("hex");
  const tokenExpiry: Date = new Date(Date.now() + 2 * 60 * 60 * 1000);

  user.resetToken = token;
  user.resetTokenExpiry = tokenExpiry;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/ResetPassword?token=${token}`;

  const mailOptions = {
    from: `"EchoLink" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Reset Your Password",
    html: `
      <h2>Forgot your password?</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 2 hours.</p>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Email sending error: ", err);
      return res.status(200).json({ message: "Error sending email" });
    } else {
      return res.status(200).json({ message: "ok" });
    }
  });
}

function generateRandomPassword(length = 10): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
