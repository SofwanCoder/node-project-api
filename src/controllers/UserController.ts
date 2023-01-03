import { Route, Post, Body, SuccessResponse, Tags } from "tsoa";
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
}

export default UserController;
