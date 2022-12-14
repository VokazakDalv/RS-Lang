import { SprintGame } from '../components/sprintGame/sprintGame';
import { getRandomIntInclusive, shuffle } from '../helpers/textbook';
import { AudioGame } from '../components/audioGame/audiogame';
import { Component } from '../components/component';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { IResult, IWord } from '../types/types';
import { routing, defaultRoute } from './router';
import { audioSrc } from '../constants/gamesSounds';
import { getWord } from '../API/textbook';

export class App {
  roundWords: string[] = [];

  rightAnswer: null | IWord = null;

  audioGame: AudioGame | null = null;

  sprintGame: SprintGame | null = null;

  gameResults: IResult[] = [];

  level = 0;

  page = 0;

  enableRouteChange = (): void => {
    let main: Component | HTMLElement;
    let game: Component;
    window.onpopstate = () => {
      document.onkeydown = () => null;
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
        if (this.audioGame.levels) {
          this.audioGame.levels.onLevel = (level) => {
            if (this.audioGame) {
              this.audioGame.levels?.destroy();
              this.audioGame.gameLevel = level;
              this.startAudioGameRound();
            }
            return level;
          };
        } else {
          this.startAudioGameRound();
        }
        this.addListenersAudio();
      }
      if (currentRouteName === 'games/sprint') {
        this.sprintGame = game as SprintGame;
        if (localStorage.group) {
          this.sprintGame.levels.destroy();
          const group = localStorage.getItem('group');
          this.sprintGame.gameLevel = group ? +group : 0;
          this.sprintGame.run();
          this.sprintGame.startTimer();
        }
        this.sprintGame.levels.onLevel = (level) => {
          if (this.sprintGame) {
            this.sprintGame.levels.destroy();
            this.sprintGame.gameLevel = level - 1;
            this.level = level - 1;
            this.sprintGame.run();
            this.sprintGame.startTimer();
          }
          return level;
        };
      }
    };

    const popstateEvent = new Event('popstate');
    window.dispatchEvent(popstateEvent);
  };

  addListenersAudio(): void {
    document.onkeydown = (e) => this.handleKeyboard(e);
    if (this.audioGame) {
      Array.from(this.audioGame.audioOptions.node.children).forEach((el) => {
        (el as HTMLElement).onclick = () => {
          if (
            this.rightAnswer
            && (el as HTMLElement).innerHTML.slice(2) === this.rightAnswer.wordTranslate
          ) {
            this.audioGame?.renderAnswer(this.rightAnswer, '');
            this.playAudio(audioSrc.right);
            this.gameResults.push({
              isRightAnswer: true,
              word: this.rightAnswer,
            });
            if (this.gameResults.length === 20) {
              this.stopGame('audio');
              this.gameResults = [];
            }
          } else if (
            this.rightAnswer
            && (el as HTMLElement).innerHTML.slice(2) !== this.rightAnswer.wordTranslate
          ) {
            this.audioGame?.renderAnswer(this.rightAnswer, (el as HTMLElement).innerHTML.slice(2));
            this.playAudio(audioSrc.wrong);
            this.gameResults.push({
              isRightAnswer: false,
              word: this.rightAnswer,
            });
            if (this.gameResults.length === 20) {
              this.stopGame('audio');
              this.gameResults = [];
            }
          }
        };
      });
      this.audioGame.audioPlayBtn.node.onclick = () => {
        (this.audioGame?.audio.node as HTMLAudioElement).play();
      };

      this.audioGame.audioControl.node.onclick = () => this.handleControl();

      this.audioGame.gameResult.resultClose.node.onclick = () => {
        window.location.hash = '#games';
      };
    }
  }

  handleKeyboard(e: KeyboardEvent): void {
    const control = this.audioGame?.audioControl.node.innerText;
    if (e.code === 'Enter' && this.audioGame) {
      this.handleControl();
    } else if (
      Number(e.key) >= 1
      && Number(e.key) <= 5
      && this.audioGame
      && control === '???? ????????'
    ) {
      const answerBtn = Array.from(this.audioGame.audioOptions.node.children).filter(
        (btn) => Number(btn.textContent?.slice(0, 1)) === Number(e.key),
      )[0];
      const event = new Event('click', { bubbles: true });
      (answerBtn as HTMLButtonElement).dispatchEvent(event);
    }
    if (e.code === 'Space') {
      (this.audioGame?.audio.node as HTMLAudioElement).play();
    }
  }

  handleControl(): void {
    if (this.audioGame?.audioControl.node.innerText === '???? ????????') {
      this.playAudio(audioSrc.wrong);
      this.gameResults.push({
        isRightAnswer: false,
        word: this.rightAnswer,
      });
      if (this.gameResults.length === 20) {
        this.stopGame('audio');
        this.gameResults = [];
      }
    }
    if (this.rightAnswer && this.audioGame?.audioControl.node.innerText === '???? ????????') {
      this.audioGame.renderAnswer(this.rightAnswer, '');
    } else if (this.audioGame) {
      this.startAudioGameRound();
    }
  }

  startAudioGameRound(): void {
    this.roundWords = [];
    const startPlace = localStorage.getItem('audio-start-place');
    const pageLS = localStorage.getItem('page');
    const groupLS = localStorage.getItem('group') ? localStorage.getItem('group') : 0;
    const page = (startPlace === 'textbook') ? pageLS : `${getRandomIntInclusive(0, 29)}`;
    getWord(Number(groupLS), Number(page)).then((gameWords) => {
      if (this.audioGame) {
        Array.from(this.audioGame.audioOptions.node.children).forEach((el, i: number) => {
          let roundWord: IWord;
          do {
            roundWord = gameWords[getRandomIntInclusive(0, 19)];
          } while (this.roundWords.indexOf(roundWord.wordTranslate) >= 0);
          this.roundWords.push(roundWord.wordTranslate);
          if (i === 4) {
            while (this.checkAnswerBelong(this.roundWords[i])) {
              this.roundWords[i] = gameWords[getRandomIntInclusive(0, 19)].wordTranslate;
            }
            [this.rightAnswer] = gameWords.filter(
              (word) => word.wordTranslate === this.roundWords[i],
            );
          }
        });
        if (this.rightAnswer) {
          this.audioGame.renderData(shuffle(this.roundWords), this.rightAnswer.audio);
        }
        (this.audioGame.audio.node as HTMLAudioElement).play();
      }
    });
  }

  checkAnswerBelong(roundWord: string): boolean {
    return this.gameResults.filter((el) => el.word?.wordTranslate === roundWord).length > 0;
  }

  playAudio(src: string): void {
    const audio = this.audioGame?.audioPlay.node as HTMLAudioElement;
    audio.volume = 0.5;
    audio.setAttribute('src', src);
    audio.setAttribute('autoplay', 'true');
    audio.setAttribute('muted', 'true');
  }

  stopGame(gameName: string): void {
    document.onkeydown = () => null;
    const game = gameName === 'audio' ? this.audioGame : this.sprintGame;
    game?.gameResult.node.classList.add('result__container_active');
    game?.gameResult.renderResults(this.gameResults);
    this.gameResults = [];
  }
}
