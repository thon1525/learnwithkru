import express, { Application } from "express";
import { errorHandler } from "./middlewares/errorsHandler";
import path from "path";
import cors from "cors";
import getConfig from "./utils/config";
import loggerMiddleware from "./middlewares/logger-handler";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/v1/routes";
import { io as Client } from 'socket.io-client';

//app
const app: Application = express();

const currentEnv = process.env.NODE_ENV || "production";
const config = getConfig(currentEnv);

//global middlewares
app.set("trust proxy", 1);
app.use(
  cors({
    origin: config.apiGateway,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.static("public"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(loggerMiddleware);

// handle swaggerUi
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
// app.use(AUTH_ROUTE,Routehealths)
RegisterRoutes(app);
const notificationServiceUrl = 'http://localhost:3005'; // URL of the notification service
const socket = Client(notificationServiceUrl); // Connect to the notification service
app.post('/teachers/sendMessage', (req, res) => {
  const { message} = req.body;
 socket.emit('chat message', { sender: 'teacher', message }); // Send message to notification service

    res.send('Message sent to student');
});
//error handler
app.use(errorHandler);
export default app;
