import logger from "../lib/logger";

async function seeder() {
}

export default async function () {
  try {
    await seeder();
  } catch (e) {
    logger.info("Already seeded");
  }
}
