import logger from "../lib/logger";

export class EmailHelper {
  public constructor() {}

  public async sendMessage(
    message: string,
    subject: string,
    to: string | string[],
    replyTo?: string
  ) {}

  public async sendIndividually(
    to: string[],
    subject: string,
    message: string
  ) {
    const promises: Promise<void>[] = [];
    to.forEach((to) => {
      promises.push(this.sendMessage(message, subject, to));
    });
    try {
      await Promise.all(promises);
    } catch (e) {
      logger.info(e);
    }
  }
}

export const emailHelper = new EmailHelper();
