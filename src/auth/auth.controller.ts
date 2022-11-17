import { Controller, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  @Post()
  isValidUser(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    return res.status(200).json({ result: true });
  }
}
