import {
  fetchOptions, fetchReturn, LoginResponse, User,
} from '../../types/types';

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
