import { fenToSVGMap } from './Utils.js';

export class UiHandler {
  constructor(game) {
    this.game = game;

    // ========
    // elements
    // ========
    // universal
    this.els = {};
    this.els.nav = document.querySelector('nav');
    this.els.navButtons = document.querySelectorAll('nav a');
    this.els.score = document.querySelector('#score');
    this.els.scoreCloseButton = document.querySelector('#score button');
    this.els.scoreGameType = document.querySelector('#score .score-heading-game-type');
    this.els.scoreCorrectCount = document.querySelector('#score .correct-count');
    this.els.scoreWrongCount = document.querySelector('#score .wrong-count');
    // ranks-files-squares game
    this.els.ranksFilesSquaresGame = {};
    this.els.ranksFilesSquaresGame.container = document.querySelector('#ranks-files-squares-game');
    this.els.ranksFilesSquaresGame.board = document.querySelector('#ranks-files-squares-game .board');
    this.els.ranksFilesSquaresGame.prompt = document.querySelector('#ranks-files-squares-game .prompt');
    this.els.ranksFilesSquaresGame.countDown = document.querySelector('#ranks-files-squares-game .countdown-sec');
    this.els.ranksFilesSquaresGame.startStopButton = document.querySelector('#ranks-files-squares-game .start-stop-button');
    this.els.ranksFilesSquaresGame.startStopText = document.querySelector('#ranks-files-squares-game .start-stop-text');
    this.els.ranksFilesSquaresGame.flipBoardButton = document.querySelector('#ranks-files-squares-game .flip-board-button');
    // positions game
    this.els.positionsGame = {};
    this.els.positionsGame.container = document.querySelector('#positions-game');
    this.els.positionsGame.board = document.querySelector('#positions-game .board');
    this.els.positionsGame.startButton = document.querySelector('#positions-game .start-button');
    this.els.positionsGame.checkPositionButton = document.querySelector('#positions-game .check-position-button');
    this.els.positionsGame.switchPositionButtons = document.querySelector('#positions-game .positions-game-finished-buttons-container');
    this.els.positionsGame.showPromptPositionButton = document.querySelector('#positions-game .show-prompt-position-button');
    this.els.positionsGame.showUserInputPositionButton = document.querySelector('#positions-game .show-user-input-position-button');
    this.els.positionsGame.newPositionsGameButton = document.querySelector('#positions-game .new-positions-game-button');
    this.els.positionsGame.flipBoardButton = document.querySelector('#positions-game .flip-board-button');
    this.els.positionsGame.piecesContainer = document.querySelector('#positions-game .pieces-container');
    // colours game
    this.els.coloursGame = {};
    this.els.coloursGame.container = document.querySelector('#colours-game');
    this.els.coloursGame.startStopButton = document.querySelector('#colours-game .start-stop-button');
    this.els.coloursGame.startStopText = document.querySelector('#colours-game .start-stop-text');
    this.els.coloursGame.prompt = document.querySelector('#colours-game .colours-game-prompt');
    this.els.coloursGame.lightAnswer = document.querySelector('#colours-game .colours-game-light');
    this.els.coloursGame.darkAnswer = document.querySelector('#colours-game .colours-game-dark');
    this.els.coloursGame.countDown = document.querySelector('#colours-game .countdown-sec');
    this.els.coloursGame.lighCheckmark = document.querySelector('.colours-game-light-checkmark');
    this.els.coloursGame.lighCross = document.querySelector('.colours-game-light-cross');
    this.els.coloursGame.darkCheckmark = document.querySelector('.colours-game-dark-checkmark');
    this.els.coloursGame.darkCross = document.querySelector('.colours-game-dark-cross');

    // =========
    // listeners
    // =========
    // if (navigator.maxTouchPoints > 0) this.els.nav.addEventListener('touchstart', this.handleNavClick, { passive: true });
    this.els.nav.addEventListener('click', this.handleNavClick);

    // if (navigator.maxTouchPoints > 0) this.els.scoreCloseButton.addEventListener('touchstart', this.hideScore, { passive: true });
    this.els.scoreCloseButton.addEventListener('click', this.hideScore);

    // if (navigator.maxTouchPoints > 0) this.els.ranksFilesSquaresGame.flipBoardButton.addEventListener('touchstart', this.flipRanksFilesSquaresGameBoard, { passive: true });
    this.els.ranksFilesSquaresGame.flipBoardButton.addEventListener('click', this.flipRanksFilesSquaresGameBoard);

    // if (navigator.maxTouchPoints > 0) this.els.ranksFilesSquaresGame.startStopButton.addEventListener('touchstart', this.ranksFilesSquaresStartStopButtonPressed, { passive: true });
    this.els.ranksFilesSquaresGame.startStopButton.addEventListener('click', this.ranksFilesSquaresStartStopButtonPressed);

    // if (navigator.maxTouchPoints > 0) this.els.coloursGame.startStopButton.addEventListener('touchstart', this.coloursGameStartStopButtonPressed, { passive: true });
    this.els.coloursGame.startStopButton.addEventListener('click', this.coloursGameStartStopButtonPressed);

    // if (navigator.maxTouchPoints > 0) this.els.positionsGame.startButton.addEventListener('touchstart', this.positionsGameStartButtonPressed, { passive: true });
    this.els.positionsGame.startButton.addEventListener('click', this.positionsGameStartButtonPressed);

    // if (navigator.maxTouchPoints > 0) this.els.positionsGame.checkPositionButton.addEventListener('touchstart', this.checkPositionButtonPressed, { passive: true });
    this.els.positionsGame.checkPositionButton.addEventListener('click', this.checkPositionButtonPressed);

    // if (navigator.maxTouchPoints > 0) this.els.positionsGame.showPromptPositionButton.addEventListener('touchstart', this.fillBoardWithPromptPosition, { passive: true });
    this.els.positionsGame.showPromptPositionButton.addEventListener('click', this.fillBoardWithPromptPosition);

    // if (navigator.maxTouchPoints > 0) this.els.positionsGame.showUserInputPositionButton.addEventListener('touchstart', this.fillBoardWithUserInputPosition, { passive: true });
    this.els.positionsGame.showUserInputPositionButton.addEventListener('click', this.fillBoardWithUserInputPosition);

    // if (navigator.maxTouchPoints > 0) this.els.positionsGame.flipBoardButton.addEventListener('touchstart', this.flipPositionsGameBoard, { passive: true });
    this.els.positionsGame.flipBoardButton.addEventListener('click', this.flipPositionsGameBoard);

    // if (navigator.maxTouchPoints > 0) this.els.positionsGame.newPositionsGameButton.addEventListener('touchstart', game.resetPositionsGame, { passive: true });
    this.els.positionsGame.newPositionsGameButton.addEventListener('click', game.resetPositionsGame);
  }

