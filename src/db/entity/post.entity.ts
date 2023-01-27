import {
  Entity,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  name: 'post',
})
export class PostEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  owner: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
