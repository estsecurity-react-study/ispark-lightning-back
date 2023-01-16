import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './user/user.module';
import setMysqlOption from './db/init';
import { UserEntity } from './db/entity/user.entity';
/**
 * MYSQL_PORT=33061
MYSQL_HOST=localhost
MYSQL_USERNAME=root
MYSQL_PASSWORD=zotmffld12!
MYSQL_DATABASE=test_auth
 */
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
        entities: [UserEntity],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
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
    // consumer.apply(logger).forRoutes(UserController);
  }
}
