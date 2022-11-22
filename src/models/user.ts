import { ObjectId } from "mongodb";

// 用户模型
export default class User {
  constructor(
    public name: string,
    public phone: number,
    public password: string,
    public id?: ObjectId
  ) {}
}
