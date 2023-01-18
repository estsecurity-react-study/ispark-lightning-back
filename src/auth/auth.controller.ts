import { Get, UseGuards, Controller, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import type { GoogleOauthProfile } from './googe-auth.strategy';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('google'))
  @Get('/google')
  async googleAuth(): Promise<void> {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);
    const { token }: GoogleOauthProfile = req.user;
    //* Generate Custom Token and pass.
    res.cookie('access_token', token, { httpOnly: true });
    res.redirect('http://localhost:3000');
  }
}
