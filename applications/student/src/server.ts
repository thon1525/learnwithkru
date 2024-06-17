import app from "./app";
import MongoDBConnector from "./database";
import getConfig from "./utils/config";
async function run() {
  try {
    // set currect
    const currentEnv = process.env.NODE_ENV || "development";
    const config =  getConfig(currentEnv);

    // Activate Database
    const mongodb = MongoDBConnector.getInstance();
    await mongodb.connect({ url: config.mongoUrl as string });
    // Start Server
    const server = app.listen(config.port, () => {});
    const exitHandler = async () => {
      if (server) {
        server.close(async () => {
          console.log("server closed!");
          await mongodb.disconnect();
          console.log("mongodb disconnected!");

          // Gracefully Terminate
          process.exit(1); // terminate the process due to error
        });
      } else {
        await mongodb.disconnect(); // In case the server isn't running but DB needs to be disconnected
        console.log("MongoDB disconnected.");
        process.exit(1);
      }
    };
    const unexpectedErrorHandler = (error: unknown) => {
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
  } catch (error) {
    console.log(error);
  }
}

run();
