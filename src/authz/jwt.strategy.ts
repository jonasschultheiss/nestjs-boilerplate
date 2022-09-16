import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayload } from './interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.getOrThrow('auth0.issuerURL')}.well-known/jwks.json`
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.getOrThrow('auth0.audience'),
      issuer: `${configService.getOrThrow('auth0.issuerURL')}`,
      algorithms: ['RS256']
    });
  }

  validate(payload: IPayload): IPayload {
    return payload;
  }
}
