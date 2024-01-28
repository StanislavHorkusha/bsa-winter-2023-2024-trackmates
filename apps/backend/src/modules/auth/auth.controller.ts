import { APIPath } from "~/libs/enums/enums.js";
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserSignUpRequestDto } from "~/modules/users/users.js";
import { userSignUpValidationSchema } from "~/modules/users/users.js";

import { type AuthService } from "./auth.service.js";
import { AuthApiPath } from "./libs/enums/enums.js";

class AuthController extends BaseController {
  private authService: AuthService;

  public constructor(logger: Logger, authService: AuthService) {
    super(logger, APIPath.AUTH);

    this.authService = authService;

    this.addRoute({
      path: AuthApiPath.SIGN_UP,
      method: "POST",
      validation: {
        body: userSignUpValidationSchema,
      },
      handler: (options) =>
        this.signUp(
          options as APIHandlerOptions<{
            body: UserSignUpRequestDto;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /auth/sign-up:
   *    post:
   *      description: Sign up user into the system
   *      requestBody:
   *        description: User auth data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                  format: email
   *                password:
   *                  type: string
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: object
   *                    $ref: '#/components/schemas/User'
   */
  private async signUp(
    options: APIHandlerOptions<{
      body: UserSignUpRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.authService.signUp(options.body),
    };
  }
}

export { AuthController };