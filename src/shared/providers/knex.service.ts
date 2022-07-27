import { Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';
import knexConfig from '../../../knexfile';
import { server } from '../../../conf/conf';

@Injectable()
export default class KnexService {
  private connection: Knex;

  get instance(): Knex {
    if (!this.connection) {
      return knex(knexConfig[server.nodeEnv]);
    }
    return this.connection;
  }
}
