import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
import path = require("path");
dotenv.config();

const models = {
  Auth: { username: "lorem", password: "ipsum" },
  Logged: { token: "token", id: 1, username: "username" },
  Post: {
    id: 1,
    content: "text",
    media: "url",
    authorId: 1,
    createdAt: Date(),
    author: { username: "username" },
  },
  Posts: [{ $ref: "#/definitions/Post" }],
};

const doc = {
  info: {
    version: "v1.0.0",
    title: "Swagger Blog Project",
    description: "Swagger documentation of Blog Project",
  },
  servers: [
    {
      url: process.env.STATUS === "DEV" ? "http://localhost:7005/api" : process.env.API_URL,
      description: "Server URL",
    },
  ],
  definitions: models,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = path.join(__dirname, "../../swagger_output.json");
const endpointsFiles = ["./src/routes/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
