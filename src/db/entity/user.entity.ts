import {
  Entity,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';

//* Biological gender
export enum GenderType {
  MAN = 'm',
  WOMAN = 'w',
}

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  image: string;

  @Column({
    type: 'enum',
    enum: GenderType,
  })
  gender: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 5);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
