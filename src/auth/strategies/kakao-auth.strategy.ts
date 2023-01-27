import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import axios from 'axios';
export interface KakaoOauthProfile {
  provider?: string;
  id?: string;
  username?: string;
  displayName?: string;
  connected_at?: string;
  token?: string;
  refreshToken?: string;
}

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.OAUTH_KAKAO_ID,
      clientSecret: process.env.OAUTH_KAKAO_SECRET,
      callbackURL: process.env.OAUTH_KAKAO_CALLBACK_URL,
    });
  }

  async validate(
    token: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<KakaoOauthProfile> {
    console.log({ profile });
    const userData = await axios
      .get('https://kapi.kakao.com/v2/user/me', {
        params: {
          property_keys: ['kakao_account.email'],
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
    console.log({ userData });
    /**
    userData: {
        id: 2637988949,
        connected_at: '2023-01-26T04:58:54Z',
        properties: { nickname: '박인수' },
        kakao_account: {
            profile_nickname_needs_agreement: false,
            profile: [Object],
            has_email: true,
            email_needs_agreement: false,
            is_email_valid: true,
            is_email_verified: true,
            email: 'foor4564@naver.com'
        }
    }
    **/
    return {
      provider: 'kakao',
      token,
      refreshToken,
      ...profile,
    };
  }
}
