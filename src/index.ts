import { createServer } from "http";
import { config } from "dotenv";
config();
import { onShutdown } from "node-graceful-shutdown";
import { app } from "./app";
import { sequelize } from "./sequelize";
const port = process.env.PORT || 3000;

const server = createServer(app);

void (async () => {
  await sequelize.authenticate();
  await import("./jobs");
  server.listen(port, () =>
    console.info(`Server running on port ${port}`)
  );
})();


onShutdown(async () => {
  console.log("Closing http server.");
  await new Promise(resolve => {
    server.close(resolve);
  })
  console.log("Closing Database connection.");
  await sequelize.close();
})
