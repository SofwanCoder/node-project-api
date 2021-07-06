export default [
  {
    url: "{protocol}://{environment}.{host}/{version}",
    variables: {
      protocol: {
        default: "https",
        enum: ["http", "https"],
        description: "The http protocol",
      },
      host: {
        default: "localhost:5000",
        enum: ["localhost:5000", "project.com"],
        description: "The Host protocol",
      },
      environment: {
        default: "api",
        enum: ["api", "api.staging"],
      },
      version: {
        default: "v2",
        enum: ["v1", "v2"],
      },
    },
  },
];
