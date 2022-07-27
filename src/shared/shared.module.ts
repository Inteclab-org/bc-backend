import { Module } from '@nestjs/common';
import { LanguagesModule } from './modules/languages/languages.module';
import KnexService from './providers/knex.service';

@Module({
  imports: [LanguagesModule],
  providers: [KnexService],
  exports: [KnexService],
})
export class SharedModule {}
