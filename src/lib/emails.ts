/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EMAIL_HOST,
  MAILTRAP_PASSWORD,
  MAILTRAP_USER,
} from "@/utils/constants";
import nodeMailer from "nodemailer";

export const sendEmailWithNodemailer = async (emailData: any) => {
  const transporter = nodeMailer.createTransport({
    host: EMAIL_HOST,
    port: 587,

    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail(emailData);
    // console.log(`Message sent: ${info.response}`);
    return info;
  } catch (error: any) {
    // console.error(`Problem sending email: ${error.message}`);
    throw error;
  }
};
