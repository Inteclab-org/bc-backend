import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IBot, ICreateBot } from './interface/bots.interface';
import axios from 'axios';
import { BotsDAO } from './dao/bots.dao';
import { isNotEmpty } from 'class-validator';
import { IUser } from '../users/interface/users.interface';

@Injectable()
export class BotsService {
  @Inject() private botsDAO: BotsDAO;

  async create({ description, name, tg_token }: ICreateBot, user: IUser) {
    const current: IBot = await this.botsDAO.getByTgToken(tg_token);

    if (isNotEmpty(current)) {
      throw new ConflictException('Bot already exists');
    }

    const botInfo = await this.getBotInfoFromTg(tg_token);

    if (!botInfo) {
      throw new ConflictException('Bot not found');
    }

    const created: IBot = await this.botsDAO.create({
      description,
      name,
      tg_token,
      tg_name: botInfo.first_name,
      tg_username: botInfo.username,
      tg_id: botInfo.id,
      created_by: user.id,
    });

    return created;
  }

  private async getBotInfoFromTg(botToken: string) {
    return await (
      await axios.get(`https://api.telegram.org/bot${botToken}/getMe`)
    ).data.result;
  }
}
