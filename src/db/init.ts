import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';

const setMysqlOption = (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [UserEntity],
    synchronize: true,
  };
};

export default setMysqlOption;
