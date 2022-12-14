import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  isValidUser(@Req() req: Request, @Res() res: Response) {
    try {
      const token = this.authService.getUserToken();
      return res.status(200).json({ isError: false, token });
    } catch (err) {
      console.log({ err });
      return Promise.reject(err);
    }
  }
}
