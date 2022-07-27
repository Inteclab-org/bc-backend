export interface IBot {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
  name: string;
  description: string;
  tg_name: string;
  tg_id: string;
  tg_username: string;
  tg_token: string;
  is_running: boolean;
  is_active: boolean;
}

export interface ICreateBot {
  name: string;
  description: string;
  tg_token: string;
}
