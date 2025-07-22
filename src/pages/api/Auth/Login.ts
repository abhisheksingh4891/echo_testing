import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { UserModel } from "@/models/UserModel";
import nodemailer from "nodemailer";
import crypto from "crypto";
import connectDB from "@/lib/mongodbconn";

const SECRET_KEY = process.env.SECRET_KEY;
const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { method, query, body } = req;
  const functionName = req.headers["functionname"];
  const jwt = req.headers["jwt"];

  try {
    if (functionName === "UserLogin") {
      await UserLogin(res, body, jwt);
    } else if (functionName === "UserSignUp") {
      await UserSignUp(res, body, jwt);
    } else if (functionName === "UserSignUpLoginGoogle") {
      await UserSignUpLoginGoogle(res, body, jwt);
    } else {
      res.status(500).json({ error: `Method ${functionName} not found` });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function UserSignUpLoginGoogle(
  res: NextApiResponse,
  data: any,
  jwtHeader: any
) {
  const { accessToken, idToken, state, tokenType, expiresIn, scope } = data;

  if (!idToken) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ message: "Invalid token" });
    }

    //     {
    //   iss: 'https://accounts.google.com',
    //   azp: '673545927013-cb26u61e831133toe90534f1674t03b8.apps.googleusercontent.com',
    //   aud: '673545927013-cb26u61e831133toe90534f1674t03b8.apps.googleusercontent.com',
    //   sub: '112713608103141592022',
    //   email: '2811asingh@gmail.com',
    //   email_verified: true,
    //   at_hash: 'O8QyWsa8cBWvBzc7hkko2g',
    //   nonce: 'nz5ucf',
    //   nbf: 1753170663,
    //   name: 'abhishek singh',
    //   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLFn1O9YUlNhCy-72oEsW3DYKKb3NEKyRGyyU0J6E2eJrDuBQ=s96-c',
    //   given_name: 'abhishek',
    //   family_name: 'singh',
    //   iat: 1753170963,
    //   exp: 1753174563,
    //   jti: 'a41115671699921e93d93169d7d7c97f098ea2eb'
    // } payload

    const { email, name } = payload;

    const user = await UserModel.findOne({ email });

    if (user) {
      await UserLogin(res, user, jwt);
    } else {
      const data = {
        fullName: name,
        email,
        isGoogle: true,
      };
      await UserSignUp(res, data, jwt);
      const user = await UserModel.findOne({ email: data.email });
      await UserLogin(res, user, jwt);
    }
  } catch (error) {}
}

async function UserSignUp(res: NextApiResponse, data: any, jwtHeader: any) {
  const { fullName, email, isGoogle } = data;

    console.log(isGoogle,"isGoogle");

  const requiredFields = {
    fullName: "Full Name is required",
    email: "Email is required",
  };

  for (const [field, message] of Object.entries(requiredFields)) {
    if (!data[field]) {
      return res.status(200).json({ message });
    }
  }

  const user = await UserModel.findOne({ email });

  if (user) {
    return res.status(200).json({ message: "User already exists!" });
  }

  // const password = generateRandomPassword();

  // const newPassword = await bcrypt.hash(password, 10);

  const expiryDate = new Date(new Date().setMonth(new Date().getMonth() + 1));

  let token = crypto.randomBytes(32).toString("hex");

  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/EmailConfirmed?token=${token}`;

  console.log(isGoogle,"isGoogle");
  
  const newUser = new UserModel({
    fullName,
    email,
    // password: newPassword,
    expiryDate: expiryDate,
    loginThrough: isGoogle ? "google" : "direct",
    isConfirmed: isGoogle ? true : false,
    emailConfirmToken: token,
  });

  await newUser.save();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // const mailOptions1 = {
  //   from: `"EchoLink" <${process.env.SMTP_EMAIL}>`,
  //   to: email,
  //   subject: "Welcome to EchoLink - Your Account Details",
  //   html: `
  //   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
  //     <h2 style="color: #4CAF50;">Welcome to EchoLink!</h2>
  //     <p style="font-size: 16px; color: #333;">Hi <strong>${email}</strong>,</p>
  //     <p style="font-size: 16px; color: #333;">Your account has been created successfully. Below are your login credentials:</p>
      
  //     <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
  //       <p><strong>Email:</strong> ${email}</p>
  //       <p><strong>Password:</strong> ${password}</p>
  //     </div>

  //     <p style="font-size: 14px; color: #666;">Please change your password after logging in for the first time for better security.</p>

  //     <p style="font-size: 14px; color: #999; margin-top: 30px;">If you didn’t request this email, please ignore it.</p>

  //     <p style="font-size: 14px; color: #4CAF50; margin-top: 40px;">— The EchoLink Team</p>
  //   </div>
  // `,
  // };

  const mailOptions2 = {
    from: `"EchoLink" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Verify Your Email & Complete Signup - EchoLink",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #4CAF50;">Confirm Your Email to Activate Your Account</h2>
      <p style="font-size: 16px; color: #333;">Hi <strong>${email}</strong>,</p>
      <p style="font-size: 16px; color: #333;">
        Thank you for signing up with <strong>EchoLink</strong>! To complete your registration, please verify your email by clicking the button below:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${confirmLink}" style="padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Verify Email
        </a>
      </div>

      <p style="font-size: 14px; color: #999;">
        Or copy and paste this link in your browser:
        <br />
        <a href="${confirmLink}" style="color: #4CAF50;">${confirmLink}</a>
      </p>

      <hr style="margin: 30px 0;" />

      <p style="font-size: 14px; color: #666;">Please verify your email first.</p>

      <p style="font-size: 14px; color: #999; margin-top: 30px;">If you didn’t request this email, you can safely ignore it.</p>

      <p style="font-size: 14px; color: #4CAF50; margin-top: 40px;">— The EchoLink Team</p>
    </div>
  `,
  };

  transporter.sendMail(isGoogle===false && mailOptions2);

  return res.status(201).json({
    message: "ok",
    // email,
    // password,
  });
}

async function UserLogin(res: NextApiResponse, data: any, jwtHeader: any) {
  const { email, password, isRemember, isGuestMode } = data;

  const requiredFields = {
    email: "Email is required",
    password: "Password is required",
  };

  for (const [field, message] of Object.entries(requiredFields)) {
    if (!data[field]) {
      return res.status(200).json({ message });
    }
  }

  const user = await UserModel.findOne({ email, isConfirmed: true });

  if (!user) {
    return res.status(200).json({ message: "Invalid email !" });
  }

  if (user.loginThrough === "direct") {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ message: "Invalid password !" });
    }
  }

  const token = await tokenGeneration(user);

  res.status(201).json({
    message: "ok",
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      expiryDate: user.expiryDate,
    },
  });
}

function tokenGeneration(user) {
  const token = jwt.sign(
    {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      roleId: user.role,
      expiryDate: user.expiryDate,
    },
    SECRET_KEY,
    { expiresIn: "24h" }
  );
  return token;
}

