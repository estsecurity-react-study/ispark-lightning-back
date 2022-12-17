import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LocalStrategy } from 'src/auth/local.strategy';
import { CreateUserDto, LoginUserDto } from './dto';
import { CreateUserValidatePipe, LoginUserValidatePipe } from './pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  async userSignup(
    @Body(new CreateUserValidatePipe()) userData: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.userService.signup(userData);
      return res.status(201).json({ isError: false, data });
    } catch (err) {
      console.log({ err }); // [log]
      return Promise.reject(err);
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async userSignin(
    @Body(new LoginUserValidatePipe()) userData: LoginUserDto,
    @Res() res: Response,
  ) {
    console.log({ userData });
    return res.status(200).json({ userData });
    // const result = await this.userService.signin(userData);
    // return res.status(200).json({ isError: false, result });
  }
}
