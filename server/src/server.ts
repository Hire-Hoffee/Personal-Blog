import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes";
import path from "path";
import defaultErrorHandler from "./middlewares/errorHandlerMiddleware";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";
import history from "connect-history-api-fallback";
import fs from "fs";

dotenv.config();

const app = express();

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(
  history({
    rewrites: [
      // @ts-ignore
      { from: /^\/api\/.*$/, to: (context) => context.parsedUrl.path },
      // @ts-ignore
      { from: /^\/api-docs\/.*$/, to: (context) => context.parsedUrl.path },
    ],
  })
);
app.use(express.static(path.join(__dirname, "../../client/dist/")));
app.use(express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../../client/dist/", "index.html"));
  } catch (error) {
    next(error);
  }
});

app.use("/api", apiRoutes);
app.use(defaultErrorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
