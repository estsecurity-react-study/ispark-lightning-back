import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Request, Response } from 'express';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  async getPostList(@Query() queries, @Res() res: Response) {
    console.log(queries);
    return res.json({ result: true });
  }

  @Get('/:id')
  async getPost(@Param() params, @Res() res: Response) {
    const { id } = params;
    return res.json({ result: true });
  }

  @Post('/')
  async createPost(@Body() body, @Res() res: Response) {
    console.log(body);
    return res.json({ result: true });
  }

  @Patch('/')
  async updatePost(@Body() body, @Res() res: Response) {}
}
