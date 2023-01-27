import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_TOKEN'),
      ignoreExpiration: false,
    } as StrategyOptions);
  }

  // After JWT Validation,
  async validate(payload: any) {
    const { password, ...userData } = await this.userService._findUserByEmail(
      payload.email,
    );

    return userData;
  }
}
