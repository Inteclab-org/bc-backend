import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LanguagesModule } from 'src/shared/modules/languages/languages.module';
import { OtpDAO } from './dao/otp.dao';
import { LocalesService } from '../locales/locales.service';
import { LocalesModule } from '../locales/locales.module';
import KnexService from 'src/shared/providers/knex.service';
import { SharedModule } from 'src/shared/shared.module';
import { TokenService } from './provider/token.service';
import { JwtModule } from '@nestjs/jwt';
import { UserTokensDAO } from './dao/user-tokens.dao';
import { JwtStrategy } from './strategy/jwt-auth.strategy';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    LanguagesModule,
    LocalesModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    OtpDAO,
    LocalesService,
    KnexService,
    TokenService,
    UserTokensDAO,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
