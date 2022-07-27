export interface ISignup {
  first_name: string;
  last_name: string;
  phone_number: string;
  language_id: number;
}

export interface ISignin {
  phone_number: string;
}

export interface IConfirm {
  code: string;
  phone_number: string;
}

export interface ICreateOtp {
  code: string;
  user_id: string;
}

export interface IOtp {
  id: string;
  created_at: Date;
  updated_at: Date;
  code: string;
  user_id: string;
  is_active: boolean;
  expires_in: Date;
}

export interface ICreateUserToken {
  access_token: string;
  access_token_expires_on: Date;
  refresh_token: string;
  refresh_token_expires_on: Date;
  user_id: string;
  ip: string;
}

export interface IUserToken {
  id: string;
  created_at: Date;
  access_token: string;
  access_token_expires_on: Date;
  refresh_token: string;
  refresh_token_expires_on: Date;
  user_id: string;
  ip: string;
  is_active: boolean;
}

export interface IRefreshToken {
  refresh_token: string;
}
