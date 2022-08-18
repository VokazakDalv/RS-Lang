import './style.scss';

import { Header } from './app/components/header/header';
import { MainStartPage } from './app/components/main/main';
import { Footer } from './app/components/footer/footer';

const header = new Header();
const main = new MainStartPage();
const footer = new Footer();

document.body.append(header.headerBlock, main.mainBloсk, footer.footerBloсk);
