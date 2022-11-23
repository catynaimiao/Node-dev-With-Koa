import * as Router from "koa-router";

import userRouter from "./routes/userRouter";
import anotherUserRouter from "./routes/anotherUserrRouter"

const router = new Router();

router.use('/api/v1', userRouter.routes());
router.use('/api/v2',anotherUserRouter.routes())

export default router;
