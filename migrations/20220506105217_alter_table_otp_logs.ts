import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    alter table otp_logs add column if not exists expires_in timestamp;
  `);
}

export async function down(): Promise<void> {}
