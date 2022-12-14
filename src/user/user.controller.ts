import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto';
import { CreateUserValidatePipe } from './pipe/createUserValidate.pipe';
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
}
