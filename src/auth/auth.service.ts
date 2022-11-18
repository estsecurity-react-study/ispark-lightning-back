import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getUserToken(): string {
    return 'humanwater-test-token';
  }
}
