import { describeResponse } from "../../utils";
export default {
  "/users/": {
    get: {
      tags: ["users"],
      summary: "Get all registered users (Requires admin permission only)",
      operationId: "fetchAllUsers",
      parameters: [
        {
          name: "page",
          in: "query",
          description: "Current page",
          schema: {
            minimum: 1,
            default: 1,
            type: "integer",
            format: "int64",
          },
        },
        {
          name: "per_page",
          in: "query",
          description: "Number of record to fetch per page",
          schema: {
            minimum: 10,
            default: 20,
            type: "integer",
            format: "int64",
          },
        },
      ],
      responses: {
        401: {
          description: "Security token missing or invalid",
          content: describeResponse("Security requirement not met"),
        },
        200: {
          description: "Successfully fetched users",
          content: describeResponse("Users data fetched successfully", {
            users: [
              {
                id: 1,
                clearance: 1,
                email: "example@example.com",
                username: "uniqueuser",
                is_verified: false,
                created_at: "2021-04-09T20:54:17.000Z",
                updated_at: "2021-04-09T20:54:17.000Z",
                Profile: {
                  user_id: 1,
                  first_name: "Example",
                  last_name: "User",
                  is_phone_verified: false,
                  phone: "+2348090001209",
                },
              },
            ],
            meta: {
              count: 1,
              page: 0,
              per_page: 20,
            },
          }),
        },
      },
    },
  },
};
