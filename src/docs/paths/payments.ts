import { describeRequest, describeResponse } from "../utils";

export default {
  "/payments/inwards/{userId}": {
    get: {
      tags: ["payments"],
      summary: "Fetch inwards payment",
      operationId: "fetchInwardsPayment",
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
          description: "Transactions fetched successfully",
          content: describeResponse(
            "User transaction details fetched successfully",
            {
              transactions: [
                {
                  id: 2,
                  reference: "fsuiw29ej9wcuihiodbcwec9wc",
                  user_id: 1,
                  currency_id: 1,
                  amount: 45000,
                  status: "SUBMITTED",
                  FiatCurrency: {
                    code: "NGN",
                    id: 1,
                    name: "Nigerian Naira",
                  },
                  created_at: new Date(),
                },
              ],
              meta: {
                count: 2,
                page: 1,
                per_page: 20,
              },
            }
          ),
        },
      },
    },
    post: {
      tags: ["payments"],
      summary: "Initiate payment inward",
      operationId: "initiateInwardsPayment",
      requestBody: {
        description: "Required data",
        content: describeRequest({
          currencyId: 2,
          amount: 43000,
        }),
        required: true,
      },
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "ID of requested user",
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
        410: {
          description: "User has no currency matching this request",
          content: describeResponse("User has no wallet for this currency"),
        },
        404: {
          description: "User account to fund not found",
          content: describeResponse("User account to fund not found"),
        },
        201: {
          description: "Transactions fetched successfully",
          content: describeResponse(
            "User transaction details fetched successfully",
            {
              transactions: {
                link:
                  "https://checkout-testing.herokuapp.com/v3/hosted/pay/f70b480ea3fc4fdf4cbf",
              },
            }
          ),
        },
      },
    },
  },
  "/payments/inwards/{userId}/{transactionId}": {
    get: {
      tags: ["payments"],
      summary: "Fetch transaction details",
      operationId: "fetchInwardPayment",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "ID of user that needs to be fetched",
          required: true,
          schema: {
            minimum: 1,
            type: "integer",
            format: "int64",
          },
        },
        {
          name: "transactionId",
          in: "path",
          description: "ID of transaction to apply action",
          required: true,
          schema: {
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
        404: {
          description: "The required transaction is not found",
          content: describeResponse("Transaction to cancel not found"),
        },
        200: {
          description: "Transaction details fetched successfully",
          content: describeResponse(
            "Transaction details fetched successfully",
            {
              id: 2,
              reference: "fkweuigcyiscbu7sygcuasuyecyausc",
              user_id: 2,
              currency_id: 1,
              amount: 4500,
              status: "DONE",
              created_at: new Date(),
              Currency: {
                code: "NGN",
                id: 1,
              },
            }
          ),
        },
      },
    },
    delete: {
      tags: ["payments"],
      summary: "Cancel inward payment",
      operationId: "cancelInwardsPayment",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "ID of user that needs to be fetched",
          required: true,
          schema: {
            minimum: 1,
            type: "integer",
            format: "int64",
          },
        },
        {
          name: "transactionId",
          in: "path",
          description: "ID of transaction to apply action",
          required: true,
          schema: {
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
        400: {
          description: "Transaction already resolved!",
          content: describeResponse(
            "Cannot cancel transaction. (Already resolved)"
          ),
        },
        404: {
          description: "The required transaction is not found",
          content: describeResponse("Transaction to cancel not found"),
        },
        410: {
          description: "Transaction already cancelled",
          content: describeResponse("Transaction already cancelled"),
        },
        200: {
          description: "Transactions cancelled successfully",
          content: describeResponse(
            "User transaction details fetched successfully"
          ),
        },
      },
    },
  },
  "/payments/outwards/get-transaction-fee": {
    get: {
      tags: ["payments"],
      summary: "Get withdrawal fee",
      operationId: "fetchWithdrawalFee",
      requestBody: {
        description: "Required data",
        content: describeRequest({
          currencyId: 2,
          amount: 43000,
        }),
        required: true,
      },
      responses: {
        401: {
          description: "Security token missing or invalid",
          content: describeResponse("Security requirement not met"),
        },
        404: {
          description: "The Currency supplied was not found",
          content: describeResponse("Selected currency not found"),
        },
        200: {
          description: "Transaction details fetched successfully",
          content: describeResponse(
            "Transaction details fetched successfully",
            {
              fee: 50.4,
            }
          ),
        },
      },
    },
  },
  "/payments/outwards/{userId}": {
    get: {
      tags: ["payments"],
      summary: "Fetch outwards payment",
      operationId: "fetchOutwardsPayment",
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
          description: "Transactions fetched successfully",
          content: describeResponse(
            "User transaction details fetched successfully",
            {
              transactions: [
                {
                  id: 2,
                  reference: "fsuiw29ej9wcuihiodbcwec9wc",
                  user_id: 1,
                  currency: "NGN",
                  amount: 45000,
                  status: "SUBMITTED",
                  created_at: new Date(),
                },
              ],
              meta: {
                count: 2,
                page: 1,
                per_page: 20,
              },
            }
          ),
        },
      },
    },
    put: {
      tags: ["payments"],
      summary: "Initiate payment to saved bank account",
      operationId: "initiateOutwardsPayment",
      requestBody: {
        description: "Required data",
        content: describeRequest({
          fiatWalletId: 2,
          bankAccountId: 2,
          transactionPin: "3823",
          amount: 43000,
        }),
        required: true,
      },
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "ID of requested user",
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
        500: {
          description: "The specified wallet was not found",
          content: describeResponse("The specified wallet was not found"),
        },
        400: {
          description:
            "User needs to set transaction pin before attempting this transaction",
          content: describeResponse(
            "User has no transaction pin set. Please set pin first"
          ),
        },
        401: {
          description: "Security token missing or invalid",
          content: describeResponse("Security requirement not met"),
        },
        403: {
          description: "Insufficient fund in the currency wallet",
          content: describeResponse("Insufficient funds"),
        },
        405: {
          description: "Not allowed because user account is not found",
          content: describeResponse("User not found"),
        },
        410: {
          description: "User has no currency matching this request",
          content: describeResponse("User has no wallet for this currency"),
        },
        404: {
          description: "The bank account ID supplied was not found",
          content: describeResponse("Bank account specified not found"),
        },
        406: {
          description: "Currency mismatched",
          content: describeResponse(
            "Currency to be withdrawn doesn't match chosen destination currency"
          ),
        },
        200: {
          description: "Withdrawal request initiated successfully",
          content: describeResponse(
            "Withdrawal request initiated successfully"
          ),
        },
      },
    },
    post: {
      tags: ["payments"],
      summary: "Initiate payment to third party account",
      operationId: "initiateOutwardsThirdPartyPayment",
      requestBody: {
        description: "Required data",
        content: describeRequest({
          accountNumber: "123445444333",
          bankCode: "123",
          fiatWalletId: 2,
          transactionPin: "3823",
          amount: 43000,
        }),
        required: true,
      },
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "ID of requested user",
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
        500: {
          description: "The specified wallet was not found",
          content: describeResponse("The specified wallet was not found"),
        },
        400: {
          description:
            "User needs to set transaction pin before attempting this transaction",
          content: describeResponse(
            "User has no transaction pin set. Please set pin first"
          ),
        },
        401: {
          description: "Security token missing or invalid",
          content: describeResponse("Security requirement not met"),
        },
        403: {
          description: "Insufficient fund in the currency wallet",
          content: describeResponse("Insufficient funds"),
        },
        405: {
          description: "Not allowed because user account is not found",
          content: describeResponse("User not found"),
        },
        410: {
          description: "User has no currency matching this request",
          content: describeResponse("User has no wallet for this currency"),
        },
        404: {
          description: "The bank account ID supplied was not found",
          content: describeResponse("Bank account specified not found"),
        },
        406: {
          description: "Currency mismatched",
          content: describeResponse(
            "Currency to be withdrawn doesn't match chosen destination currency"
          ),
        },
        200: {
          description: "Withdrawal request initiated successfully",
          content: describeResponse(
            "Withdrawal request initiated successfully"
          ),
        },
      },
    },
  },
  "/payments/outwards/{userId}/{transactionId}": {
    get: {
      tags: ["payments"],
      summary: "Fetch transaction details",
      operationId: "fetchOutwardPayment",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "ID of user that needs to be fetched",
          required: true,
          schema: {
            minimum: 1,
            type: "integer",
            format: "int64",
          },
        },
        {
          name: "transactionId",
          in: "path",
          description: "ID of transaction to apply action",
          required: true,
          schema: {
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
        404: {
          description: "The required transaction is not found",
          content: describeResponse("Transaction to cancel not found"),
        },
        200: {
          description: "Transaction details fetched successfully",
          content: describeResponse(
            "Transaction details fetched successfully",
            {
              id: 2,
              reference: "fkweuigcyiscbu7sygcuasuyecyausc",
              user_id: 2,
              currency_id: 1,
              amount: 4500,
              status: "DONE",
              created_at: new Date(),
              Currency: {
                code: "NGN",
                id: 1,
              },
            }
          ),
        },
      },
    },
    delete: {
      tags: ["payments"],
      summary: "Cancel outward payment",
      operationId: "cancelOutwardPayment",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "ID of user that needs to be fetched",
          required: true,
          schema: {
            minimum: 1,
            type: "integer",
            format: "int64",
          },
        },
        {
          name: "transactionId",
          in: "path",
          description: "ID of transaction to apply action",
          required: true,
          schema: {
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
        400: {
          description: "Transaction already resolved!",
          content: describeResponse(
            "Cannot cancel transaction. (Already resolved)"
          ),
        },
        404: {
          description: "The required transaction is not found",
          content: describeResponse("Transaction to cancel not found"),
        },
        410: {
          description: "Transaction already cancelled",
          content: describeResponse("Transaction already cancelled"),
        },
        500: {
          description: "Critical internal error",
          content: describeResponse("Internal error encountered"),
        },
        200: {
          description: "Transactions cancelled successfully",
          content: describeResponse(
            "User transaction details fetched successfully"
          ),
        },
      },
    },
  },
};
