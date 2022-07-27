import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import {
  ConfirmDTO,
  RefreshTokenDTO,
  SigninDTO,
  SignupDTO,
} from './dto/auth.dto';

@Controller('/admin-dashboard/auth')
export class AuthController {
  @Inject() private service: AuthService;

  @Post('/signup')
  signup(@Body() body: SignupDTO) {
    return this.service.signup(body);
  }

  @Post('/signin')
  singin(@Body() body: SigninDTO) {
    return this.service.signin(body);
  }

  @Post('/confirm')
  confirm(@Body() body: ConfirmDTO, @Req() req: Request) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    return this.service.confirm(body, ip);
  }

  @Post('/refresh-token')
  refreshToken(@Body() body: RefreshTokenDTO, @Req() req: Request) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    return this.service.refreshToken(body, ip);
  }
}
