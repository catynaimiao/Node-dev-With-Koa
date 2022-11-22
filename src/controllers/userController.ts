// DataBase Config
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import * as jwt from "../middlewares/jwt";
import User from "../models/user";
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
  try {
    const { phone, password } = ctx.request.body as User;

    const user = await collections.users.findOne({
      phone,
      password,
    });

    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
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
  try {
    ctx.status = 200;
    ctx.body = {
      message: "ok",
    };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
};
