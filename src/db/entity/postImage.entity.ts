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
  name: 'postImage',
})
export class PostImageEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  imagePath: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.postImages)
  post: PostEntity;
}
