import { User } from '../types/types';

export async function loginUser(user: User):Promise<Response> {
  const url = 'https://for-mongo-db-example.herokuapp.com/signin';
  const content = fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return content;
}
