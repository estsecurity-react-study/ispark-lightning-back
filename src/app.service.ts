import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log({
      NODE_ENV: process.env.NODE_ENV,
      MYSQL_HOST: process.env.MYSQL_HOST,
    });

    return `짱짱맨 ${JSON.stringify({
      NODE_ENV: process.env.NODE_ENV,
      MYSQL_HOST: process.env.MYSQL_HOST,
    })}`;
  }
}
