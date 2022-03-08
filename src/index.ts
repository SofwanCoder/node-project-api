import { createServer } from "http";
import { config } from "dotenv";
config();
import { app } from "./app";
// import { sequelize } from "./sequelize";
const port = process.env.PORT || 3000;

void (async () => {
  // await sequelize.sync({
  //   logging: console.log,
  // });
  await import("./jobs");
  createServer(app).listen(port, () =>
    console.info(`Server running on port ${port}`)
  );
})();