  // =========
  // universal
  // =========
  setGameType = (gameType) => {
    this.updateNav(gameType);
    this.hideScore();
    this.hideRanksFilesSquaresGamePrompt();

    switch (gameType) {
      case 'ranks':
      case 'files':
      case 'squares':
        this.updateUiToRanksFilesSquaresGame();
        break;
      case 'colours':
        this.updateUiToColoursGame();
        break;
      case 'positions':
        this.updateUiToPositionsGame();
        break;
      default:
        // oops
        break;
    }
  };

  updateNav = (gameType) => {
    this.els.navButtons.forEach((b) => {
      if (b.dataset.gameType === gameType) b.classList.add('active');
      else b.classList.remove('active');
    });
  };

  hideScore = () => {
    this.els.score.classList.add('hidden');
  };

  showScore = (correctCount, wrongCount, gameType) => {
    this.els.scoreCorrectCount.textContent = correctCount;
    this.els.scoreWrongCount.textContent = wrongCount;
    this.els.scoreGameType.textContent = gameType;
    this.els.score.classList.remove('hidden');
  };

  handleNavClick = (e) => {
    e.preventDefault();
    this.game.setGameType(true, e.target.dataset.gameType);
  };

  updatePrompt = (square, gameType) => {
    if (gameType == 'colours') this.els.coloursGame.prompt.textContent = square;
    else if (gameType == 'files') this.els.ranksFilesSquaresGame.prompt.textContent = square[0];
    else if (gameType == 'ranks') this.els.ranksFilesSquaresGame.prompt.textContent = square[1];
    else if (gameType == 'squares') this.els.ranksFilesSquaresGame.prompt.textContent = square;
  };

  setCountdown = (secs) => {
    if (secs < 0) {
      this.els.ranksFilesSquaresGame.countDown.textContent = '';
      this.els.coloursGame.countDown.textContent = '';
    } else {
      this.els.ranksFilesSquaresGame.countDown.textContent = ' - ' + secs;
      this.els.coloursGame.countDown.textContent = ' - ' + secs;
    }
  };

  stopGame = () => {
    this.setCountdown(-1);
    this.els.ranksFilesSquaresGame.prompt.classList.add('hidden');
    this.els.ranksFilesSquaresGame.startStopText.textContent = 'start';
    this.els.coloursGame.startStopText.textContent = 'start';
    this.els.ranksFilesSquaresGame.flipBoardButton.classList.remove('hidden');
    this.els.ranksFilesSquaresGame.board.removeEventListener('click', this.game.handleRanksFilesSquaresAnswer);

    this.els.coloursGame.lightAnswer.removeEventListener('click', this.game.handleColoursAnswer);
    this.els.coloursGame.darkAnswer.removeEventListener('click', this.game.handleColoursAnswer);
    this.els.coloursGame.prompt.textContent = '...';

    this.showScore();
  };

