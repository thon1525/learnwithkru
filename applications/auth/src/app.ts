import express, { Application } from "express";
import { errorHandler } from "./middlewares/errorsHandler";
import path from "path";
import cors from "cors";
import loggerMiddleware from "./middlewares/logger-handler";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/v1/routes";
import getConfig from "./utils/config";

const app: Application = express();

const currentEnv = process.env.NODE_ENV || "development";
const config = getConfig(currentEnv);

//global middleware
app.set("trust proxy", 1);
app.use(
  cors({
    origin: config.apiGateway,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.static("public"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(loggerMiddleware);

// Serve the Swagger UI
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json", // Point to the generated Swagger JSON file
    },
  })
);

// Serve the generated Swagger JSON file
app.get("/swagger.json", (_req, res) => {
  res.sendFile(path.join(__dirname, "./swagger-dist/swagger.json"));
});

// Register routes generated
RegisterRoutes(app);

//error handler middlewares
app.use(errorHandler);
export default app;
