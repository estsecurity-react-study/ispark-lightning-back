import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/db/entity/comment.entity';
import { PostEntity } from 'src/db/entity/post.entity';
import { PostImageEntity } from 'src/db/entity/postImage.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>,
    @InjectRepository(PostImageEntity)
    private postImageRepo: Repository<PostImageEntity>,
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
  ) {}

  async createPost(post: CreatePostDto): Promise<PostEntity> {
    try {
      const {} = post;
      const postData = await this.postRepo.create(post);
      const saveResult = await this.postRepo.save(postData);
      return {} as any;
    } catch (err) {
      console.log({ err });
    }
  }
  async getPost(postId: string): Promise<any> {}
}
