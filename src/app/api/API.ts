import { words } from '../constants/api';
import { LoginResponse, User, wordData } from '../types/types';
import { fetchUrl } from './utils';

export const getWords = async (group = '0', page = '0'): Promise<wordData[]> => {
  const response = await fetch(`${words}?group=${group}&page=${page}`);
  const data = await response.json();
  return data;
};

export async function createUser(user: User): Promise<LoginResponse | null | string> {
  const url = 'https://for-mongo-db-example.herokuapp.com/users';
  const content = fetchUrl(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return content;
}

export async function loginUser(user: User): Promise<LoginResponse | null | string> {
  const url = 'https://for-mongo-db-example.herokuapp.com/signin';
  const content = fetchUrl(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return content;
}
