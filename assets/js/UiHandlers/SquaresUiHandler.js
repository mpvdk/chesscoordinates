import UiHandler from './UiHandler.js';

export class SquaresUiHandler extends UiHandler {
  constructor(game) {
    super();
    this.game = game;
    // ========
    // elements
    // ========
    this.els.score = document.querySelector('#score');
    this.els.scoreCloseButton = document.querySelector('#score button');
    this.els.scoreCorrectCount = document.querySelector('#score .correct-count');
    this.els.scoreWrongCount = document.querySelector('#score .wrong-count');
    this.els.board = document.querySelector('.board');
    this.els.prompt = document.querySelector('.prompt');
    this.els.countDown = document.querySelector('.countdown-sec');
    this.els.startStopButton = document.querySelector('.start-stop-button');
    this.els.startStopText = document.querySelector('.start-stop-text');
    this.els.flipBoardButton = document.querySelector('#flip-board-button');
    this.els.timerSwitchContainer = document.querySelector('.timer-switch-container');

    // =========
    // listeners
    // =========
    this.els.scoreCloseButton.addEventListener('click', this.hideScore);
    this.els.flipBoardButton.addEventListener('click', this.flipBoard);
    this.els.startStopButton.addEventListener('click', this.startStopButtonPressed);
  }

  hideScore = () => {
    this.els.score.classList.add('hidden');
  };

  showScore = (correctCount, wrongCount, gameType) => {
    this.els.scoreCorrectCount.textContent = correctCount;
    this.els.scoreWrongCount.textContent = wrongCount;
    this.els.score.classList.remove('hidden');
  };

  updatePrompt = (square) => {
    this.els.prompt.textContent = square;
  };

  setCountdown = (secs) => {
    if (secs < 0) {
      this.els.countDown.textContent = '';
    } else {
      this.els.countDown.textContent = ' - ' + secs;
    }
  };

  stopGame = () => {
    this.setCountdown(-1);
    this.els.prompt.classList.add('hidden');
    this.els.startStopText.textContent = 'start';
    this.els.flipBoardButton.classList.remove('hidden');
    this.els.board.removeEventListener('click', this.game.handleAnswer);
    this.els.timerSwitchContainer.classList.remove('hidden');
    this.showScore();
  };

  showScore = () => {
    this.els.scoreCorrectCount.textContent = this.game.state.score.correctCount;
    this.els.scoreWrongCount.textContent = this.game.state.score.wrongCount;
    this.els.score.classList.remove('hidden');
  };

  hidePrompt = () => {
    this.els.prompt.classList.add('hidden');
  };

  startStopButtonPressed = () => {
    if (this.game.state.active) this.game.stopGame();
    else this.game.startGame();
  };

  startGame = () => {
    this.els.score.classList.add('hidden');
    this.els.startStopText.textContent = 'stop';
    this.els.prompt.classList.remove('hidden');
    this.els.flipBoardButton.classList.add('hidden');
    this.els.board.addEventListener('click', this.game.handleAnswer);
    this.els.timerSwitchContainer.classList.add('hidden');
  };

  answerIsWrong = () => {
    this.els.prompt.classList.add('wrong');
    setTimeout(() => this.els.prompt.classList.remove('wrong'), 350);
  };

  resetStyles = () => {
    this.els.prompt.classList.remove('wrong');
  };

  flashSquare = (square, answerIsCorrect) => {
    const hlClass = answerIsCorrect ? 'highlight' : 'highlight-wrong';
    const el = document.querySelector('.square[data-square="' + square + '"]');
    el.classList.add(hlClass);
    setTimeout(() => el.classList.remove(hlClass), 200);
  };

  flipBoard = () => {
    this.els.board.classList.toggle('flipped');
  };
}
