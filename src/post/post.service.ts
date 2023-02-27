import { Injectable } from '@nestjs/common';
// import { CommentEntity } from 'src/db/entity/comment.entity';
import { PostEntity } from 'src/db/entity/post.entity';
import { PostImageEntity } from 'src/db/entity/postImage.entity';
import { DataSource } from 'typeorm';
import { CreatePostDto } from './dto/create-post';
const IS_DEBUG = true;
@Injectable()
export class PostService {
  constructor(private dataSource: DataSource) {}

  async createPost({
    owner,
    content,
    title,
    imageUrlList,
  }: CreatePostDto): Promise<PostEntity> {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      const postData = new PostEntity();
      postData.owner = owner;
      postData.content = content;
      postData.title = title;
      IS_DEBUG && console.log({ postData });
      const postResultData = await qr.manager.save(postData);
      // await qr.commitTransaction();
      // console.log()
      if (imageUrlList && Array.isArray(imageUrlList)) {
        for (const imageUrl of imageUrlList) {
          IS_DEBUG && console.log({ imageUrl });
          const postImageData = new PostImageEntity();
          postImageData.imagePath = imageUrl;
          postImageData.post = postResultData;
          await qr.manager.save(postImageData);
        }
      }

      // await qr.rollbackTransaction();
      await qr.commitTransaction();
      return postData;
    } catch (err) {
      console.log({ err });
      await qr.rollbackTransaction();
      // reject
    } finally {
      await qr.release();
    }
  }
}
