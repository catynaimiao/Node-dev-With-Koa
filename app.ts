import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import { connectToDatabase } from "./src/services/database.service";
import * as Router from "koa-router";

import router from "./src/routers";
require("dotenv").config();

const app = new Koa();
connectToDatabase().then(() => {
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(process.env.PROJECT_PORT || 3000);

  console.log(
    `[${process.env.PROJECT_NAME}]has serviced at http://localhost:${
      process.env.PROJECT_PORT || 3000
    }`
  );
});
