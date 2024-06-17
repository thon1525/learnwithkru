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
exports.authChannel = void 0;
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./database"));
const connection_queue_1 = require("./queue/connection.queue");
const config_1 = __importDefault(require("./utils/config"));
function initializeQueueConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield (0, connection_queue_1.createQueueConnection)());
    });
}
function initializeDatabase(mongoUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongodb = database_1.default.getInstance();
        yield mongodb.connect({ url: mongoUrl });
        return mongodb;
    });
}
function startServer(port) {
    return __awaiter(this, void 0, void 0, function* () {
        return app_1.default.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    });
}
// run
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let server = null;
        let mongodb = null;
        try {
            const currentEnv = process.env.NODE_ENV || "development";
            const config = yield (0, config_1.default)(currentEnv);
            exports.authChannel = yield initializeQueueConnection();
            mongodb = yield initializeDatabase(config.mongoUrl);
            server = yield startServer(parseInt(config.port));
            const exitHandler = () => __awaiter(this, void 0, void 0, function* () {
                if (server) {
                    server.close(() => __awaiter(this, void 0, void 0, function* () {
                        console.log("Server closed.");
                        if (mongodb)
                            yield mongodb.disconnect();
                        console.log("MongoDB disconnected.");
                        process.exit(1); // terminate the process due to error
                    }));
                }
                else {
                    if (mongodb)
                        yield mongodb.disconnect();
                    console.log("MongoDB disconnected.");
                    process.exit(1);
                }
            });
            const unexpectedErrorHandler = (error) => {
                console.error("Unhandled error:", error);
                exitHandler();
            };
            process.on("uncaughtException", unexpectedErrorHandler);
            process.on("unhandledRejection", unexpectedErrorHandler);
            process.on("SIGTERM", () => {
                console.log("SIGTERM received");
                if (server)
                    server.close();
            });
        }
        catch (error) {
            console.error("Initialization error:", error);
            if (mongodb)
                yield mongodb.disconnect();
            process.exit(1);
        }
    });
}
run();
//# sourceMappingURL=server.js.map