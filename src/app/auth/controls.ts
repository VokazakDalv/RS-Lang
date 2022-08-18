import { loginUser } from './model';



export async function getSign(email: string, password: string): Promise<Response | null> {
  let loginResponse = null;
  if ((<HTMLInputElement>document.getElementById('signin'))?.checked) {
    loginResponse = await loginUser({
      email: `${email}`,
      password: `${password}`,
    });
  }
  return loginResponse;
}

export async function formHandling(): Promise<void> {
  // if (getSessionData().authorized) {
  //   const loginResponse = JSON.parse(getSessionData().authorized);
  //   if (loginResponse) {
  //     nextPageFunction(loginResponse);
  //   }
  // } else {
  document.getElementById('authorization')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = (<HTMLInputElement>document.getElementById('email'))?.value;
    const password = (<HTMLInputElement>document.getElementById('password'))?.value;
    const loginResponse = await getSign(email, password);
    if (loginResponse) {
      console.log(email, password);
    }
  });
  // }
}
