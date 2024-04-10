export class ColoursUiHandler {
  constructor(game) {
    this.game = game;

    // ========
    // elements
    // ========
    this.els = {};
    this.els.score = document.querySelector('#score');
    this.els.scoreCloseButton = document.querySelector('#score button');
    this.els.scoreCorrectCount = document.querySelector('#score .correct-count');
    this.els.scoreWrongCount = document.querySelector('#score .wrong-count');

    this.els.startStopButton = document.querySelector('.start-stop-button');
    this.els.startStopText = document.querySelector('.start-stop-text');
    this.els.prompt = document.querySelector('.colours-game-prompt');
    this.els.lightAnswer = document.querySelector('.colours-game-light');
    this.els.darkAnswer = document.querySelector('.colours-game-dark');
    this.els.countDown = document.querySelector('.countdown-sec');
    this.els.lighCheckmark = document.querySelector('.colours-game-light-checkmark');
    this.els.lighCross = document.querySelector('.colours-game-light-cross');
    this.els.darkCheckmark = document.querySelector('.colours-game-dark-checkmark');
    this.els.darkCross = document.querySelector('.colours-game-dark-cross');

    // =========
    // listeners
    // =========
    this.els.scoreCloseButton.addEventListener('click', this.hideScore);
    this.els.startStopButton.addEventListener('click', this.startStopButtonPressed);
  }

  // =========
  // universal
  // =========
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
    if (secs < 0) this.els.countDown.textContent = '';
    else this.els.countDown.textContent = ' - ' + secs;
  };

  stopGame = () => {
    this.setCountdown(-1);
    this.els.startStopText.textContent = 'start';
    this.els.lightAnswer.removeEventListener('click', this.game.handleAnswer);
    this.els.darkAnswer.removeEventListener('click', this.game.handleAnswer);
    this.els.prompt.textContent = '...';
    this.showScore();
  };

  showScore = () => {
    this.els.scoreCorrectCount.textContent = this.game.state.score.correctCount;
    this.els.scoreWrongCount.textContent = this.game.state.score.wrongCount;
    this.els.score.classList.remove('hidden');
  };

  startStopButtonPressed = () => {
    if (this.game.state.active) this.game.stopGame();
    else this.game.startGame();
  };

  startGame = () => {
    this.els.score.classList.add('hidden');
    this.els.startStopText.textContent = 'stop';
    this.els.lightAnswer.addEventListener('click', this.game.handleAnswer);
    this.els.darkAnswer.addEventListener('click', this.game.handleAnswer);
  };

  showWrongAnswerGiven = (answerGiven) => {
    if (answerGiven == 'light') {
      this.els.lighCross.classList.remove('hidden');
      setTimeout(() => this.els.lighCross.classList.add('hidden'), 300);
    } else {
      this.els.darkCross.classList.remove('hidden');
      setTimeout(() => this.els.darkCross.classList.add('hidden'), 300);
    }
  };

  showCorrectAnswerGiven = (answerGiven) => {
    if (answerGiven == 'light') {
      this.els.lighCheckmark.classList.remove('hidden');
      setTimeout(() => this.els.lighCheckmark.classList.add('hidden'), 300);
    } else {
      this.els.darkCheckmark.classList.remove('hidden');
      setTimeout(() => this.els.darkCheckmark.classList.add('hidden'), 300);
    }
  };
}
