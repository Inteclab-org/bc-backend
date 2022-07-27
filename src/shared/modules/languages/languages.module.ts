import { Module } from '@nestjs/common';
import KnexService from 'src/shared/providers/knex.service';
import { LanguagesDao } from './dao/languages.dao';
import { LanguagesService } from './languages.service';

@Module({
  providers: [LanguagesService, LanguagesDao, KnexService],
  exports: [LanguagesService],
})
export class LanguagesModule {}
