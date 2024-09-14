export const mailConfig = {
  host: process.env.MAILER_HOST || '',
  port: process.env.MAILER_PORT || 587,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
};
