import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  IConfirm,
  IRefreshToken,
  ISignin,
  ISignup,
} from '../interface/auth.interface';

export class SignupDTO implements ISignup {
  @ApiProperty()
  @IsDefined()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsDefined()
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  language_id: number;
}

export class SigninDTO implements ISignin {
  @ApiProperty()
  @IsDefined()
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;
}

export class ConfirmDTO implements IConfirm {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsDefined()
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;
}

export class RefreshTokenDTO implements IRefreshToken {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
