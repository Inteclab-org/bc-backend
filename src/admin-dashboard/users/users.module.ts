import { Module } from '@nestjs/common';
import { LanguagesModule } from 'src/shared/modules/languages/languages.module';
import { SharedModule } from 'src/shared/shared.module';
import { UsersDAO } from './dao/users.dao';
import { UsersService } from './users.service';

@Module({
  imports: [SharedModule, LanguagesModule],
  providers: [UsersService, UsersDAO],
  exports: [UsersService],
})
export class UsersModule {}
