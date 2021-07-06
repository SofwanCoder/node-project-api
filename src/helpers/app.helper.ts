import config from "../config";
import { emailHelper } from "./email.helper";

const adminEmail = config.app.email || "";

export class AppHelper {
  private readonly email: string;

  public constructor(email: string = adminEmail) {
    this.email = email;
  }

  public async notifyAdmin(
    message: string,
    subject = "New Admin Correspondent",
    replyTo = "noreply@waploaded.com"
  ) {
    await emailHelper
      .sendMessage(message, subject, this.email, replyTo)
      .catch();
  }
}

export const appHelper = new AppHelper();
