import { Module } from '@nestjs/common';
import KnexService from 'src/shared/providers/knex.service';
import { SharedModule } from 'src/shared/shared.module';
import { LocalesService } from './locales.service';

@Module({ imports: [SharedModule], providers: [LocalesService, KnexService] })
export class LocalesModule {}
