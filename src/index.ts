import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import { createServer } from "http";
import { onShutdown } from "node-graceful-shutdown";
import { app } from "./app";
import { sequelize } from "./sequelize";
import FeatureFlag from "./fflag";
import config from "./config";

const server = createServer(app);

void (async () => {
  await sequelize.authenticate({});
  await FeatureFlag.init();
  server.listen(config.port, () => {
    console.info(`Server running on port ${config.port}`);
  });
})();

onShutdown(async () => {
  console.log("Closing http server.");
  await new Promise((resolve) => {
    server.close(resolve);
  });
  console.log("Closing Database connection.");
  await sequelize.close();
});
