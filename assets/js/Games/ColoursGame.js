import { ColoursUiHandler } from '../UiHandlers/ColoursUiHandler.js';
import { squaresColoursMap, files, ranks } from '../common/Utils.js';
import { Game } from './Game.js';

export class ColoursGame extends Game {
  constructor() {
    super();

    this.uiHandler = new ColoursUiHandler(this);
    this.intervalId = null;
  }

  handleAnswer = (e) => {
    this.state.userInput = [...e.target.classList].join().includes('light') ? 'light' : 'dark';
    const currentColour = squaresColoursMap.light.includes(this.state.prompt) ? 'light' : 'dark';
    if (this.state.userInput == currentColour) {
      this.state.score.correctCount++;
      this.uiHandler.showCorrectAnswerGiven(this.state.userInput);
    } else {
      this.state.score.wrongCount++;
      this.uiHandler.showWrongAnswerGiven(this.state.userInput);
    }
    this.updatePrompt();
  };

  updatePrompt = () => {
    this.state.prompt = files[Math.floor(Math.random() * 8)] + ranks[Math.floor(Math.random() * 8)];
    this.uiHandler.updatePrompt(this.state.prompt);
  };

  startGame = () => {
    this.state.active = true;
    this.state.score.wrongCount = 0;
    this.state.score.correctCount = 0;
    this.updatePrompt();
    if (this.state.useTimer) {
      this.startCountDown();
    }
    this.uiHandler.startGame();
  };

  stopGame = () => {
    this.state.active = false;
    clearInterval(this.intervalId);
    this.state.countdownSeconds = 30;
    this.uiHandler.stopGame();
  };

  startCountDown = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.state.countdownSeconds = 30;
    }
    this.uiHandler.setCountdown(this.state.countdownSeconds);
    this.intervalId = setInterval(() => {
      if (this.state.countdownSeconds <= 1) {
        this.stopGame();
      } else {
        this.state.countdownSeconds = this.state.countdownSeconds - 1;
        this.uiHandler.setCountdown(this.state.countdownSeconds);
      }
    }, 1000);
  };
}
