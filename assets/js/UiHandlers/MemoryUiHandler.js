import { fenToSVGMap } from '../common/Utils.js';
import UiHandler from './UiHandler.js';

export class MemoryUiHandler extends UiHandler {
  constructor(game) {
    super();
    this.game = game;
    this.areWeInTheProcessOfMovingAPiece = false;
    this.areWeAddingOrMoving = '';

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
    this.els.customOrAutoFenCheckbox = document.querySelector('#custom-or-auto-fen-checkbox');
    this.els.customFenInput = document.querySelector('.custom-fen-input');
    this.els.generatedFensText = document.querySelector('.generated-fens-text');
    this.els.customFenText = document.querySelector('.custom-fen-text');

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
    this.els.customOrAutoFenCheckbox.addEventListener('change', this.customOrAUtoFenCheckboxChanged);
    this.els.customFenInput.addEventListener('input', this.customFenInputChanged);
  }

  customOrAUtoFenCheckboxChanged = (e) => {
    this.els.customFenInput.classList.toggle('hidden');
    this.els.difficultySelectionContainer.classList.toggle('hidden');
    this.els.customFenWarning.classList.add('hidden');

    if (e.target.checked) {
      // checked = custom fen
      this.els.customFenText.classList.add('selected');
      this.els.generatedFensText.classList.remove('selected');
    } else {
      // unchecked = auto generated fens
      this.els.customFenText.classList.remove('selected');
      this.els.generatedFensText.classList.add('selected');
    }
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
    this.initListenersForPiecesContainer();
    this.clearBoard();
  };

  initListenersForPiecesContainer = () => {
    // remove all existing listeners to avoid clones
    this.removeListenersForPiecesContainer();
    // and re-init the listeners so that the new pieces can be moved
    document.querySelectorAll('.pieces-container .draggable-piece').forEach((piece) => {
      piece.addEventListener('click', this.prepareToUpdateBoard);
    });
  };

  removeListenersForPiecesContainer = () => {
    document.querySelectorAll('.draggable-piece').forEach((piece) => {
      piece.removeEventListener('click', this.prepareToUpdateBoard);
    });
  };

  initListenersForPiecesOnBoard = () => {
    // remove all existing listeners to avoid clones
    this.removeListenersForPiecesOnBoard();
    // and re-init the listeners so that the new pieces can be moved
    document.querySelectorAll('.piece-on-board').forEach((piece) => {
      piece.addEventListener('click', this.prepareToUpdateBoard);
    });
  };

  removeListenersForPiecesOnBoard = () => {
    document.querySelectorAll('.piece-on-board').forEach((piece) => {
      piece.removeEventListener('click', this.prepareToUpdateBoard);
    });
  };

  prepareToUpdateBoard = (e) => {
    let target = e.target;
    while (!target.classList.contains('draggable-piece')) {
      target = target.parentNode;
    }

    let addingOrMoving;
    if (target.dataset.isPartOfPiecesContainer === 'true' || this.areWeAddingOrMoving == 'adding') addingOrMoving = 'adding';
    else addingOrMoving = 'moving';

    if (this.areWeInTheProcessOfMovingAPiece) {
      // this.areWeInTheProcessOfMovingAPiece is a hacky workaround
      // I'm so tired of this shit with event propagation dont blame me
      this.areWeInTheProcessOfMovingAPiece = false;
      this.areWeAddingOrMoving = '';
      if (target.dataset.isPartOfPiecesContainer === 'true') {
        this.cancelMove();
        return;
      }
      if (addingOrMoving == 'adding') this.insertPiece(e);
      else this.movePiece(e);
      return;
    } else {
      this.areWeInTheProcessOfMovingAPiece = true;
      this.areWeAddingOrMoving = addingOrMoving;
      e.stopPropagation();

      // Find the piece element (sometimes the event target is the SVG element inside the div)

      if (addingOrMoving === 'adding') {
        this.cancelMove();
        this.areWeInTheProcessOfMovingAPiece = true;
        this.areWeAddingOrMoving = addingOrMoving;
      }

      // Add indicator to the piece that is moving
      target.classList.add('selected-to-move');

      // Add removePiece event listener if we're moving a piece already on the board
      if (addingOrMoving === 'moving') {
        target.addEventListener('click', this.removePiece);
        target.removeEventListener('click', this.prepareToUpdateBoard);
      }

      // Add markers and event listeners to all squares except the one we're moving from
      document.querySelectorAll('.board .square').forEach((square) => {
        if (addingOrMoving === 'moving' && e.target === square.querySelector('.draggable-piece')) return;
        square.classList.add('legal-target');
        square.addEventListener('click', addingOrMoving == 'adding' ? this.insertPiece : this.movePiece);
      });
      document.querySelector('.pieces-container').addEventListener('click', this.cancelMove);
      document.addEventListener('click', this.cancelMove);
    }
  };

  cleanup = () => {
    this.areWeInTheProcessOfMovingAPiece = false;
    this.areWeAddingOrMoving = '';
    const pieceEl = document.querySelector('.selected-to-move');
    if (pieceEl) {
      pieceEl.classList.remove('selected-to-move');
    }

    document.querySelectorAll('.square').forEach((square) => {
      square.classList.remove('legal-target');
      square.classList.remove('selected-to-move');
    });

    document.querySelectorAll('.draggable-piece').forEach((piece) => {
      piece.removeEventListener('click', this.removePiece);
    });
    document.querySelectorAll('.board .square').forEach((square) => {
      square.removeEventListener('click', this.movePiece);
      square.removeEventListener('click', this.insertPiece);
    });
    document.querySelector('.pieces-container').removeEventListener('click', this.cancelMove);
    document.removeEventListener('click', this.cancelMove);

    this.game.piecesOnBoardChanged();
  };

  insertPiece = (e) => {
    e.stopPropagation();

    const pieceEl = document.querySelector('.selected-to-move');

    let targetSquare = e.target;
    while (!targetSquare.classList.contains('square')) {
      targetSquare = targetSquare.parentNode;
    }

    const pieceFenNotation = pieceEl.dataset.fenPiece;
    let div = document.createElement('div');
    div.innerHTML = fenToSVGMap[pieceFenNotation];
    div = div.querySelector('div');
    div.classList.add('draggable-piece', 'piece-on-board');
    div.draggable = true;
    targetSquare.innerHTML = '';
    targetSquare.appendChild(div);
    this.cleanup();
  };

  movePiece = (e) => {
    e.stopPropagation();
    const pieceEl = document.querySelector('.selected-to-move');

    let targetSquare = e.target;
    while (!targetSquare.classList.contains('square')) {
      targetSquare = targetSquare.parentNode;
    }

    if (targetSquare.classList.contains('legal-target')) {
      targetSquare.innerHTML = '';
      pieceEl.remove();
      targetSquare.appendChild(pieceEl);
    }
    this.cleanup();
  };

  removePiece = (e) => {
    e.stopPropagation();
    const delme = document.querySelector('.board .square div.selected-to-move');
    if (delme) delme.remove();
    this.cleanup();
  };

  cancelMove = () => {
    this.cleanup();
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
