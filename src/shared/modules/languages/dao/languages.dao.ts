import { Inject, Injectable } from '@nestjs/common';
import KnexService from 'src/shared/providers/knex.service';

@Injectable()
export class LanguagesDao {
  @Inject() private knexService: KnexService;

  getById(languageId: number) {
    return this.knexService
      .instance('languages')
      .where('id', languageId)
      .first();
  }
}
