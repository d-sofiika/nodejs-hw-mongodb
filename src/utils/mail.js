import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.SMTP_SERVER);
const transport = nodemailer.createTransport({
  host: SMTP.SERVER,
  port: SMTP.PORT,
  secure: false,
  auth: {
    user: SMTP.USER,
    pass: SMTP.PASSWORD,
  },
  
});

export const sendMail = (message) => {
  return transport.sendMail(message);
};
