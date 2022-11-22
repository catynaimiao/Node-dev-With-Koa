import { logger } from "./logger";

// 统一相应

/**
 * 正常响应
 * 回传的格式遵循这样的格式：{ code: 0, msg: any data: any }
 * @param {*} ctx
 */
export const success = async (ctx, next) => {
  if (ctx.result !== undefined) {
    ctx.type = "json";
    ctx.body = {
      code: 200,
      msg: ctx.msg || "",
      data: ctx.result,
    };
  }
  await next();
};

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
      data: null,
      msg: err.message.trim(),
    };

    ctx.status = 200; // 前端根据code判断异常
    return Promise.resolve();
  });
};
