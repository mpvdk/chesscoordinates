import { RanksUiHandler } from '../UiHandlers/RanksUiHandler.js';
import { ranks } from '../common/Utils.js';
import { Game } from './Game.js';

export class RanksGame extends Game {
  constructor() {
    super();

    this.uiHandler = new RanksUiHandler(this);
    this.intervalId = null;
  }

  handleAnswer = (e) => {
    this.state.userInput = e.target.dataset.rank;
    if (this.state.userInput == this.state.prompt) {
      this.state.score.correctCount++;
      this.uiHandler.resetStyles();
      this.uiHandler.flashRank(this.state.userInput, true);
      this.updatePrompt();
    } else {
      this.state.score.wrongCount++;
      this.uiHandler.flashRank(this.state.userInput, false);
      this.uiHandler.answerIsWrong();
    }
  };

  updatePrompt = () => {
    const oldPrompt = this.state.prompt;
    while (oldPrompt == this.state.prompt) this.state.prompt = ranks[Math.floor(Math.random() * 8)];
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
