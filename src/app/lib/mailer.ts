import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const Mail = nodemailer.createTransport({
  host: process.env.MAILER_HOST as string,
  port: process.env.MAILER_PORT || 587,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
} as SMTPTransport.Options);