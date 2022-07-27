import { Module } from '@nestjs/common';
import KnexService from 'src/shared/providers/knex.service';
import { SharedModule } from 'src/shared/shared.module';
import { BotsController } from './bots.controller';
import { BotsService } from './bots.service';
import { BotsDAO } from './dao/bots.dao';

@Module({
  imports: [SharedModule],
  controllers: [BotsController],
  providers: [BotsService, BotsDAO, KnexService],
})
export class BotsModule {}
