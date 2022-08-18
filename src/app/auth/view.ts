const showForm = ():void => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  mainContainer.innerHTML = '';

  const form = document.createElement('form');
  form.id = 'authorization';
  form.className = 'authorization-form';
  mainContainer.append(form);

  const inputSignIn = document.createElement('input') as HTMLInputElement;
  inputSignIn.checked = true;
  inputSignIn.id = 'signin';
  inputSignIn.className = 'authorization-form__radio__input__signin';
  inputSignIn.name = 'action';
  inputSignIn.type = 'radio';
  form.append(inputSignIn);

  const labelSignIn = document.createElement('label');
  labelSignIn.className = 'authorization-form__label';
  labelSignIn.htmlFor = 'signin';
  labelSignIn.innerText = 'Sign in';
  form.append(labelSignIn);

  const inputSignUp = document.createElement('input');
  inputSignUp.id = 'signup';
  inputSignUp.className = 'authorization-form__radio__input__signup';
  inputSignUp.name = 'action';
  inputSignUp.type = 'radio';
  form.append(inputSignUp);

  const labelSignUp = document.createElement('label');
  labelSignUp.className = 'authorization-form__label';
  labelSignUp.htmlFor = 'signup';
  labelSignUp.innerText = 'Sign up';
  form.append(labelSignUp);

  const wrapper = document.createElement('div');
  wrapper.className = 'authorization-form__wrapper';
  form.append(wrapper);

  const arrow = document.createElement('div');
  arrow.className = 'authorization-form__arrow';
  wrapper.append(arrow);

  const inputEmail = document.createElement('input');
  inputEmail.className = 'authorization-form__input';
  inputEmail.type = 'email';
  inputEmail.id = 'email';
  inputEmail.placeholder = 'Enter email';
  inputEmail.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$';
  inputEmail.required = true;
  wrapper.append(inputEmail);

  const inputPassword = document.createElement('input');
  inputPassword.className = 'authorization-form__input';
  inputPassword.type = 'password';
  inputPassword.id = 'password';
  inputPassword.placeholder = 'Enter password';
  inputPassword.pattern = '(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{8,}';
  // eslint-disable-next-line max-len
  inputPassword.title = 'A form with a password field that must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter,one special character from: +-_@$!%*?&#.,;:[]{}';
  inputPassword.required = true;
  wrapper.append(inputPassword);

  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'authorization-form__button';

  const spanIn = document.createElement('span');
  spanIn.className = 'authorization-form__button__item';
  spanIn.innerText = 'Sign In';
  button.append(spanIn);

  const spanUp = document.createElement('span');
  spanUp.className = 'authorization-form__button__item';
  spanUp.innerText = 'Sign Up';
  button.append(spanUp);
  form.append(button);

  document.querySelector('body')?.classList.add('authorization-form__body__background');
  document.querySelector('.main-container')?.classList.add('main-container__form');
};

export default showForm;
