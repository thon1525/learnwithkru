import app from "./app";
import MongoDBConnector from "./database";
import { Channel } from "amqplib";
import { createQueueConnection } from "./queue/connection.queue";
import getConfig from "./utils/config";
import { logInit } from "./utils/logger";

export let authChannel: Channel;

async function initializeQueueConnection() {
  return (await createQueueConnection()) as Channel;
}

async function initializeDatabase(mongoUrl: string) {
  const mongodb = MongoDBConnector.getInstance();
  await mongodb.connect({ url: mongoUrl });
  return mongodb;
}

async function startServer(port: number) {
  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}


// run
async function run() {
  let server: ReturnType<typeof app.listen> | null = null;
  let mongodb: MongoDBConnector | null = null;
    
  try {
    const currentEnv = process.env.NODE_ENV || "development";
    const config = await getConfig(currentEnv);
    // Activate Logger
    logInit({ env: process.env.NODE_ENV, logLevel: config.logLevel });
    authChannel = await initializeQueueConnection();
    mongodb = await initializeDatabase(config.mongoUrl!);
    server = await startServer(parseInt(config.port!));

    const exitHandler = async () => {
      if (server) {
        server.close(async () => {
          console.log("Server closed.");
          if (mongodb) await mongodb.disconnect();
          console.log("MongoDB disconnected.");
          process.exit(1); // terminate the process due to error
        });
      } else {
        if (mongodb) await mongodb.disconnect();
        console.log("MongoDB disconnected.");
        process.exit(1);
      }
    };

    const unexpectedErrorHandler = (error: unknown) => {
      console.error("Unhandled error:", error);
      exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);
    process.on("SIGTERM", () => {
      console.log("SIGTERM received");
      if (server) server.close();
    });
  } catch (error) {
    console.error("Initialization error:", error);
    if (mongodb) await mongodb.disconnect();
    process.exit(1);
  }
}

run();
