import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('languages').del();

  await knex('languages').insert([
    { id: 1, name: 'Uzbek', short_name: 'uz', flag: 'πΊπΏ', code: 'uz' },
    { id: 2, name: 'English', short_name: 'en', flag: 'πΊπΈ', code: 'en' },
    { id: 3, name: 'Russian', short_name: 'ru', flag: 'π·πΊ', code: 'ru' },
  ]);
}
