// koa核心依赖
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
// 数据库依赖
import { ObjectId } from "mongodb";
import * as controllers from "../controllers/userController";
import User from "../models/user";
import * as jwt from "../middlewares/jwt";
const userRouter = new Router();
// 公共路由
const userPublicRouter = new Router();

userPublicRouter.post("/login", controllers.login);
userPublicRouter.get("/login", controllers.testlogin);

// 私有路由
const userPrivateRouter = new Router();
userPrivateRouter.use(jwt.verifyToken);

// 导出
userRouter.use(
  userPublicRouter.routes(),
  userPublicRouter.allowedMethods()
);
userRouter.use(
  userPrivateRouter.routes(),
  userPrivateRouter.allowedMethods()
);

export default userRouter;
