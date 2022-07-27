import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LocalesModule } from './locales/locales.module';
import { BotsModule } from './bots/bots.module';

@Module({
  imports: [UsersModule, AuthModule, LocalesModule, BotsModule],
})
export class AdminDashboardModule {}
