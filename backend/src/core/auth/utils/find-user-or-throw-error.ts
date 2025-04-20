import { UnauthorizedException } from "@nestjs/common"
import { Response } from "express";

export const findUserOrThrowError = (data: Response) => {
  if (!data) {
    throw new UnauthorizedException('user not found');
  }

  return data.locals.user.uid;
}