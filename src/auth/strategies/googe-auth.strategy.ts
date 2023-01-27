import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

const grantSources = ['email', 'profile'];

export interface GoogleOauthProfile {
  provider?: string;
  sub?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
  locale?: string;
  token?: string;
  refreshToken?: string;
}

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
    const profileData = '_json' in profile && profile._json && profile._json;
    console.log(profileData);
    /**
      _json: {
        sub: '113733149526344154356',
        name: '박인수',
        given_name: '인수',
        family_name: '박',
        picture: 'https://lh3.googleusercontent.com/a/AEdFTp59kELVLPMzzordkrJsy-AJSob4CG-whuRmiqDC=s96-c',
        email: 'lunatics384@gmail.com',
        email_verified: true,
        locale: 'ko'
      }
    **/
    return {
      provider: 'google',

      ...profileData,
      token,
      refreshToken,
    };
  }
}
