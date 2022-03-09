import { Route, Post, Body, SuccessResponse, Tags } from "tsoa";
import {
  CreateTokenPayload,
  RefreshTokenPayload,
} from "../types/authorization";
import { success } from "../utils/response";
import AuthService from "../services/AuthService";

@Route("/auths")
@Tags("Auth")
export default class AuthController {
  @SuccessResponse("201", "Bad Request")
  @Post("/tokens")
  public static async createTokenController(@Body() body: CreateTokenPayload) {
    return success(await AuthService.createToken(body));
  }

  @SuccessResponse("201", "Bad Request")
  @Post("/access")
  public static async refreshTokenController(
    @Body() body: RefreshTokenPayload
  ) {
    return success(await AuthService.refreshToken(body.refresh_token));
  }
}
