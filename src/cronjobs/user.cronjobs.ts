import { schedule } from "node-cron";
import logger from "../lib/logger";

function sendGreetings() {
  logger.info("Sending greetings");
}

// Every 1 hour
schedule("0 */1 * * *", sendGreetings);
