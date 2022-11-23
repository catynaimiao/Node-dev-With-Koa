// koa内核
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";
import * as helmet from "koa-helmet";
const cors = require("koa2-cors");
// 中间件
import { logInfo } from "./src/middlewares/logger";
import { error } from "./src/middlewares/response";
import router from "./src/routers";
// 数据库service
import { connectToDatabase } from "./src/services/database.service";
require("dotenv").config();
// 跨域设定
import corsconfig from "./src/middlewares/cors";

const app = new Koa();

// 日志中间件加载
app.use(logInfo);

app.use(error); // 统一异常处理管理

// 内核中间件
app.use(bodyParser()); // Post请求中间件
app.use(helmet()); // 网络安全中间件
app.use(cors(corsconfig));

// 路由挂载
app.use(router.routes());

// 服务器启动函数
const run = async () => {
  await connectToDatabase();
  app.listen(process.env.PROJECT_PORT || 3000);

  console.log(
    `[${process.env.PROJECT_NAME}]has serviced at http://localhost:${
      process.env.PROJECT_PORT || 3000
    }`
  );
};

run();
