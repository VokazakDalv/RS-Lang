import { baseURL } from '../constants/api';
import { IWord } from '../types/interface';
import { LoginResponse } from '../types/types';

let authData: LoginResponse;
if (localStorage.authData) {
  authData = JSON.parse(localStorage.authData);
}

export async function getWord(group = 0, page = 0): Promise<IWord[]> {
  const resp = await fetch(`${baseURL}/words?group=${group}&page=${page}`);
  return resp.json();
}

export async function getAllHardWords(userId: string): Promise<IWord[]> {
  const resp = await fetch(
    `${baseURL}/users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty": "hard"}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authData.token}`,
        Accept: 'application/json',
      },
    },
  );
  const data = await resp.json();
  return data[0].paginatedResults;
}
