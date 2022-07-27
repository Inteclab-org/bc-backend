import { Inject, Injectable } from '@nestjs/common';
import KnexService from 'src/shared/providers/knex.service';
import { getFirst } from 'src/shared/utils/utils';
import { ICreateUserToken } from '../interface/auth.interface';

@Injectable()
export class UserTokensDAO {
  @Inject() private knexService: KnexService;

  async create({
    access_token,
    access_token_expires_on,
    ip,
    refresh_token,
    refresh_token_expires_on,
    user_id,
  }: ICreateUserToken) {
    return getFirst(
      await this.knexService.instance('user_tokens').insert({
        access_token,
        access_token_expires_on,
        ip,
        refresh_token,
        refresh_token_expires_on,
        user_id,
      }),
    );
  }

  async getByRefreshToken(refreshToken: string) {
    return await this.knexService
      .instance('user_tokens')
      .select('*')
      .where({
        is_active: true,
        refresh_token: refreshToken,
      })
      .first();
  }
}
