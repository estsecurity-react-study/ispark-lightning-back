import {
  Entity,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity({
  name: 'comment',
})
export class CommentEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => PostEntity, (post) => post.comments)
  post: PostEntity;
}
