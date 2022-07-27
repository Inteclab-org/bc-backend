import { Inject, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import KnexService from 'src/shared/providers/knex.service';

@Injectable()
export class LocalesService {
  @Inject() private knexService: KnexService;

  locales = {};

  async load() {
    if (isEmpty(this.locales)) {
      const locales = await this.knexService
        .instance('admin_dashboard_locales')
        .select('*');

      for (let i = 0; i < locales.length; i++) {
        this.locales[locales[i].key] = locales[i].value;
      }
      return this.locales;
    }
    return this.locales;
  }
}
