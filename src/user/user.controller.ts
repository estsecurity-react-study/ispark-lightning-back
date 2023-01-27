import { Controller, Get, Request, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { CreateUserDto, LoginUserDto } from './dto';
// import { CreateUserValidatePipe, LoginUserValidatePipe } from './pipe';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // @Post('/signup')
  // async userSignup(
  //   @Body(new CreateUserValidatePipe()) userData: CreateUserDto,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const data = await this.userService.signup(userData);
  //     return res.status(201).json({ isError: false, data });
  //   } catch (err) {
  //     console.log({ err }); // [log]
  //     return Promise.reject(err);
  //   }
  // }

  // @UseGuards(AuthGuard('local'))
  // @Post('/signin')
  // async userSignin(
  //   @Body(new LoginUserValidatePipe()) userData: LoginUserDto,
  //   @Res() res: Response,
  // ) {
  //   console.log({ userData });
  //   const token = await this.authService.generateToken(userData.email);
  //   return res
  //     .status(200)
  //     .cookie('token', token)
  //     .json({ ...userData });
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
