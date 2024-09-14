import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { mailConfig } from "../config/mail.config";

export const Mail = nodemailer.createTransport(mailConfig as SMTPTransport.Options);