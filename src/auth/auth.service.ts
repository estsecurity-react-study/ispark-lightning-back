import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validate(email: string, password: string): Promise<any> {
    console.log('[AuthService] email, password => ', email, password);
    const user = await this.userService._findUserByEmail(email);
    if (!user)
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    const isSamePw = await bcrypt.compare(password, user.password);
    if (!isSamePw)
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    const { password: _, ...result } = user;
    console.log(result);
    return result;
  }
}
