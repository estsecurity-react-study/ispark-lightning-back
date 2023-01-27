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
  @ManyToOne((type) => PostEntity, (post) => post.id)
  postId: string;

  @Column()
  imagePath: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
