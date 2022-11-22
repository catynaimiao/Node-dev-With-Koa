import * as Router from "koa-router";

import userRouter from "./routes/userRouter";

const router = new Router();

router.use('/api/v1', userRouter.routes());

export default router;
