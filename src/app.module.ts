import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { UserEntity } from './db/entity/user.entity';
import { AuthController } from './auth/auth.controller';
import { PostModule } from './post/post.module';
import { PostEntity } from './db/entity/post.entity';
import { CommentEntity } from './db/entity/comment.entity';
import { PostImageEntity } from './db/entity/postImage.entity';
import logger from './middleware/logger.middleware';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    // Config Modules
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: parseInt(configService.get('MYSQL_PORT') as string),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [UserEntity, PostEntity, PostImageEntity, CommentEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    // Router
    RouterModule.register([
      {
        path: 'api',
        children: [UserModule, AuthModule, PostModule],
      },
    ]),
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(UserController, AuthController);
  }
}
