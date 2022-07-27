import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { isEmpty, isUndefined } from 'lodash';
import { LanguagesService } from 'src/shared/modules/languages/languages.service';
import {
  changeVariablesWithValues,
  generateRandomDigit,
  getCurrentDate,
  sendSMS,
} from 'src/shared/utils/utils';
import { LocalesService } from '../locales/locales.service';
import { IUser } from '../users/interface/users.interface';
import { UsersService } from '../users/users.service';
import { OtpDAO } from './dao/otp.dao';
import { UserTokensDAO } from './dao/user-tokens.dao';
import {
  IConfirm,
  IOtp,
  IRefreshToken,
  ISignin,
  ISignup,
  IUserToken,
} from './interface/auth.interface';
import { TokenService } from './provider/token.service';

@Injectable()
export class AuthService {
  private SMSCodeDigitsCount: number = 6;

  @Inject() private usersService: UsersService;
  @Inject() private languagesService: LanguagesService;
  @Inject() private localesService: LocalesService;
  @Inject() private otpDAO: OtpDAO;
  @Inject() private usersTokenDao: UserTokensDAO;
  @Inject() private tokenService: TokenService;

  async signup({ first_name, last_name, phone_number, language_id }: ISignup) {
    const language = await this.languagesService.getById(language_id);

    if (isEmpty(language)) {
      throw new NotFoundException('Language was not found');
    }

    const user: IUser = await this.usersService.create({
      first_name,
      last_name,
      phone_number,
      language_id,
    });

    const otp: IOtp = await this.otpDAO.create({
      code: generateRandomDigit(this.SMSCodeDigitsCount),
      user_id: user.id,
    });

    const locales = await this.localesService.load();

    let SMSMessage = locales['confirmation_code'][language.code].text;

    SMSMessage = changeVariablesWithValues(SMSMessage, {
      code: otp.code,
    });

    sendSMS(SMSMessage, user.phone_number);

    return {
      message: 'Confirmation code has been sent',
    };
  }

  async signin({ phone_number }: ISignin) {
    const user: IUser = await this.usersService.getByPhoneNumber(phone_number);

    if (isEmpty(user)) {
      throw new NotFoundException('User was not found');
    }

    const language = await this.languagesService.getById(user.language_id);

    const otp: IOtp = await this.otpDAO.create({
      code: generateRandomDigit(this.SMSCodeDigitsCount),
      user_id: user.id,
    });

    const locales = await this.localesService.load();

    let SMSMessage = locales['confirmation_code'][language.code].text;

    SMSMessage = changeVariablesWithValues(SMSMessage, {
      code: otp.code,
    });

    sendSMS(SMSMessage, user.phone_number);

    return {
      message: 'Confirmation code has been sent',
    };
  }

  async confirm({ code, phone_number }: IConfirm, ip) {
    const user: IUser = await this.usersService.getByPhoneNumber(phone_number);

    if (isEmpty(user)) {
      throw new BadRequestException('Phone number or code is invalid');
    }

    const lastOtp: IOtp = await this.otpDAO.getLastOtp(user.id);

    if (
      isUndefined(lastOtp) ||
      lastOtp.code !== code ||
      lastOtp.expires_in <= getCurrentDate()
    ) {
      throw new BadRequestException('Phone number or code is invalid');
    }

    await this.otpDAO.deactivateOtpById(lastOtp.id);

    const [accessToken, accessTokenExpiresOn]: (string | Date)[] =
      this.tokenService.getAccessToken(user);

    const [refreshToken, refreshTokenExpiresOn]: (string | Date)[] =
      this.tokenService.getRefreshToken(user);

    await this.usersTokenDao.create({
      access_token: accessToken as string,
      refresh_token: refreshToken as string,
      access_token_expires_on: accessTokenExpiresOn as Date,
      refresh_token_expires_on: refreshTokenExpiresOn as Date,
      user_id: user.id,
      ip,
    });

    return {
      user: {
        created_at: user.created_at,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        language_id: user.language_id,
        accessToken,
        refreshToken,
      },
    };
  }

  async refreshToken({ refresh_token }: IRefreshToken, ip) {
    const tokenInfo: IUserToken = await this.usersTokenDao.getByRefreshToken(
      refresh_token,
    );

    if (
      isEmpty(tokenInfo) ||
      getCurrentDate() > tokenInfo.refresh_token_expires_on
    ) {
      throw new UnauthorizedException();
    }

    const user: IUser = await this.usersService.getById(tokenInfo.user_id);

    const [accessToken, accessTokenExpiresOn]: (string | Date)[] =
      this.tokenService.getAccessToken(user);
    const [refreshToken, refreshTokenExpiresOn]: (string | Date)[] =
      this.tokenService.getRefreshToken(user);

    await this.usersTokenDao.create({
      access_token: accessToken as string,
      refresh_token: refreshToken as string,
      access_token_expires_on: accessTokenExpiresOn as Date,
      refresh_token_expires_on: refreshTokenExpiresOn as Date,
      user_id: user.id,
      ip,
    });

    return {
      user: {
        created_at: user.created_at,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        language_id: user.language_id,
        accessToken,
        refreshToken,
      },
    };
  }
}
