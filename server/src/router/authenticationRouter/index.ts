import express, { Request, Response } from "express";
import { IsAuthenticated } from "@shared/types";

export const authenticationRouter = express.Router();

authenticationRouter.get(
  "/is-authenticated",
  async (_request: Request, response: Response) => {
    try {
      /**
       * TODO: authenticate user
       */
      const user = { name: "DEV" };
      const _response: IsAuthenticated = { authenticated: true, user };
      return response.status(200).send(_response);
    } catch (error) {
      const _response: IsAuthenticated = { authenticated: false, user: null };
      return response.status(200).send(_response);
    }
  }
);
