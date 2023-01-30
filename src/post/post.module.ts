import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/db/entity/comment.entity';
import { PostEntity } from 'src/db/entity/post.entity';
import { PostImageEntity } from 'src/db/entity/postImage.entity';
import { Supabase } from 'src/utils/supabaseClient';
import { PostController } from './post.controller';
import { PostService } from './post.service';

const Entities = [PostEntity, PostImageEntity, CommentEntity];
@Module({
  imports: [TypeOrmModule.forFeature(Entities), Supabase],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
