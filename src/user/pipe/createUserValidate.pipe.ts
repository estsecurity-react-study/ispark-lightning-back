import { HttpException, HttpStatus, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto';

export class CreateUserValidatePipe implements PipeTransform {
  transform(value: CreateUserDto) {
    if (!value.email || !value.password || !value.gender) {
      Promise.reject('(!)Invalid User Data');
      throw new HttpException(
        'Bad Request ::: Invalid User Data',
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
