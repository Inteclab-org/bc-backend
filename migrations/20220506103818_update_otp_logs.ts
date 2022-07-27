import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create or replace function update_otp_logs() returns trigger as
      $$
        begin
          update otp_logs set is_active = false where is_active = true and user_id = new.user_id;
          new.expires_in = new.created_at + (interval '5 minute');
          return new;
        end;
      $$ language plpgsql;
  `);

  await knex.raw(`
    create or replace trigger update_otp_logs_trigger before insert on otp_logs for each row execute procedure update_otp_logs();
  `);
}

export async function down(): Promise<void> {}
