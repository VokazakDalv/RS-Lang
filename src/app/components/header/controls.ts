import auth from '../auth';

export function isAuth(): boolean {
  if (localStorage.authData) return true;
  return false;
}

export function loginBtnHandler(): void {
  const loginBtn = document.querySelector('.login-btn');
  loginBtn?.addEventListener('click', () => {
    loginBtn.setAttribute('disabled', 'true');
    auth();
  });
}

export function logoutBtnHandler(): void {
  const logoutBtn = document.querySelector('.logout-btn') as HTMLButtonElement;
  logoutBtn?.addEventListener('click', () => {
    localStorage.clear();
    const loginBtn = document.querySelector('.login-btn') as HTMLButtonElement;
    loginBtn.hidden = false;
    logoutBtn.hidden = true;
    loginBtn.removeAttribute('disabled');
  });
}
