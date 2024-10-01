import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user.js"
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { Session } from '../db/models/session.js';
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, SMTP } from "../constants/index.js";
import { sendMail } from "../utils/mail.js";
import jwt from "jsonwebtoken";

export const registerUser = async (payload) => {
    const maybeUser = await UsersCollection.findOne({ email: payload.email });
 if (maybeUser !== null) {
    throw createHttpError(409, 'Email in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

    return await UsersCollection.create(payload);
}
export const loginUser = async (email, password) => {
  const maybeUser = await UsersCollection.findOne({ email });
  
   if (maybeUser === null) {
    throw createHttpError(404, 'User not found');
  }
   const isMatch = await bcrypt.compare(password, maybeUser.password);
  if (isMatch === false) {
    throw createHttpError(401, 'Unauthorized');
  }
 await Session.deleteOne({ userId: maybeUser._id });
  return Session.create({
    userId: maybeUser._id,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
}

export const refreshUserSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });
  if (session === null) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Refresh token is expired');
  }
   
  await Session.deleteOne({ _id: sessionId });

  return Session.create({
     userId: session.userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  })
}

export function logoutUser(sessionId) {
  return Session.deleteOne({ _id: sessionId });
}

export async function requestResetEmail(email) {
  console.log("Received email:", email);
  const user = await UsersCollection.findOne({ email })
  if (user === null) {
    throw createHttpError(404, "User not found!")
    
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '5m' },
  );

 const resetUrl = `${process.env.APP_DOMAIN}/reset-password?token=${resetToken}`;
  console.log("Generated reset URL:", resetUrl);

  try {
    console.log("Attempting to send email");
    await sendMail({
      from: SMTP.FROM_EMAIL,
      to: email,
      subject: "Reset your password",
      html: `<h1>Please open this <a href="${resetUrl}">link</a> to reset your password</h1>`
    })
      console.log("Email sent successfully");
  } catch  (err) {
     console.error("Failed to send email:", err);
    throw createHttpError(500, "Failed to send the email, please try again later.");
  }
}

export async function resetPassword(password, token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await UsersCollection.findOne({_id:decoded.sub, email:decoded.email})
 if (user === null) {
  throw createHttpError(404,"User not found!" )
 }
    const hashedPassword = await bcrypt.hash(password, 10);
    
     await UsersCollection.findOneAndUpdate(
      { _id: user._id },
      { password: hashedPassword },
    );
  } catch (error) {
    if (error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError') {
      throw createHttpError(401,"Token is expired or invalid.")
    }
  }


}