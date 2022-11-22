import * as log4js from "log4js";
import * as path from "node:path";
import * as fs from "node:fs";
import config from "../../config";

// 统一本地日志管理

const logsDir = path.parse(config.logPath).dir;
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

log4js.configure({
  appenders: {
    console: { type: "console" },
    dateFile: {
      type: "dateFile",
      filename: config.logPath,
      pattern: "-yyyy-MM-dd",
    },
  },
  categories: {
    default: {
      appenders: ["console", "dateFile"],
      level: "info",
    },
  },
  pm2: true,
});

export const logger = log4js.getLogger("[Default]");
logger.level = config.logLevel;

export const logInfo = async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = Number(new Date()) - Number(start);
  const remoteAddress =
    ctx.headers["x-forwarded-for"] ||
    ctx.ip ||
    ctx.ips ||
    (ctx.socket &&
      (ctx.socket.remoteAddress ||
        (ctx.socket.socket && ctx.socket.socket.remoteAddress)));
  const logText = `${ctx.method} ${ctx.status} ${
    ctx.url
  } 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(
    ctx.body
  )} - ${remoteAddress} - ${ms}ms`;
  logger.info(logText);
};
