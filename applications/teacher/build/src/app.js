"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorsHandler_1 = require("./middlewares/errorsHandler");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./utils/config"));
const logger_handler_1 = __importDefault(require("./middlewares/logger-handler"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = require("./routes/v1/routes");
//app
const app = (0, express_1.default)();
const currentEnv = process.env.NODE_ENV || "production";
const config = (0, config_1.default)(currentEnv);
//global middlewares
app.set("trust proxy", 1);
app.use((0, cors_1.default)({
    origin: config.apiGateway,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express_1.default.static("public"));
app.use(express_1.default.json({ limit: "100mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "200mb" }));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use(logger_handler_1.default);
// handle swaggerUi
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json", // Point to the generated Swagger JSON file
    },
}));
// Serve the generated Swagger JSON file
app.get("/swagger.json", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "./swagger-dist/swagger.json"));
});
// app.use(AUTH_ROUTE,Routehealths)
(0, routes_1.RegisterRoutes)(app);
//error handler
app.use(errorsHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map