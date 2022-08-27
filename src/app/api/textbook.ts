import { words } from '../constants/api';
import { wordData } from '../types/types';

export const getWords = async (group = '0', page = '0'): Promise<wordData[]> => {
  const response = await fetch(`${words}?group=${group}&page=${page}`);
  return response.json();
};

export function getRandomIntInclusive(minNum: number, maxNum: number):number {
  const min = Math.ceil(minNum);
  const max = Math.floor(maxNum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(array: string[]):string[] {
  array.sort(() => Math.random() - 0.5);
  return array;
}
