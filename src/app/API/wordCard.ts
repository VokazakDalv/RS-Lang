import { baseURL } from '../constants/api';
import { IUserWord, LoginResponse, wordDifficult } from '../types/types';

let authData: LoginResponse;
if (localStorage.authData) {
  authData = JSON.parse(localStorage.authData);
}

export const createUserWord = async ({ userId, wordId, word }: IUserWord): Promise<void> => {
  const resp = await fetch(`${baseURL}/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
};

export const deleteUserWord = async (userId: string, wordId: string): Promise<void> => {
  const resp = await fetch(`${baseURL}/users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const getUserWord = async (userId: string, wordId: string): Promise<wordDifficult | null> => {
  const resp = await fetch(`${baseURL}/users/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
    },
  });
  if (resp.status !== 200) {
    return null;
  }
  const data = await resp.json();
  return data;
};

export const getUserWords = async (userId: string): Promise<IUserWord[]> => {
  const resp = await fetch(`${baseURL}/users/${userId}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authData.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = await resp.json();
  return data;
};
