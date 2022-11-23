// DataBase Config
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import * as jwt from "../middlewares/jwt";
import User from "../models/user";
import userService from "../services/userService";
// koa 内核
import * as Router from "koa-router";

// controller

/**
 * 用户登录
 * /api/v1/login/
 * POST
 * @param ctx
 * @param next
 */
export const login = async (ctx: Router.RouterContext, next) => {
  const { phone, password } = ctx.request.body as User;
  if (!phone || !password) {
    const error = new Error("用户或密码不能为空");
    throw { code: 500, message: "用户或密码不能为空" };
  }
  const user = await userService.login(phone, password);

  if (user) {
    ctx.status = 200;
    ctx.body = { code: 200, result: { jwt: jwt.signToken(user, next) } };
  } else {
    throw { code: 500, message: "账号密码错误，或用户不存在。" };
  }
};

/**
 * 用户登录GET请求测试
 * /api/v1/login
 * GET
 * @param ctx
 * @param next
 */
export const testlogin = async (ctx: Router.RouterContext, next) => {
  //await next();
  ctx.status = 200;
  ctx.body = {
    code: 200,
    result: "ok",
  };
};
