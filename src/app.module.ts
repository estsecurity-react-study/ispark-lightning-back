import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import logger from './middleware/logger.middleware';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { RouterModule } from '@nestjs/core';

import { UserModule } from './user/user.module';
import setMysqlOption from './db/init';

@Module({
  imports: [
    // Config Modules
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(setMysqlOption()),
    // Business Modules
    // Router
    RouterModule.register([
      {
        path: 'api',
        children: [UserModule],
      },
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(AuthController, UserController);
  }
}
