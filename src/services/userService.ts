import User from "src/models/user";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";

const userService = {
  /**
   * @Description: 登录
   * @params: { String } phone
   * @params: { String } password
   * @return: { Object | null }
   */
  async login(phone, password) {
    return await collections.users.findOne({
      phone,
      password,
    });
  },
};

export default userService;
