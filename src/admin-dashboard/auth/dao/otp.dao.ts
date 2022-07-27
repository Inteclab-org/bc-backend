import { Inject, Injectable } from '@nestjs/common';
import KnexService from 'src/shared/providers/knex.service';
import { ICreateOtp } from '../interface/auth.interface';
import { getFirst } from 'src/shared/utils/utils';

@Injectable()
export class OtpDAO {
  @Inject() private knexService: KnexService;

  async create({ code, user_id }: ICreateOtp) {
    return getFirst(
      await this.knexService
        .instance('otp_logs')
        .insert({
          code,
          user_id,
        })
        .returning('*'),
    );
  }

  async getLastOtp(userId: string) {
    return getFirst(
      await this.knexService
        .instance('otp_logs')
        .where({ user_id: userId, is_active: true }),
    );
  }

  deactivateOtpById(id: string) {
    return this.knexService
      .instance('otp_logs')
      .update({ is_active: false })
      .where('id', id)
      .returning('*');
  }
}
