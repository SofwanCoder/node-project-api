export function describeResponse(
  message = "Task completed/pending/successful",
  data: any = {}
) {
  return {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          data: {
            type: "object",
            example: data,
          },
          message: {
            type: "string",
            example: message,
          },
        },
      },
    },
  };
}

export function describeRequest(data: any = {}) {
  const properties: any = {};
  const keys = Object.keys(data);
  for (const key of keys) {
    properties[key] = {
      type: typeof data[key],
      example: data[key],
    };
  }
  return {
    "application/json": {
      schema: {
        type: "object",
        properties,
      },
    },
  };
}
