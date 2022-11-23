import { logger } from "./logger";

/**
 * 统一异常处理
 * @param {*} ctx
 * @param {*} next
 * @return {*} { code: '错误代码', msg: '错误信息' }
 */
export const error = async (ctx, next) => {
  await next().catch((err) => {
    if (err.code == null) {
      logger.error(err.stack);
    }
    ctx.body = {
      code: err.code || -1,
      msg: err.message.trim(),
    };

    ctx.status = 200; // 前端根据code判断异常
    return Promise.resolve();
  });
};
