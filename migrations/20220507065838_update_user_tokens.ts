import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create or replace function update_user_tokens() returns trigger as
      $$
        begin
          update user_tokens set is_active = false where is_active = true and user_id = new.user_id;
          return new;
        end;
      $$ language plpgsql;
  `);

  await knex.raw(`
    create or replace trigger update_user_tokens_trigger before insert on user_tokens for each row execute procedure update_user_tokens();
  `);
}

export async function down(): Promise<void> {}
