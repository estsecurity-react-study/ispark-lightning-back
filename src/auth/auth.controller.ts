import { Get, UseGuards, Controller, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import type { GoogleOauthProfile } from './strategies/googe-auth.strategy';

@Controller('auth')
export class AuthController {
  @Get('/')
  async auth(@Req() req: Request, @Res() res: Response) {
    console.log(req.headers.cookie);
    return res.json({ result: true });
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async googleAuth(): Promise<any> {}

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);
    const redirectUri = req.user['redirectUri'] || 'http://localhost:3000';
    const { token }: GoogleOauthProfile = req.user; //* TODO ::: 커스텀 토큰.
    res.cookie('access_token', token, { httpOnly: true, secure: true });
    res.redirect(redirectUri);
  }

  @UseGuards(KakaoAuthGuard)
  @Get('/kakao')
  async kakaoAuth(@Req() req: Request): Promise<void> {}

  @UseGuards(AuthGuard('kakao'))
  @Get('/kakao/callback')
  async kakaoAuthCallback(@Req() req: Request, @Res() res: Response) {
    const { token } = req.user as any;
    res.cookie('access_token', token, { httpOnly: true });
    return res.redirect('http://localhost:3000');
  }
}
