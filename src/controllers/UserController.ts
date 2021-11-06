import { Route, Post, Body, SuccessResponse, Tags } from "tsoa";

import UserService from "../services/UserService";
import { CreateUserPayload, LoginUserPayload } from "../@types/user";
import { success } from "../utils/response";

@Route("/users")
@Tags("User")
class UserController {
  @SuccessResponse("201", "Bad Request")
  @Post()
  public static async createUserController(@Body() body: CreateUserPayload) {
    return success(await UserService.createNewUser(body));
  }

  @SuccessResponse("201", "Bad Request")
  @Post("/login")
  public static async loginUserController(@Body() body: LoginUserPayload) {
    return success(await UserService.loginUser(body));
  }
}

export default UserController;
