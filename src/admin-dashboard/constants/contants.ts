import { config } from 'dotenv';

config();

const { env } = process;

export const accessToken = {
  secret: env.AD_ACCESS_TOKEN_SECRET,
  expiresIn: env.AD_ACCESS_TOKEN_EXPIRES_IN,
};

export const refreshToken = {
  secret: env.AD_REFRESH_TOKEN_SECRET,
  expiresIn: env.AD_REFRESH_TOKEN_EXPIRES_IN,
};
