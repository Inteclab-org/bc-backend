import type { Knex } from 'knex';
import { pg } from './conf/conf';

const {
  database,
  host,
  maxPool,
  migrationsTable,
  minPool,
  password,
  port,
  user,
} = pg;

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host,
      port: +port,
      database,
      user,
      password,
    },
    pool: {
      min: minPool,
      max: maxPool,
    },
    migrations: {
      tableName: migrationsTable,
    },
  },
  staging: {
    client: 'postgresql',
    connection: {
      host,
      port: +port,
      database,
      user,
      password,
    },
    pool: {
      min: minPool,
      max: maxPool,
    },
    migrations: {
      tableName: migrationsTable,
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      host,
      port: +port,
      database,
      user,
      password,
    },
    pool: {
      min: minPool,
      max: maxPool,
    },
    migrations: {
      tableName: migrationsTable,
    },
  },
};

export default config;
