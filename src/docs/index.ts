import components from "./components";
import info from "./info";
import paths from "./paths";
import security from "./security";
import servers from "./servers";
import tags from "./tags";

export default {
  openapi: "3.0.0",
  externalDocs: {
    description: "Find out more about Swagger",
    url: "https://swagger.io",
  },
  tags,
  info,
  servers,
  components,
  security,
  paths,
};
