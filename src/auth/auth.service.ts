import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService._findUserByEmail(email);
    if (!user)
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    const isSamePw = await bcrypt.compare(password, user.password);
    if (!isSamePw)
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    const { password: userPassword, ...userData } = user;
    return userData;
  }

  async generateToken(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.sign(payload, {
        secret: process.env.HW_TOKEN,
      }),
    };
  }
}
