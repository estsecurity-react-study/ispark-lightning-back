import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

const grantSources = ['email', 'profile'];

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.OAUTH_GOOGLE_ID,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
      scope: grantSources,
    });
  }

  validate(token: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    return {
      provider: 'google',
      id,
      name,
      emails,
    };
  }
}
