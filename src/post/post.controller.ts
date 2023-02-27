import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multerOption';
import { ConfigService } from '@nestjs/config';
import * as aws from 'aws-sdk';
import { uuid } from 'uuidv4';

type UploadFileType = {
  fieldname?: string;
  originalname?: string;
  encoding?: string;
  mimetype?: string;
  buffer?: Buffer;
  size?: number;
};

const IS_DEBUG = true;

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private configService: ConfigService,
  ) {}

  @Get('/')
  async getPostList(@Query() queries, @Res() res: Response) {
    return res.json({ contents: [] });
  }

  @Get('/:id')
  async getPost(@Param() params, @Res() res: Response) {
    const { id } = params;
    IS_DEBUG && console.log({ id });
    return res.json({ result: true });
  }

  @UseInterceptors(FilesInterceptor('image', null, multerOptions))
  @Post('/')
  async createPost(
    @UploadedFiles() files: UploadFileType[],
    @Body() body,
    @Res() res: Response,
  ) {
    const imageUrlList = [];
    console.log(files);
    if (files && files.length) {
      console.log(files.length);
      aws.config.update({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('S3_IAM_KEY'),
          secretAccessKey: this.configService.get('S3_IAM_SECRET'),
        },
      });
      try {
        for (const file of files) {
          const imageUrl = await this.uploadToS3(aws, file);
          if (imageUrl) imageUrlList.push(imageUrl);
          console.log(imageUrl);
        }
      } catch (err) {
        IS_DEBUG && console.log({ err });
        // reject
      }
    }
    try {
      const result = await this.postService.createPost(
        Object.assign(body, { imageUrlList }),
      );
      console.log(result);
    } catch (err) {
      IS_DEBUG && console.log({ err });
      // reject
    }

    return res.json({ result: true });
  }

  async uploadToS3(
    AWS: typeof aws,
    file: UploadFileType,
  ): Promise<string | boolean> {
    const imageKey = `${uuid()}-${file.originalname || 'humanwater-file'}`;
    try {
      await new AWS.S3()
        .putObject({
          Key: imageKey,
          Body: file.buffer,
          Bucket: this.configService.get('S3_BUCKET_NAME'),
        })
        .promise();
      const imageUrl = this.configService.get('S3_BUCKET_URL') + imageKey;
      return imageUrl;
    } catch (err) {
      IS_DEBUG && console.log({ err });
      return false;
    }
  }

  @Patch('/')
  async updatePost(@Body() body, @Res() res: Response) {}

  @Delete('/:id')
  async deletePost(@Param() params, @Res() res: Response) {
    const { id } = params;
    console.log("Delete Post's id", id);
    return res.json({ result: true });
  }
}
