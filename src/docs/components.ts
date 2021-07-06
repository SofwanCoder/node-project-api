export default {
  schemas: {
    user: {
      properties: {
        id: {
          type: "integer",
        },
        name: {
          type: "string",
        },
      },
    },
  },

  securitySchemes: {
    Authorization: {
      type: "apiKey",
      in: "header",
      name: "X-AUTH-TOKEN",
    },
  },
};
