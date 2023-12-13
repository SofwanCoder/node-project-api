import { Route, Post, Body, SuccessResponse, Tags, Get, Path } from "tsoa";
import UserService from "../services/UserService";
import { CreateUserPayload } from "../types/user";
import { success } from "../utils/response";

@Route("/users")
@Tags("User")
class UserController {
  @SuccessResponse("201", "Created")
  @Post()
  public static async createUserController(@Body() body: CreateUserPayload) {
    return success(await UserService.createNewUser(body));
  }

  @SuccessResponse("200")
  @Get("{userId}")
  public static async fetchUserController(@Path() userId: string | "me") {
    return success(await UserService.fetchUser(userId));
  }
}

export default UserController;
