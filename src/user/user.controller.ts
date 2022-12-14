import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto, LoginUserDto } from './dto';
import { CreateUserValidatePipe, LoginUserValidatePipe } from './pipe';
import { UserService } from './user.service';

@Controller('')
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

  @Post('/signin')
  async userSignin(
    @Body(new LoginUserValidatePipe()) userData: LoginUserDto,
    @Res() res: Response,
  ) {
    const result = await this.userService.signin(userData);
    return res.status(200).json({ isError: false, result });
  }
}
