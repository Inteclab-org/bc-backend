import { SMSBroker } from 'conf/conf';
import ObjectID from 'bson-objectid';
import axios from 'axios';

export function generateObjectId() {
  return new ObjectID().toString();
}

export function getFirst(v: any[]) {
  return v[0];
}

export function generateRandomDigit(max: number) {
  return Math.round(Math.random() * 10 ** max)
    .toString()
    .padEnd(max, '0');
}

export function changeVariablesWithValues(str: string, structure: Object) {
  Object.keys(structure).forEach((key) => {
    str = str.replace(`{{${key}}}`, structure[key].toString());
  });
  return str;
}

export function sendSMS(text: string, recipient: string) {
  return axios.post(
    SMSBroker.apiUrl,
    {
      messages: [
        {
          recipient,
          'message-id': generateObjectId(),
          sms: {
            originator: '3700',
            content: {
              text,
            },
          },
        },
      ],
    },
    {
      headers: {
        login: SMSBroker.login,
        password: SMSBroker.password,
        'Content-Type': 'application/json',
      },
    },
  );
}

export function jwtExpiresInToDate(expiresIn: number) {
  return getDateByValue(expiresIn * 1000);
}

export function getCurrentDate() {
  return new Date();
}

export function getDateByValue(date) {
  return new Date(date);
}
