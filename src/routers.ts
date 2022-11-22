import * as Router from "koa-router";
import userRouter from "./routes/user.router";

// 主路由
const router = new Router();

router.use("/user", userRouter.routes(), userRouter.allowedMethods());

export default router;

/*
*********************
Nested routers
*********************

const forums = new Router();
const posts = new Router();

posts.get('/', (ctx, next) => {...});
posts.get('/:pid', (ctx, next) => {...});
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

// responds to "/forums/123/posts" and "/forums/123/posts/123"
app.use(forums.routes());
*/
