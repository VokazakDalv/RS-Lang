import { Footer } from "./footer";
import { Header } from "./header";
import { MainStartPage } from "./main"

export class StartPage {
  header: Header;
  main: MainStartPage;
  footer: Footer;

  constructor() {
    this.header = new Header();
    this.main = new MainStartPage();
    this.footer = new Footer();

    document.body.append(this.header.headerBlock,
      this.main.mainBlok,
      this.footer.footerBlok)
  }
}

const page = new StartPage();
