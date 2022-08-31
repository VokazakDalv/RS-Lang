import { baseURL } from '../constants/api';
import { IWord } from '../types/interface';

export async function getWord(group = 0, page = 0): Promise<IWord[]> {
  const resp = await fetch(`${baseURL}/words?group=${group}&page=${page}`);
  return resp.json();
}
