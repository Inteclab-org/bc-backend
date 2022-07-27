import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import KnexService from 'src/shared/providers/knex.service';
import { ICreateUser, IUser } from '../interface/users.interface';
import { isEmpty } from 'lodash';
import { getFirst } from 'src/shared/utils/utils';

@Injectable()
export class UsersDAO {
  @Inject() private knexService: KnexService;

  getById(id: string): Knex.QueryBuilder<IUser> {
    return this.knexService
      .instance('users')
      .where({ id, is_active: true })
      .first();
  }

  getByPhoneNumber(phoneNumber: string): Knex.QueryBuilder<IUser> {
    return this.knexService
      .instance('users')
      .where({ phone_number: phoneNumber, is_active: true })
      .first();
  }

  async create({
    first_name,
    last_name,
    phone_number,
    language_id,
  }: ICreateUser) {
    const current = await this.getByPhoneNumber(phone_number);

    if (isEmpty(current)) {
      return getFirst(
        await this.knexService
          .instance('users')
          .insert({
            first_name,
            last_name,
            phone_number,
            language_id,
          })
          .returning('*'),
      );
    }

    return current;
  }
}
