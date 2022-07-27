import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtExpiresInToDate } from 'src/shared/utils/utils';
import { accessToken, refreshToken } from '../../constants/contants';

@Injectable()
export class TokenService {
  @Inject() private jwtService: JwtService;

  getAccessToken(payload: Object): (string | Date)[] {
    const { secret, expiresIn } = accessToken;

    return this.getExpiresOn(
      this.jwtService.sign(payload, {
        expiresIn,
        secret,
      }),
    );
  }

  getRefreshToken(payload: Object): (string | Date)[] {
    const { secret, expiresIn } = refreshToken;

    return this.getExpiresOn(
      this.jwtService.sign(payload, {
        expiresIn,
        secret,
      }),
    );
  }

  private getExpiresOn(token: string): (string | Date)[] {
    const decoded: any = this.jwtService.decode(token);
    const expiresOn: Date = jwtExpiresInToDate(decoded.exp);

    return [token, expiresOn];
  }
}
