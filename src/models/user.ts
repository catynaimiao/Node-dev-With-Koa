import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public name: string,
    public phone: number,
    public password: string,
    public department: string,
    public id?: ObjectId
  ) {}
}
