import { formHandler } from './controls';
import showForm from './view';

export default async function auth(): Promise<void> {
  showForm();
  await formHandler();
}
