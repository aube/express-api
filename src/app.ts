import express from "express";
import { apiRouter } from "./routes";
import { ItemModel } from "./models";
import * as middlewares from "./middlewares";
import "dotenv/config";

// init store
new ItemModel();

const PORT = Number(process.env.SERVER_PORT || 3000);
const ADDRESS = String(process.env.SERVER_IP || "127.0.0.1");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(middlewares.midCors);

app.use(middlewares.midLogger);

app.use(apiRouter());

app.listen(PORT, ADDRESS, () => {
  console.log("Server started at", ADDRESS, ", port:", PORT);
});
