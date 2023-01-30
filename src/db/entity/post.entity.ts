import {
  Entity,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { PostImageEntity } from './postImage.entity';

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

  @OneToMany(() => PostImageEntity, (postImage) => postImage.post)
  postImages: PostImageEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
