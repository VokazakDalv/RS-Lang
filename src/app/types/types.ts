export type User = {
  name?: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  message?: string;
  token?: string;
  refreshToken?: string;
  userId?: string;
  name?: string;
  email?: string;
};

export type fetchOptions = {
  method: 'PUT' | 'POST' | 'DELETE' | 'PATCH';
  headers: FetchHeaders;
  body: BodyInit;
};

export type fetchReturn = string | null | LoginResponse;

export type FetchHeaders = {
  Accept: 'application/json';
  'Content-Type': 'application/json';
};

export type IUserWord = {
  userId?: string;
  wordId: string | undefined;
  word: wordDifficult;
};

export type wordDifficult = {
  difficulty: string;
  optional?: Record<string, unknown>;

export type wordData = {
  id: string;
  group: 0;
  page: 0;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string
};

export type IResult = {
  isRightAnswer: boolean;
  word: wordData | null;
};
