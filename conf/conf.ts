import { config } from 'dotenv';

config();

const { env } = process;

export const pg = {
  host: env.PG_HOST || 'localhost',
  port: env.PG_PORT || 5432,
  user: env.PG_USER || 'postgres',
  password: env.PG_PASSWORD || '5555',
  database: env.PG_DB_NAME || 'bot_constructor',
  migrationsTable: env.PG_MIGRATIONS_TABLE || 'migrations',
  maxPool: 75,
  minPool: 2,
};

export const server = {
  httpPort: env.HTTP_PORT || 4000,
  nodeEnv: env.NODE_ENV || 'development',
};

export const SMSBroker = {
  login: env.SMS_BROKER_LOGIN,
  password: env.SMS_BROKER_PASSWORD,
  apiUrl: env.SMS_BROKER_API_URL,
};
