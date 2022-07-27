export interface ICreateUser {
  first_name: string;
  last_name: string;
  phone_number: string;
  language_id: number;
}

export interface IUser {
  id: string;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  phone_number: string;
  language_id: number;
  is_active: boolean;
}
