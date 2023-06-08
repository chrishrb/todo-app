import Router from "express-promise-router"
import * as authService from "../services/auth.service";
import dayjs from 'dayjs';
import { validateSafe } from "../exceptions/helpers";
import asyncHandler from 'express-async-handler'
import { AuthLoginSchema, LoginSchema } from "../schemas/auth.schema";
import { config } from "../utils/config";
import ms from 'ms'

export const authRouter = Router()

authRouter.route("/login")
  /**
   * POST /api/v1/auth/login
   * @tags Auth - Bearer authentication
   * @summary Login
   * @param {LoginSchema} request.body.required - userLogin - application/json
   * @return {AuthLoginSchema} 200 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 500 - Internal Server error
   */
  .post(asyncHandler(async (req, res) => {
    const userDto = new LoginSchema(req.body.email, req.body.password);

    await validateSafe(userDto);
    const {accessToken, refreshToken} = await authService.login(userDto)

    res.cookie("refresh_token", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: dayjs().add(ms(config.refreshTokenExpiryTime), 'milliseconds').toDate(),
    });

    res.status(200).json(new AuthLoginSchema(accessToken));
  }))

authRouter.route("/verify")
  /**
   * GET /api/v1/auth/verify
   * @tags Auth - Bearer authentication
   * @security BearerAuth
   * @summary Verify logged in user
   * @return {JwtPayloadSchema} 200 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 500 - Internal Server error
   */
  .get(authService.verify, asyncHandler(async (req, res) => {
    res.status(200).json(res.locals.user)
  }))

authRouter.route("/refresh")
  /**
   * GET /api/v1/auth/refresh
   * @tags Auth - Bearer authentication
   * @summary Refresh token after expiration of your access token
   * @return {JwtPayloadSchema} 200 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 500 - Internal Server error
   */
  .get(asyncHandler(async (req, res) => {
    const token = req.cookies.refresh_token

    const {refreshToken, accessToken} = await authService.refresh(token)

    res.cookie("refresh_token", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: dayjs().add(60, 'd').toDate(),
    });

    res.status(200).json(new AuthLoginSchema(accessToken));
  }))

authRouter.route("/logout")
  /**
   * GET /api/v1/auth/logout
   * @tags Auth - Bearer authentication
   * @security BearerAuth
   * @summary Logout user
   * @return 204 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 500 - Internal Server error
   */
  .get(asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refresh_token
    const accessToken = req.headers['authorization']

    await authService.logout(accessToken, refreshToken);

    res.status(204).send()
  }))
