import { HttpException, HttpStatus, PipeTransform } from '@nestjs/common';
import { LoginUserDto } from '../dto';

export class LoginUserValidatePipe implements PipeTransform {
  transform(value: LoginUserDto) {
    console.log({ value });
    if (!value.email || !value.password) {
      throw new HttpException(
        'Bad Request ::: Invalid User Data',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { password, ...userData } = value;
    return userData;
  }
}
