import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import { name, port } from "./config";
import AppRoutes from "./src/routers";

const app = new Koa();
const router = new Router();

//路由
AppRoutes.forEach((route) => router[route.method](route.path, route.action));

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port);

console.log(`[${name}]has serviced at http://localhost:${port}`);
