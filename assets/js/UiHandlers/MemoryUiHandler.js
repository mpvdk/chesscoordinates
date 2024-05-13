import { fenToSVGMap } from '../common/Utils.js';
import UiHandler from './UiHandler.js';

export class MemoryUiHandler extends UiHandler {
  constructor(game) {
    super();
    this.game = game;

    // ========
    // elements
    // ========
    // universal
    this.els.container = document.querySelector('#memory-game');
    this.els.board = document.querySelector('.board');
    this.els.startButton = document.querySelector('.start-button');
    this.els.checkPositionButton = document.querySelector('.check-position-button');
    this.els.switchPositionButtons = document.querySelector('.memory-game-finished-buttons-container');
    this.els.perfectGameMessage = document.querySelector('.memory-game-finished-perfect-container');
    this.els.showPromptPositionButton = document.querySelector('.show-prompt-position-button');
    this.els.showUserInputPositionButton = document.querySelector('.show-user-input-position-button');
    this.els.newGameButton = document.querySelector('.new-memory-game-button');
    this.els.retryButton = document.querySelector('.retry-game-button');
    this.els.flipBoardButton = document.querySelector('#flip-board-button');
    this.els.piecesContainer = document.querySelector('.pieces-container');
    this.els.difficultySelectionContainer = document.querySelector('.difficulty-selection-container');
    this.els.difficultySelectionInputs = document.querySelectorAll('.difficulty-selection-container input');
    this.els.difficultyWarning = document.querySelector('.difficulty-warning');
    this.els.customFenContainer = document.querySelector('.custom-fen-container');
    this.els.customFenWarning = document.querySelector('.invalid-custom-fen-warning');
    this.els.customFenButton = document.querySelector('.custom-fen-button');
    this.els.customFenInput = document.querySelector('.custom-fen-input');

    // =========
    // listeners
    // =========
    this.els.startButton.addEventListener('click', this.startButtonPressed);
    this.els.checkPositionButton.addEventListener('click', this.checkPositionButtonPressed);
    this.els.showPromptPositionButton.addEventListener('click', this.fillBoardWithPromptPosition);
    this.els.showUserInputPositionButton.addEventListener('click', this.fillBoardWithUserInputPosition);
    this.els.flipBoardButton.addEventListener('click', this.flipBoard);
    this.els.newGameButton.addEventListener('click', game.resetGame);
    this.els.retryButton.addEventListener('click', game.restartGameWithSameFen);
    this.els.difficultySelectionInputs.forEach((el) => el.addEventListener('click', this.difficultyChanged));
    this.els.customFenButton.addEventListener('click', this.customFenButtonPressed);
    this.els.customFenInput.addEventListener('input', this.customFenInputChanged);
  }

  customFenButtonPressed = () => {
    this.els.customFenInput.classList.toggle('hidden');
    this.els.difficultySelectionContainer.classList.toggle('hidden');
    this.els.customFenWarning.classList.add('hidden');
    this.els.customFenButton.innerHTML = this.els.customFenInput.classList.contains('hidden') ? 'Use a custom FEN' : 'Use auto-generated FENs';
  };

  customFenInputChanged = () => {
    const fen = this.els.customFenInput.value;
    this.game.setCustomFen(fen);
  };

  showInvalidFenWarning = () => {
    if (this.els.customFenWarning.classList.contains('hidden')) {
      this.els.customFenWarning.classList.remove('hidden');
    }
  };

  hideInvalidFenWarning = () => {
    if (!this.els.customFenWarning.classList.contains('hidden')) {
      this.els.customFenWarning.classList.add('hidden');
    }
  };

  difficultyChanged = (e) => {
    const checkedCount = document.querySelectorAll('.difficulty-selection-container input:checked').length;
    if (checkedCount === 0) {
      e.target.checked = true;
      this.els.difficultyWarning.classList.remove('toast-hidden');
      setTimeout(() => this.els.difficultyWarning.classList.add('toast-hidden'), 2000);
    } else {
      this.game.difficultyChanged();
    }
  };

  clearBoard = () => {
    const squareEls = document.querySelectorAll('.board .square');
    squareEls.forEach((el) => {
      el.innerHTML = '';
    });
  };

  fillBoardFromFen = (fen) => {
    this.clearBoard();
    const [placement] = fen.split(' '); // Extracts only the piece placement part of the FEN string
    const rows = placement.split('/');
    const board = document.querySelector('.board');

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

  startButtonPressed = () => {
    if (this.game.state.active) this.game.resetGame();
    else this.game.startGame();
  };

  startGame = () => {
    this.els.flipBoardButton.classList.add('hidden');
    this.els.startButton.classList.add('hidden');
    this.els.checkPositionButton.classList.remove('hidden');
    this.els.piecesContainer.classList.remove('hidden');
    this.els.container.classList.add('active');
    this.clearBoard();
  };

  checkPositionButtonPressed = () => {
    this.game.checkPosition();
  };

  finishGame = (promptSquareToPieceMap, userInputSquareToPieceMap) => {
    let answerIsPerfect = true;

    const squares = document.querySelectorAll('.board .square');
    squares.forEach((square) => {
      if (!(promptSquareToPieceMap[square.dataset.square] === userInputSquareToPieceMap[square.dataset.square])) {
        if (answerIsPerfect) answerIsPerfect = false;
        square.classList.add('position-highlight-wrong');
      }
    });

    this.els.piecesContainer.classList.add('hidden');
    this.els.checkPositionButton.classList.add('hidden');
    this.els.newGameButton.classList.remove('hidden');
    if (answerIsPerfect) {
      this.els.perfectGameMessage.classList.remove('hidden');
    } else {
      this.els.switchPositionButtons.classList.remove('hidden');
      this.els.retryButton.classList.remove('hidden');
    }

    this.els.showPromptPositionButton.classList.remove('active');
    this.els.showUserInputPositionButton.classList.add('active');
  };

  resetGame = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.classList.remove('position-highlight-wrong');
    });
    this.els.newGameButton.classList.add('hidden');
    this.els.retryButton.classList.add('hidden');
    this.els.switchPositionButtons.classList.add('hidden');
    this.els.perfectGameMessage.classList.add('hidden');
    this.els.startButton.classList.remove('hidden');
    this.els.flipBoardButton.classList.remove('hidden');
    this.els.container.classList.remove('active');
    this.fillBoardFromFen(this.game.state.prompt);
  };

  flipBoard = () => {
    this.els.board.classList.toggle('flipped');
  };

  fillBoardWithPromptPosition = () => {
    this.fillBoardFromFen(this.game.state.prompt);
    this.els.showPromptPositionButton.classList.add('active');
    this.els.showUserInputPositionButton.classList.remove('active');
  };

  fillBoardWithUserInputPosition = () => {
    this.fillBoardFromFen(this.game.state.userInput);
    this.els.showPromptPositionButton.classList.remove('active');
    this.els.showUserInputPositionButton.classList.add('active');
  };
}
