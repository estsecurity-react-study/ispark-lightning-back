import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
let redirectUri; // 전역변수말고 다르게 해결할 방법
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(context.getHandler().name); // googleAuth || googleAuthCallback
    // googleAuth: client(g) -> was(h)
    // googleAuthCallback: was(h) <- OauthServer(g)
    const req = this.getRequest(context);
    // const res = this.getResponse(context);
    // console.log(req.options);
    if (context.getHandler().name === 'googleAuth') {
      redirectUri = req.query.redirectUri;
    }
    return super.canActivate(Object.assign(context, { redirectUri }));
  }
  getRequest(context) {
    return context.switchToHttp().getRequest();
  }
  getResponse(context) {
    return context.switchToHttp().getResponse();
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    // console.log('handleRequestQuery => ', context['redirectUri']);
    console.log(err, info, status);
    if (status) {
      console.log({ status });
    }
    user['redirectUri'] = context['redirectUri'];
    return user;
  }
}
