import { LoginResponse } from '../../types/types';
import { createUser, loginUser } from './model';

function showError(message: string): void {
  const error = document.createElement('div');
  error.className = 'error';
  error.innerHTML = `<p class="error-message">${message}</p>`;
  document.querySelector('.authorization-form')?.append(error);
  setTimeout(() => {
    document.querySelector('.authorization-form')?.lastElementChild?.remove();
  }, 3000);
}

export async function getSign(email: string, password: string): Promise<LoginResponse | null> {
  let authResponse = null;
  if ((<HTMLInputElement>document.getElementById('signup'))?.checked) {
    authResponse = await createUser({
      name: `${email}`,
      email: `${email}`,
      password: `${password}`,
    });

    if (typeof authResponse !== 'string') {
      authResponse = await loginUser({
        email: `${email}`,
        password: `${password}`,
      });
    }
  } else if ((<HTMLInputElement>document.getElementById('signin'))?.checked) {
    authResponse = await loginUser({
      email: `${email}`,
      password: `${password}`,
    });
  }

  if (typeof authResponse === 'string') {
    showError(authResponse);
    return null;
  }

  localStorage.clear();
  const authData = JSON.stringify(authResponse);
  localStorage.setItem('authData', authData);

  return authResponse;
}

export function closeAuth(): void {
  const form = document.querySelector('#authorization') as HTMLElement;
  form.remove();
}

export async function formHandler(): Promise<void> {
  const loginBtn = document.querySelector('.login-btn') as HTMLButtonElement;
  const logoutBtn = document.querySelector('.logout-btn') as HTMLButtonElement;

  document.querySelector('.authorization-form__close-btn')?.addEventListener('click', () => {
    closeAuth();
    loginBtn.removeAttribute('disabled');
  });
  localStorage.clear();
  let authResponse = null;
  if (localStorage.authData) {
    authResponse = JSON.parse(localStorage.authData);
  } else {
    document.getElementById('authorization')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = (<HTMLInputElement>document.getElementById('email'))?.value;
      const password = (<HTMLInputElement>document.getElementById('password'))?.value;
      authResponse = await getSign(email, password);
      if (authResponse?.message) {
        closeAuth();
        loginBtn.hidden = true;
        logoutBtn.hidden = false;
      }
    });
  }
}
