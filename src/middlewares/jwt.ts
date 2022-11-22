import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as koaJwt from "koa-jwt";
import * as jwt from "jsonwebtoken";
import config from "../../config";

// jwt鉴权

export const signToken: Koa.Middleware = (ctx, next) => {
  try {
    const data = ctx.request.body;
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

export const verifyToken: Koa.Middleware = async (ctx, next) => {
  try {
    ctx.jwtData = await jwt.verify(
      ctx.request.headers.authorization,
      config.security.secretKey
    );
    await next();
  } catch (err) {
    throw { code: 401, message: err.message };
  }
};
