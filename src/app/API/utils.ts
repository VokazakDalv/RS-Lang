import { IWord, fetchOptions, fetchReturn } from '../types/types';

export function getRandomIntInclusive(minNum: number, maxNum: number): number {
  const min = Math.ceil(minNum);
  const max = Math.floor(maxNum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(array: string[] | IWord[]): string[] | IWord[] {
  array.sort(() => Math.random() - 0.5);
  return array;
}

export async function fetchUrl(url: string, options: fetchOptions): Promise<fetchReturn> {
  try {
    const response = await fetch(url, options);

    if (response.status !== 200) {
      const errMsg = await response.text();
      return errMsg;
    }
    const content = await response.json();
    return content;
  } catch (error) {
    return null;
  }
}
