import { describeResponse } from "../utils";

export default {
  "/wallets/{userId}": {
    get: {
      tags: ["wallets"],
      summary: "Fetch user wallets",
      operationId: "fetchUserWallets",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "ID of user that needs to be fetched",
          required: true,
          schema: {
            maximum: 10,
            minimum: 1,
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
        403: {
          description:
            "Permission denied (This means the user is not verified)",
          content: describeResponse(
            "Security requirement not met - Access restricted to user"
          ),
        },
        200: {
          description: "Successfully fetched wallets",
          content: describeResponse("Wallets", {
            fiatWallets: [
              {
                id: 1,
                balance: 44353.34,
                Currency: {
                  code: "NGN",
                  id: 1,
                },
                current: 2730,
                is_active: true,
              },
            ],
            cryptoWallets: [
              {
                id: 1,
                balance: 0.000545,
                Currency: {
                  code: "BTC",
                  id: 344,
                },
                current: 0.0004,
                is_active: true,
              },
            ],
          }),
        },
      },
    },
  },
};