  showScore = () => {
    this.els.scoreCorrectCount.textContent = this.game.state.score.correctCount;
    this.els.scoreWrongCount.textContent = this.game.state.score.wrongCount;
    this.els.scoreGameType.textContent = this.game.state.gameType;
    this.els.score.classList.remove('hidden');
  };

  // ========================
  // ranks-files-squares game
  // ========================
  updateUiToRanksFilesSquaresGame = () => {
    this.els.coloursGame.container.classList.add('hidden');
    this.els.positionsGame.container.classList.add('hidden');
    this.els.ranksFilesSquaresGame.container.classList.remove('hidden');
  };

  hideRanksFilesSquaresGamePrompt = () => {
    this.els.ranksFilesSquaresGame.prompt.classList.add('hidden');
  };

  ranksFilesSquaresStartStopButtonPressed = () => {
    if (this.game.state.active) this.game.stopGame();
    else this.game.startRanksFilesSquaresColoursGame();
  };

  startRanksFilesSquaresGame = () => {
    this.els.score.classList.add('hidden');
    this.els.ranksFilesSquaresGame.startStopText.textContent = 'stop';
    this.els.ranksFilesSquaresGame.prompt.classList.remove('hidden');
    this.els.ranksFilesSquaresGame.flipBoardButton.classList.add('hidden');
    this.els.ranksFilesSquaresGame.board.addEventListener('click', this.game.handleRanksFilesSquaresAnswer);
  };

  ranksFilesSquaresPromptShowAnswerIsWrong = () => {
    this.els.ranksFilesSquaresGame.prompt.classList.add('wrong');
    setTimeout(() => this.els.ranksFilesSquaresGame.prompt.classList.remove('wrong'), 350);
  };

  ranksFilesSquaresPromptResetStyles = () => {
    this.els.ranksFilesSquaresGame.prompt.classList.remove('wrong');
  };

  flashFile = (file, answerIsCorrect) => {
    const hlClass = answerIsCorrect ? 'highlight' : 'highlight-wrong';
    const els = document.querySelectorAll('.square[data-file="' + file + '"]');
    els.forEach((e) => e.classList.add(hlClass));
    setTimeout(() => els.forEach((e) => e.classList.remove(hlClass)), 200);
  };

  flashRank = (rank, answerIsCorrect) => {
    const hlClass = answerIsCorrect ? 'highlight' : 'highlight-wrong';
    const els = document.querySelectorAll('.square[data-rank="' + rank + '"]');
    els.forEach((e) => e.classList.add(hlClass));
    setTimeout(() => els.forEach((e) => e.classList.remove(hlClass)), 200);
  };

  flashSquare = (square, answerIsCorrect) => {
    const hlClass = answerIsCorrect ? 'highlight' : 'highlight-wrong';
    const el = document.querySelector('.square[data-square="' + square + '"]');
    el.classList.add(hlClass);
    setTimeout(() => el.classList.remove(hlClass), 200);
  };

  flipRanksFilesSquaresGameBoard = () => {
    this.els.ranksFilesSquaresGame.board.classList.toggle('flipped');
  };

  // ==============
  // positions game
  // ==============
  updateUiToPositionsGame = () => {
    this.els.coloursGame.container.classList.add('hidden');
    this.els.ranksFilesSquaresGame.container.classList.add('hidden');
    this.els.positionsGame.container.classList.remove('hidden');
    this.fillPositionsBoardFromFEN(this.game.state.prompt.fen);
  };

  clearPositionsBoard = () => {
    const squareEls = document.querySelectorAll('#positions-game .board .square');
    squareEls.forEach((el) => {
      el.innerHTML = '';
    });
  };

  fillPositionsBoardFromFEN = (fen) => {
    this.clearPositionsBoard();
    const [placement] = fen.split(' '); // Extracts only the piece placement part of the FEN string
    const rows = placement.split('/');
    const board = document.querySelector('#positions-game .board');

    rows.forEach((row, rowIndex) => {
      let columnIndex = 0;
      for (let char of row) {
        if (isNaN(char)) {
          // If the character is not a number, it's a piece
          const square = String.fromCharCode(97 + columnIndex) + (8 - rowIndex); // Converts column index to letter and calculates row number
          const squareEl = board.querySelector(`.square[data-square="${square}"]`);
          if (squareEl) {
            squareEl.innerHTML = fenToSVGMap[char] || ''; // Sets the piece SVG
          }
          columnIndex++;
        } else {
          columnIndex += parseInt(char); // Skips empty squares
        }
      }
    });
  };

