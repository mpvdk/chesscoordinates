import { SquaresUiHandler } from '../UiHandlers/SquaresUiHandler.js';
import { files, ranks } from '../common/Utils.js';

export class SquaresGame {
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

    this.uiHandler = new SquaresUiHandler(this);
    this.intervalId = null;
  }

  handleAnswer = (e) => {
    this.state.userInput = e.target.dataset.square;
    if (this.state.userInput == this.state.prompt) {
      this.state.score.correctCount++;
      this.uiHandler.resetStyles();
      this.uiHandler.flashSquare(this.state.userInput, true);
      this.updatePrompt();
    } else {
      this.state.score.wrongCount++;
      this.uiHandler.flashSquare(this.state.userInput, false);
      this.uiHandler.answerIsWrong();
    }
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
