import * as path from "node:path";
export default {
  security: {
    secretKey: "2022",
    expiresIn: 60 * 60 * 24 * 30,
  },
  logPath: path.resolve(__dirname, "./src/logs/koa-template.log"),
  logLevel: "info",
};
