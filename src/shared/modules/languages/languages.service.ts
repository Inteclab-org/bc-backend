import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { LanguagesDao } from './dao/languages.dao';

@Injectable()
export class LanguagesService {
  @Inject() private languagesDao: LanguagesDao;

  getById(languageId: number) {
    return this.languagesDao.getById(languageId);
  }
}
