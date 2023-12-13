import { createTransport } from "nodemailer";
import config from "../config";
import logger from "../internal/logger";

const smtpUser = config.smtp.user || "user";
const smtpPass = config.smtp.pass || "pass";
const smtpPort = config.smtp.port || 25;
const smtpHost = config.smtp.host || "localhost";
const smtpSecure = false;

const port = Number(smtpPort);

const transporter = createTransport({
  pool: true,
  host: smtpHost,
  port,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export async function sendEmailMessage(
  message: string,
  subject: string,
  to: string | string[],
  replyTo?: string,
) {
  await transporter
    .sendMail({
      to,
      from: {
        name: "Errandboy From Sourcegrid",
        address: "noreply@sourcegrid.io",
      },
      subject,
      html: message,
      replyTo: replyTo || undefined,
    })
    .catch(logger.error);
}

export async function sendMail({
  html,
  replyTo,
  subject,
  to,
}: {
  html: string;
  subject: string;
  to: string;
  replyTo?: string;
}) {
  await sendEmailMessage(html, subject, to, replyTo);
}

export async function sendIndividually(
  to: string[],
  subject: string,
  message: string,
) {
  const promises: Array<Promise<void>> = [];
  to.forEach((to) => {
    promises.push(sendEmailMessage(message, subject, to));
  });
  try {
    await Promise.all(promises);
  } catch (e) {
    logger.info(e);
  }
}
