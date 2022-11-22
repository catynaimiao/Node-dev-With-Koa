// External Dependencies
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import user from "../models/user";
// DataBase Config
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";

const userRouter = new Router();

// GET
userRouter.get("/", async (ctx, next) => {
  try {
    const users = (await collections.users
      .find({})
      .toArray()) as unknown as User;
    ctx.response.status = 200;
    ctx.body = users;
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = error;
  }
});

userRouter.get("/:id", async (ctx, next) => {
  const id = ctx.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users.findOne(query)) as unknown as User;
    if (user) {
      ctx.response.status = 200;
      ctx.body = user;
    }
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = `Unable to find matching document with id: ${id}`;
  }
});

// POST
userRouter.post("/", async (ctx, next) => {
  try {
    const newUser = ctx.request.body as User;
    const result = await collections.users.insertOne(newUser);

    if (result) {
      ctx.response.status = 201;
      ctx.body = `Successfully created a user game with id ${result.insertedId}`;
    } else {
      ctx.response.status = 500;
      ctx.body = "Failed to create a new user. ";
    }
  } catch (error) {
    console.error(error);
    ctx.response.status = 400;
    ctx.body = error.message;
  }
});

// PUT
userRouter.put("/:id", async (ctx, next) => {
  const id = ctx.params.id;

  try {
    const updateUser = ctx.request.body as User;
    const query = { _id: new ObjectId(id) };

    const result = await collections.users.updateOne(query, {
      $set: updateUser,
    });

    console.dir(result);

    if (result) {
      ctx.response.status = 200;
      ctx.body = `Successfully update a user game with id ${id}`;
    } else {
      ctx.response.status = 304;
      ctx.body = `Failed to update with id ${id}.`;
    }
  } catch (error) {
    console.error(error);
    ctx.response.status = 400;
    ctx.body = error.message;
  }
});

// DELETE
userRouter.delete("/:id", async (ctx, next) => {
  const id = ctx.params.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.users.deleteOne(query);
    const res = ctx.response;

    if (result && result.deletedCount) {
      res.status = 202;
      ctx.body = `Successfully removed game with id ${id}`;
    } else if (!result) {
      res.status = 400;
      ctx.body = `Failed to remove game with id ${id}`;
    } else if (!result.deletedCount) {
      res.status = 404;
      ctx.body = `Game with id ${id} does not exist`;
    }
  } catch (error) {
    console.error(error);
    ctx.response.status = 400;
    ctx.body = error.message;
  }
});

export default userRouter;
