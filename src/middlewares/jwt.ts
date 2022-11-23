import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as koaJwt from "koa-jwt";
import * as jwt from "jsonwebtoken";
import config from "../../config";

// jwt鉴权

// 签名
export const signToken = (data,next) => {
  try {
    return jwt.sign(
      {
        data: data,
      },
      config.security.secretKey,
      { expiresIn: config.security.expiresIn }
    );
  } catch (error) {
    console.log(error);
  }
  next();
};

// 验证
export const verifyToken: Koa.Middleware = async (ctx, next) => {
  try {
    ctx.jwtData = await jwt.verify(
      ctx.request.headers.authorization,
      config.security.secretKey
    );
    await next();
  } catch (err) {
    throw { code: 401, message: "未登录" };
  }
};
