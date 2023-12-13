import { Unleash } from "unleash-client";
import Features from "./enums/features";
import config from "./config";
import logger from "./internal/logger";

const unleash = Unleash.getInstance({
  url: config.unleash.url,
  appName: config.unleash.appName,
  instanceId: config.unleash.instanceId,
  refreshInterval: 15000,
  disableMetrics: true,
  disableAutoStart: true,
});

unleash.on("ready", () => logger.info("Unleash is ready"));
unleash.on("synchronized", () => logger.info("Unleash is synchronized"));
unleash.on("error", () => logger.info("Unleash error occurred"));

unleash.once("registered", () => {
  console.log("Registered with unleash");
});

export default class FeatureFlag {
  private static initialized = false;
  static async init() {
    if (FeatureFlag.initialized) return;
    await unleash.start();
    unleash.isSynchronized();
    FeatureFlag.initialized = true;
  }

  static isEnabled(feature: Features) {
    return unleash.isEnabled(feature);
  }
}
