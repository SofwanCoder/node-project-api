import { describeResponse } from "../utils";

export default {
  "/health": {
    get: {
      tags: ["system-health"],
      summary: "Get the health status",
      operationId: "checkHealth",
      responses: {
        500: {
          description: "Internal server error",
          content: describeResponse("Internal Error"),
        },
        200: {
          description: "System health is okay! API is active",
          content: describeResponse("Registration successful", {
            status: "OK",
          }),
        },
      },
    },
  },
};
