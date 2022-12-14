import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { LoginUserDto } from './dto/login-user.dto';

/** @description user return object */
type UserRO = Pick<UserEntity, 'id' | 'email'>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async signup(user: CreateUserDto): Promise<UserRO> {
    const { email } = user;
    const isExistUser = await this.userRepo.findOne({ where: { email } });
    if (isExistUser) {
      throw new HttpException('Already Exist User', HttpStatus.CONFLICT);
    }
    const userData: UserEntity = await this.userRepo.create(user);
    const saveResult = await this.userRepo.save(userData);
    return this.buildUserRO(saveResult);
  }

  async signin(user: LoginUserDto) {
    const { email, password } = user;
    try {
      const findResult = await this.userRepo.findOne({
        where: { email },
      });
      console.log(findResult);
      return this.buildUserRO(findResult);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _findUserByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepo.findOne({ where: { email } });
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      id: user.id,
      email: user.email,
      image: user.image,
      gender: user.gender,
    };
    return userRO;
  }
}
