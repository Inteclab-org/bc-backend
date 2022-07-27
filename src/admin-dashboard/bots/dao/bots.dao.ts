import { Inject, Injectable } from '@nestjs/common';
import KnexService from 'src/shared/providers/knex.service';
import { getFirst } from 'src/shared/utils/utils';
import { IBot } from '../interface/bots.interface';

@Injectable()
export class BotsDAO {
  @Inject() private knexService: KnexService;

  getByTgToken(token: string) {
    return this.knexService
      .instance('bots')
      .select('*')
      .where({
        tg_token: token,
        is_active: true,
      })
      .first();
  }

  async create({
    description,
    name,
    tg_token,
    tg_name,
    tg_username,
    tg_id,
    created_by,
  }) {
    return getFirst(
      await this.knexService
        .instance('bots')
        .insert({
          description,
          name,
          tg_token,
          tg_name,
          tg_username,
          tg_id,
          created_by,
        })
        .returning('*'),
    );
  }
}
