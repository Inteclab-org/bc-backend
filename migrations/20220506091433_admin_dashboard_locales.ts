import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create table if not exists admin_dashboard_locales(
      key varchar(256) not null primary key,
      value jsonb not null
    );
  `);
}

export async function down(): Promise<void> {}
