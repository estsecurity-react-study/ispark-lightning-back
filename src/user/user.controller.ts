import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  userSignup(@Req() req: Request, @Res() res: Response) {
    const userData = req.body;
    const result = this.userService.signup(userData);
    return res.json({ result });
  }
}
