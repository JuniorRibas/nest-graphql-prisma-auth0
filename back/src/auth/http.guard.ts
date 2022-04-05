import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'node:util';

@Injectable()
export class HttpGuard implements CanActivate {
  private AUTH0_AUDIENCE;
  private AUTH0_DOMAIN;

  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE');
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { getRequest, getResponse } = context.switchToHttp();
    const req = getRequest();
    const res = getResponse();
    console.log(this.AUTH0_DOMAIN);
    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }),
        audience: this.AUTH0_AUDIENCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJwt(req, res);
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error);
    }
  }
}
