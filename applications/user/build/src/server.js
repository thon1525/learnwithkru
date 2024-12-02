"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./database"));
const config_1 = __importDefault(require("./utils/config"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // currect env
            const currentEnv = process.env.NODE_ENV || "production";
            const config = (0, config_1.default)(currentEnv);
            // Activate Database
            const mongodb = database_1.default.getInstance();
            yield mongodb.connect({ url: config.mongoUrl });
            // Start Server
            const server = app_1.default.listen(config.port, () => { });
            const exitHandler = () => __awaiter(this, void 0, void 0, function* () {
                if (server) {
                    server.close(() => __awaiter(this, void 0, void 0, function* () {
                        console.log("server closed!");
                        yield mongodb.disconnect();
                        console.log("mongodb disconnected!");
                        // Gracefully Terminate
                        process.exit(1); // terminate the process due to error
                    }));
                }
                else {
                    yield mongodb.disconnect(); // In case the server isn't running but DB needs to be disconnected
                    console.log("MongoDB disconnected.");
                    process.exit(1);
                }
            });
            const unexpectedErrorHandler = (error) => {
                console.log("unhandled error", { error });
                exitHandler();
            };
            // Error that might occur duing execution that not caught by any try/catch blocks
            process.on("uncaughtException", unexpectedErrorHandler); // Syncronous
            process.on("unhandledRejection", unexpectedErrorHandler); // Asyncronous
            // A termination signal typically sent from OS or other software (DOCKER, KUBERNETES)
            process.on("SIGTERM", () => {
                console.log("SIGTERM received");
                if (server) {
                    // Stop the server from accepting new request but keeps existing connection open until all ongoin request are done
                    server.close();
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
run();
//# sourceMappingURL=server.js.map