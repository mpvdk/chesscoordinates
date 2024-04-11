import { RanksUiHandler } from '../UiHandlers/RanksUiHandler.js';
import { ranks } from '../common/Utils.js';

export class RanksGame {
  constructor() {
    // game state
    this.state = {
      active: false,
      countdownSeconds: 30,
      userInput: '',
      prompt: '',
      score: {
        wrongCount: 0,
        correctCount: 0,
      },
    };

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
    this.state.prompt = ranks[Math.floor(Math.random() * 8)];
    this.uiHandler.updatePrompt(this.state.prompt);
  };

  startGame = () => {
    this.state.active = true;
    this.state.score.wrongCount = 0;
    this.state.score.correctCount = 0;
    this.updatePrompt();
    this.startCountDown();

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
