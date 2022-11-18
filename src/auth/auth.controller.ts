import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  isValidUser(@Req() req: Request, @Res() res: Response) {
    const userToken = this.authService.getUserToken();
    console.log({ userToken });
    console.log(req.body);
    return res.status(200).json({ result: true });
  }
}
