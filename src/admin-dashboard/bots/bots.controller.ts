import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '../users/decorator/user.decorator';
import { IUser } from '../users/interface/users.interface';
import { BotsService } from './bots.service';
import { CreateBotDTO } from './dto/bots.dto';

@UseGuards(JwtAuthGuard)
@Controller('/admin-dashboard/bots')
export class BotsController {
  @Inject() private botsService: BotsService;

  @Post()
  create(@Body() body: CreateBotDTO, @User() user: IUser) {
    return this.botsService.create(body, user);
  }
}
