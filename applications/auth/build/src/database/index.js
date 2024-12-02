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
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDBConnector {
    constructor() {
        this.mongoUrl = "";
        this.db = mongoose_1.default.connection;
        this.setupEventListeners();
    }
    static getInstance() {
        if (!MongoDBConnector.instance) {
            MongoDBConnector.instance = new MongoDBConnector();
        }
        return MongoDBConnector.instance;
    }
    static resetInstance() {
        MongoDBConnector.instance = new MongoDBConnector();
    }
    setupEventListeners() {
        this.db.on("connected", () => {
            console.log("MongoDB connected");
        });
        this.db.on("error", (error) => {
            console.log("Error in MongoDB connection", { error });
        });
        this.db.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
    }
    connect(_a) {
        return __awaiter(this, arguments, void 0, function* ({ url }) {
            this.mongoUrl = url;
            try {
                yield mongoose_1.default.connect(this.mongoUrl);
                console.log("Successfully connected to MongoDB");
            }
            catch (err) {
                console.log("Initial MongoDB connection error", { err });
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.disconnect();
            this.db.removeAllListeners();
            console.log("MongoDB disconnected and listeners removed");
        });
    }
}
exports.default = MongoDBConnector;
//# sourceMappingURL=index.js.map