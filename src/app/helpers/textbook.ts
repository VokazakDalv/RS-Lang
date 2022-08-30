export function getRandomIntInclusive(minNum: number, maxNum: number):number {
  const min = Math.ceil(minNum);
  const max = Math.floor(maxNum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(array: string[]):string[] {
  array.sort(() => Math.random() - 0.5);
  return array;
}
