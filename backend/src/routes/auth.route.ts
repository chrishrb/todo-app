import Router from "express-promise-router"
import * as authService from "../services/auth.service";
import { validateSafe } from "../exceptions/helpers";
import { LoginSchema } from "../schemas/auth.schema";

export const authRouter = Router()

authRouter.route("/login")
  /**
   * POST /api/v1/auth/login
   * @tags Auth - Bearer authentication
   * @summary Login
   * @param {LoginSchema} request.body.required - userLogin - application/json
   * @return {AuthLoginSchema} 200 - success response
   */
  .post(async (req, res) => {
    const userDto = new LoginSchema(req.body.email, req.body.password);

    await validateSafe(userDto);
    const jwt = await authService.login(userDto)

    res.status(200).json(jwt)
  })

  /**
   * GET /api/v1/auth/verify
   * @tags Auth - Bearer authentication
   * @security BearerAuth
   * @summary Verify logged in user
   * @return {JwtPayloadSchema} 200 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 403 - Forbidden error
   * @return {BaseError} 500 - Internal Server error
   */
authRouter.route("/verify")
  .get(authService.verify, async (req, res) => {
    res.status(200).json(res.locals.user)
  })

// TODO: add refresh endpoint
