import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('admin_dashboard_locales').del();

  await knex('admin_dashboard_locales').insert([
    {
      key: 'confirmation_code',
      value: {
        uz: {
          text: 'Tasdiqlash kodi: {{code}}, bu kodni hech kimga aytmang',
        },
        ru: {
          text: 'Verification code: {{code}}, do not tell this code to anyone',
        },
        en: {
          text: 'Код подтверждения: {{code}}, никому не сообщайте этот код',
        },
      },
    },
  ]);
}