  positionsGameStartButtonPressed = () => {
    if (this.game.state.active) this.game.stopGame();
    else this.game.startPositionsGame();
  };

  startPositionsGame = () => {
    this.els.positionsGame.flipBoardButton.classList.add('hidden');
    this.els.positionsGame.startButton.classList.add('hidden');
    this.els.positionsGame.checkPositionButton.classList.remove('hidden');
    this.els.positionsGame.piecesContainer.classList.remove('hidden');
    this.clearPositionsBoard();
  };

  checkPositionButtonPressed = () => {
    this.game.checkPosition();
  };

  finishPositionsGame = (promptSquareToPieceMap, userInputSquareToPieceMap) => {
    this.els.positionsGame.piecesContainer.classList.add('hidden');
    this.els.positionsGame.checkPositionButton.classList.add('hidden');
    this.els.positionsGame.newPositionsGameButton.classList.remove('hidden');
    this.els.positionsGame.switchPositionButtons.classList.remove('hidden');

    const squares = document.querySelectorAll('#positions-game .board .square');
    squares.forEach((square) => {
      if (!(promptSquareToPieceMap[square.dataset.square] === userInputSquareToPieceMap[square.dataset.square])) {
        square.classList.add('position-highlight-wrong');
      }
    });

    this.els.positionsGame.showPromptPositionButton.classList.remove('active');
    this.els.positionsGame.showUserInputPositionButton.classList.add('active');
  };

  resetPositionsGame = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.classList.remove('position-highlight-wrong');
    });
    this.els.positionsGame.newPositionsGameButton.classList.add('hidden');
    this.els.positionsGame.newPositionsGameButton.classList.add('hidden');
    this.els.positionsGame.switchPositionButtons.classList.add('hidden');
    this.els.positionsGame.startButton.classList.remove('hidden');
    this.els.positionsGame.flipBoardButton.classList.remove('hidden');
    this.fillPositionsBoardFromFEN(this.game.state.prompt.fen);
  };

  flipPositionsGameBoard = () => {
    this.els.positionsGame.board.classList.toggle('flipped');
  };

  fillBoardWithPromptPosition = () => {
    this.fillPositionsBoardFromFEN(this.game.state.prompt.fen);
    this.els.positionsGame.showPromptPositionButton.classList.add('active');
    this.els.positionsGame.showUserInputPositionButton.classList.remove('active');
  };

  fillBoardWithUserInputPosition = () => {
    this.fillPositionsBoardFromFEN(this.game.state.userInput.fen);
    this.els.positionsGame.showPromptPositionButton.classList.remove('active');
    this.els.positionsGame.showUserInputPositionButton.classList.add('active');
  };

  // ============
  // colours game
  // ============
  updateUiToColoursGame = () => {
    this.els.positionsGame.container.classList.add('hidden');
    this.els.ranksFilesSquaresGame.container.classList.add('hidden');
    this.els.coloursGame.container.classList.remove('hidden');
  };

  coloursGameStartStopButtonPressed = () => {
    if (this.game.state.active) this.game.stopGame();
    else this.game.startRanksFilesSquaresColoursGame();
  };

  startColoursGame = () => {
    this.els.score.classList.add('hidden');
    this.els.coloursGame.startStopText.textContent = 'stop';
    this.els.coloursGame.lightAnswer.addEventListener('click', this.game.handleColoursAnswer);
    this.els.coloursGame.darkAnswer.addEventListener('click', this.game.handleColoursAnswer);
  };

  coloursGameShowWrongAnswerGiven = (answerGiven) => {
    if (answerGiven == 'light') {
      this.els.coloursGame.lighCross.classList.remove('hidden');
      setTimeout(() => this.els.coloursGame.lighCross.classList.add('hidden'), 300);
    } else {
      this.els.coloursGame.darkCross.classList.remove('hidden');
      setTimeout(() => this.els.coloursGame.darkCross.classList.add('hidden'), 300);
    }
  };

  coloursGameShowCorrectAnswerGiven = (answerGiven) => {
    if (answerGiven == 'light') {
      this.els.coloursGame.lighCheckmark.classList.remove('hidden');
      setTimeout(() => this.els.coloursGame.lighCheckmark.classList.add('hidden'), 300);
    } else {
      this.els.coloursGame.darkCheckmark.classList.remove('hidden');
      setTimeout(() => this.els.coloursGame.darkCheckmark.classList.add('hidden'), 300);
    }
  };
}
