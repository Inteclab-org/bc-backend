import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create table if not exists user_tokens(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      access_token varchar(1024) not null,
      access_token_expires_on timestamp not null,
      refresh_token varchar(1024) not null,
      refresh_token_expires_on timestamp not null,
      user_id uuid not null references users(id),
      ip varchar(39),
      is_active boolean not null default true
    );
  `);
}

export async function down(): Promise<void> {}
