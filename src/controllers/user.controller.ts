import { Route, Post, Body, SuccessResponse, Tags } from "tsoa";

import UserService from "../service/user.service";
import { CreateUserPayload, LoginUserPayload } from "../@types/user.types";

@Route("/users")
@Tags("User")
class UserController {
  @SuccessResponse("201", "Bad Request")
  @Post()
  public static async createUserController(@Body() body: CreateUserPayload) {
    return await UserService.createNewUser(body);
  }

  @SuccessResponse("201", "Bad Request")
  @Post("/login")
  public static async loginUserController(@Body() body: LoginUserPayload) {
    return await UserService.loginUser(body);
  }
}

export default UserController;
