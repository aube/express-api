import express from "express";
import { apiRouter } from "./routes";
import { ItemModel } from "./models";
import * as middlewares from "./middlewares";

// init store
new ItemModel();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(middlewares.midCors);

app.use(middlewares.midLogger);

app.use(apiRouter());

app.listen(3000);
