import { describeRequest, describeResponse } from "../utils";

export default {
  "/misc/get-banks/{country}": {
    get: {
      tags: ["misc"],
      summary: "Fetch banks for country",
      operationId: "fetchCountryBanks",
      parameters: [
        {
          name: "country",
          in: "path",
          description: "The country (2 Letter) code to fetch",
          required: true,
          schema: {
            type: "string",
            enum: ["NG", "GH"],
          },
        },
      ],
      responses: {
        401: {
          description: "Security token missing or invalid",
          content: describeResponse("Security requirement not met"),
        },
        500: {
          description: "Unable to fetch bank details for country",
          content: describeResponse("Error fetching banks details for"),
        },
        200: {
          description: "Successfully Added bank account",
          content: describeResponse("fetched banks successfully", {
            banks: [
              {
                id: 2,
                code: "023",
                name: "Citi Bank",
              },
              {
                id: 4,
                code: "050",
                name: "EcoBank PLC",
              },
              {
                id: 5,
                code: "011",
                name: "First Bank PLC",
              },
              {
                id: 6,
                code: "214",
                name: "First City Monument Bank",
              },
            ],
          }),
        },
      },
    },
  },
  "/misc/get-bank-branches/{bankId}": {
    get: {
      tags: ["misc"],
      summary: "Fetch banks branch for bankId",
      operationId: "fetchBankBranch",
      parameters: [
        {
          name: "bankId",
          in: "path",
          description: "The BankID to fetch branch for",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        404: {
          description: "Can't find any bank branch or bankId is invalid",
          content: describeResponse("No bank branches found for bank selected"),
        },
        401: {
          description: "Security token missing or invalid",
          content: describeResponse("Security requirement not met"),
        },
        500: {
          description: "Error fetching bank branches",
          content: describeResponse("Error fetching bank branches for Bank"),
        },
        200: {
          description: "Fetch bank branches for bank successfully",
          content: describeResponse("fetched banks branches successfully", {
            bankBranches: [],
          }),
        },
      },
    },
  },
  "/misc/verify-bank-details": {
    post: {
      tags: ["misc"],
      summary: "Verify Bank account details",
      operationId: "verifyBankDetails",
      requestBody: {
        description: "Required data",
        content: describeRequest({
          accountNumber: "123445444333",
          bankCode: "323",
        }),
        required: true,
      },
      responses: {
        400: {
          description: "Error verifying the account",
          content: describeResponse(
            "Bank account could not be validated - Incorrect bank details"
          ),
        },
        401: {
          description: "Security token missing or invalid",
          content: describeResponse("Security requirement not met"),
        },
        500: {
          description: "Error verifying bank details",
          content: describeResponse("Error verifying bank details"),
        },
        200: {
          description: "Fetch bank branches for bank successfully",
          content: describeResponse("fetched banks branches successfully", {
            bankDetails: {
              valid: true,
              accountName: "EXAMPLE USER AWESOME",
            },
          }),
        },
      },
    },
  },
  "/misc/crypto-currencies": {
    get: {
      tags: ["misc"],
      summary: "Fetch supported crypto currencies",
      operationId: "fetchCryptoCurrencies",
      responses: {
        401: {
          description: "Security token missing or invalid",
          content: describeResponse("Security requirement not met"),
        },
        200: {
          description: "Successfully fetched available crypto currencies",
          content: describeResponse("fetched available crypto currencies", {
            crypto: [
              {
                id: 2,
                code: "BTC",
                name: "Bitcoin",
                rate: 60000,
              },
            ],
          }),
        },
      },
    },
  },
  "/misc/fiat-currencies": {
    get: {
      tags: ["misc"],
      summary: "Fetch supported fiat currencies",
      operationId: "fetchFiatCurrencies",
      responses: {
        401: {
          description: "Security token missing or invalid",
          content: describeResponse("Security requirement not met"),
        },
        200: {
          description: "Successfully fetched available fiat currencies",
          content: describeResponse("fetched available fiat currencies", {
            crypto: [
              {
                id: 2,
                code: "NGN",
                name: "Nigerian Naira",
                we_buy: 454,
                we_sell: 468,
              },
            ],
          }),
        },
      },
    },
  },
  "/misc/card-currencies": {
    get: {
      tags: ["misc"],
      summary: "Fetch supported gift card currencies",
      operationId: "cardFiatCurrencies",
      responses: {
        401: {
          description: "Security token missing or invalid",
          content: describeResponse("Security requirement not met"),
        },
        200: {
          description: "Successfully fetched available card currencies",
          content: describeResponse("fetched available card currencies", {
            currencies: [
              {
                id: 2,
                code: "USD",
                name: "United State Dollars",
                rate: 1,
              },
            ],
          }),
        },
      },
    },
  },
  "/misc/upload-file": {
    post: {
      tags: ["misc"],
      summary: "Upload a file",
      operationId: "uploadFile",
      requestBody: {
        description: "Required data",
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                  required: true,
                },
              },
            },
          },
        },
        required: true,
      },
      responses: {
        401: {
          description: "Security token missing or invalid",
          content: describeResponse("Security requirement not met"),
        },
        400: {
          description: "No file uploaded",
          content: describeResponse("No file uploaded"),
        },
        500: {
          description: "Error occurred while saving the file",
          content: describeResponse("Error occurred while saving the file"),
        },
        201: {
          description: "S",
          content: describeResponse("Created File successfully", {
            publicUrl: "https://google.com",
          }),
        },
      },
    },
  },
  "/misc/upload-signed": {
    get: {
      tags: ["misc"],
      summary: "Upload via signed link",
      operationId: "uploadSignedFile",
      responses: {
        401: {
          description: "Security token missing or invalid",
          content: describeResponse("Security requirement not met"),
        },
        500: {
          description: "Error occurred while creating the file",
          content: describeResponse("Error occurred while saving the file"),
        },
        201: {
          description: "S",
          content: describeResponse("Created File successfully", {
            publicUrl: "https://google.com",
            signedUrl: "https://google.com",
          }),
        },
      },
    },
  },
  "/misc/convert-fx": {
    post: {
      tags: ["misc"],
      summary: "Convert from one currency to another",
      operationId: "convertFxRates",
      requestBody: {
        description: "Convert from one currency to another",
        content: describeRequest({
          from: "NGN",
          to: "GHS",
          amount: 1000,
        }),
        required: true,
      },
      responses: {
        500: {
          description: "Error Making conversion",
          content: describeResponse("Error making conversion"),
        },
        200: {
          description: "Converted successfully",
          content: describeResponse("fetched banks branches successfully", {
            rate: 497,
            from: {
              currency: "USD",
              amount: 1000,
            },
            to: {
              currency: "NGN",
              amount: 497000,
            },
          }),
        },
      },
    },
  },
};
