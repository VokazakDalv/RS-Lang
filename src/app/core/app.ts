import { getRandomIntInclusive, getWords, shuffle } from '../api/textbook';
import { AudioGame } from '../components/audioGame/audiogame';
import { Component } from '../components/component';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { IResult, wordData } from '../types/types';
import { routing, defaultRoute } from './router';

export class App {
  roundWords: string[] = [];

  right: null | wordData = null;

  audioGame: AudioGame | null = null;

  gameResults: IResult[] = [];

  level = 0;

  enableRouteChange = (): void => {
    let main: Component | HTMLElement;
    let game: Component;
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = routing.find((p) => p.name === currentRouteName);
      if (!document.body.children.length) {
        document.body.append(new Header().headerBlock, new Footer().footerBlock);
      } else {
        (main as HTMLElement).remove();
      }

      if (currentRoute) {
        game = currentRoute.component();
        main = game.node;
      } else if (defaultRoute) {
        main = defaultRoute.component();
      }
      document.body.lastElementChild?.before(main as HTMLElement);

      if (currentRouteName === 'games/audio') {
        this.audioGame = game as AudioGame;
        this.audioGame.levels.onLevel = (level) => {
          if (this.audioGame) {
            this.audioGame.levels.destroy();
            this.audioGame.gameLevel = level;
            this.addListenersAudio(this.audioGame);
            this.level = level - 1;
            this.startAudioGameRound(this.audioGame, this.level);
          }
          return level;
        };
      }
    };

    const popstateEvent = new Event('popstate');
    window.dispatchEvent(popstateEvent);
  };

  addListenersAudio(audioGame: AudioGame):void {
    document.onkeydown = (e) => this.handleKeyboard(e);
    Array.from(audioGame.audioOptions.node.children).forEach((el) => {
      (el as HTMLElement).onclick = () => {
        if (this.right && (el as HTMLElement).innerHTML.slice(2) === this.right.wordTranslate) {
          audioGame.renderAnswer(this.right, '');
          this.gameResults.push({
            isRightAnswer: true,
            word: this.right,
          });
          if (this.gameResults.length === 20) {
            this.stopAudioGame();
            this.gameResults = [];
          }
        } else if (this.right && (el as HTMLElement).innerHTML.slice(2) !== this.right.wordTranslate) {
          audioGame.renderAnswer(this.right, (el as HTMLElement).innerHTML.slice(2));
          this.gameResults.push({
            isRightAnswer: false,
            word: this.right,
          });
          if (this.gameResults.length === 20) {
            this.stopAudioGame();
            this.gameResults = [];
          }
        }
      };
    });
    audioGame.audioPlayBtn.node.onclick = () => {
      (audioGame.audio.node as HTMLAudioElement).play();
    };

    audioGame.audioControl.node.onclick = () => this.handleControl(audioGame);

    audioGame.gameResult.resultClose.node.onclick = () => {
      window.location.hash = '#games';
    };
  }

  handleKeyboard(e: KeyboardEvent): void {
    if (e.code === 'Enter' && this.audioGame) {
      this.handleControl(this.audioGame);
    } else if (Number(e.key) >= 1 && Number(e.key) <= 5) {
      if (this.audioGame) {
        const answerBtn = Array.from(this.audioGame.audioOptions.node.children)
          .filter((btn) => Number(btn.textContent?.slice(0, 1)) === Number(e.key))[0];
        const event = new Event('click', { bubbles: true });
        (answerBtn as HTMLButtonElement).dispatchEvent(event);
      }
    }
    if (e.code === 'Space') {
      (this.audioGame?.audio.node as HTMLAudioElement).play();
    }
  }

  handleControl(audioGame: AudioGame):void {
    if (audioGame.audioControl.node.innerText === 'НЕ ЗНАЮ') {
      this.gameResults.push({
        isRightAnswer: false,
        word: this.right,
      });
      if (this.gameResults.length === 20) {
        this.stopAudioGame();
        this.gameResults = [];
      }
    }
    if (this.right && audioGame.audioControl.node.innerText === 'НЕ ЗНАЮ') {
      audioGame.renderAnswer(this.right, '');
    } else if (this.audioGame) {
      this.startAudioGameRound(this.audioGame, this.level);
    }
  }

  startAudioGameRound(audioGame: AudioGame, group: number):void {
    this.roundWords = [];
    getWords(`${group}`, `${getRandomIntInclusive(0, 5)}`).then((gameWords) => {
      Array.from(audioGame.audioOptions.node.children)
        .forEach((el, i: number) => {
          let roundWord: wordData;
          do {
            roundWord = gameWords[getRandomIntInclusive(0, 19)];
          } while (this.roundWords.indexOf(roundWord.wordTranslate) >= 0 || this.checkAnswerBelong(roundWord));
          this.roundWords.push(roundWord.wordTranslate);
          if (i === 4) {
            this.right = roundWord;
          }
        });
      if (this.right) audioGame.renderData(shuffle(this.roundWords), this.right.audio);
      (audioGame.audio.node as HTMLAudioElement).play();
    });
  }

  checkAnswerBelong(roundWord: wordData):boolean {
    return this.gameResults.filter((el) => el.word?.wordTranslate === roundWord.wordTranslate).length > 0;
  }

  stopAudioGame():void {
    document.onkeydown = () => null;
    this.audioGame?.gameResult.node.classList.add('result__container_active');
    this.audioGame?.gameResult.renderResults(this.gameResults);
    this.gameResults = [];
  }
}
