import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';

/** @description user return object */
type UserRO = Pick<UserEntity, 'id' | 'email'>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
  async signup(user: CreateUserDto): Promise<UserRO> {
    const userData: UserEntity = await this.userRepo.create(user);
    const saveResult = await this.userRepo.save(userData);
    console.log(saveResult);
    console.log(this.buildUserRO(saveResult));
    return this.buildUserRO(saveResult);
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
