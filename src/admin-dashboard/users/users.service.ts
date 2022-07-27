import { Inject, Injectable } from '@nestjs/common';
import { UsersDAO } from './dao/users.dao';
import { ICreateUser } from './interface/users.interface';

@Injectable()
export class UsersService {
  @Inject() private usersDao: UsersDAO;

  create({ first_name, language_id, last_name, phone_number }: ICreateUser) {
    phone_number = phone_number.replace('+', '');

    return this.usersDao.create({
      first_name,
      language_id,
      last_name,
      phone_number,
    });
  }

  getByPhoneNumber(phoneNumber: string) {
    return this.usersDao.getByPhoneNumber(phoneNumber);
  }

  getById(id: string) {
    return this.usersDao.getById(id);
  }
}
