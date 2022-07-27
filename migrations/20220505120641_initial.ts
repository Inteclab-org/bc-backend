import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    create extension if not exists "uuid-ossp";
  `);

  await knex.schema.raw(`
    create table if not exists languages(
      id serial not null primary key,
      name varchar(32) not null,
      short_name varchar(6) not null,
      flag varchar(12) not null,
      code varchar(6) not null
    );
  `);

  await knex.schema.raw(`
    create table if not exists regions(
      id serial not null primary key,
      name jsonb not null
    );
  `);

  await knex.schema.raw(`
    create table if not exists districts(
      id serial not null primary key,
      name jsonb not null,
      region_id int not null references regions(id)
    );
  `);

  await knex.schema.raw(`
    create table if not exists users(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      first_name varchar(32) not null,
      last_name varchar(32) not null,
      phone_number varchar(16) not null,
      language_id int not null references languages(id),
      is_active bool not null default true
    );
  `);

  await knex.schema.raw(`
    create table if not exists otp_logs(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      code varchar(12) not null,
      user_id uuid not null references users(id),
      is_active bool not null default true
    );
  `);

  await knex.schema.raw(`
    create table if not exists bots(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      created_by uuid references users(id),
      updated_by uuid references users(id),
      name varchar(128) not null,
      description varchar(256) not null,
      tg_name varchar(64) not null,
      tg_id varchar(128) not null,
      tg_username varchar(64) not null,
      tg_token varchar(128) not null,
      is_running bool not null default false,
      is_active bool not null default true
    );
  `);

  await knex.schema.raw(`
    create table if not exists bot_delivery_addresses(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      created_by uuid references users(id),
      updated_by uuid references users(id),
      region_id int references regions(id),
      district_ids int[],
      bot_id uuid not null references bots(id),
      price float not null default 0.00,
      is_active bool not null default true
    );
  `);

  await knex.schema.raw(`
    create table if not exists bot_users(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      bot_id uuid not null references bots(id),
      user_id uuid not null references users(id),
      tg_id varchar(128) not null,
      tg_first_name varchar(64),
      tg_last_name varchar(64),
      tg_username varchar(64),
      language_id int not null references languages(id),
      is_blocked bool not null default false,
      is_active bool not null default true
    );
  `);

  await knex.schema.raw(`
    create table if not exists bot_steps(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      code varchar(1024) not null,
      name jsonb not null,
      details jsonb not null
    );
  `);

  await knex.schema.raw(`
    create table if not exists bot_user_logs(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      bot_user_id uuid not null references bot_users(id),
      bot_step_id uuid not null references bot_steps(id)
    );
  `);

  await knex.schema.raw(`
    create table if not exists bot_languages(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      created_by uuid references users(id),
      bot_id uuid not null references bots(id),
      language_id int not null references languages(id),
      is_active bool not null default true
    );
  `);

  await knex.schema.raw(`
    create table if not exists files(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      created_by uuid references users(id),
      original_name varchar(256) not null,
      name uuid not null,
      mimetype varchar(128) not null,
      extension varchar(128) not null,
      size int not null default 0      
    );
  `);

  await knex.schema.raw(`
    create table if not exists files(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      created_by uuid references users(id),
      original_name varchar(256) not null,
      name uuid not null,
      mimetype varchar(128) not null,
      extension varchar(128) not null,
      size int not null default 0      
    );
  `);

  await knex.schema.raw(`
    create table if not exists categories(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      created_by uuid references users(id),
      parent_id uuid not null references categories(id),
      bot_id uuid not null references bots(id),
      name jsonb not null,
      description jsonb not null,
      slug varchar(256) not null,
      is_active bool not null default true      
    );
  `);

  await knex.schema.raw(`
    create table if not exists categories(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      created_by uuid references users(id),
      parent_id uuid not null references categories(id),
      bot_id uuid not null references bots(id),
      name jsonb not null,
      description jsonb not null,
      slug varchar(256) not null,
      is_active bool not null default true      
    );
  `);

  await knex.schema.raw(`
    create table if not exists category_files(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      updated_by uuid references users(id),
      category_id uuid not null references categories(id),
      file_id uuid not null references files(id),
      is_main bool not null default false,
      is_active bool not null default true
    );
  `);

  await knex.schema.raw(`
    create table if not exists products(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      created_by uuid references users(id),
      name jsonb not null,
      description jsonb not null,
      price float not null default 0.00,
      discount smallint not null default 0,
      sku varchar(64) not null,
      slug varchar(256) not null,
      pre_order bool not null default false,
      is_exists bool not null default false,
      is_active bool not null default true
    );
  `);

  await knex.schema.raw(`
    create table if not exists product_files(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      created_by uuid references users(id),
      product_id uuid not null references products(id),
      file_id uuid not null references files(id),
      is_main bool not null default false,
      is_active bool not null default true
    );
  `);

  await knex.schema.raw(`
    create table if not exists locations(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      updated_by uuid references users(id),
      user_id uuid references users(id),
      longitude point not null,
      latitude point not null,
      address_name varchar(1024) not null,
      additional_details jsonb not null
    );
  `);

  await knex.schema.raw(`
    do $$
      begin
          if not exists (select 1 from pg_type where typname = 'order_status') then
            create type order_status as enum('1', '2', '3', '4', '5');
          end if;
      end
    $$;
  `);

  await knex.schema.raw(`
    create table if not exists orders(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      user_id uuid references users(id),
      bot_id uuid references bots(id),
      location_id uuid not null references locations(id),
      delivery_price float not null default 0.00,
      status order_status not null,
      total_price float not null default 0.00
    );
  `);

  await knex.schema.raw(`
    create table if not exists order_items(
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      order_id uuid not null references orders(id),
      quantity int not null default 0,
      price float not null default 0.00,
      discount smallint not null default 0,
      is_active bool not null default true
    );
  `);
}

export async function down(): Promise<void> {}
