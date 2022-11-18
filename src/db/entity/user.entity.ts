import {
  Entity,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

import { IsEmail, Matches } from 'class-validator';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  @Matches(/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/, {
    message: '(!)invalid paassword',
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
