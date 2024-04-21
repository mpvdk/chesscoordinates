import { fenToSVGMap } from '../common/Utils.js';
import UiHandler from './UiHandler.js';

export class MovesUiHandler extends UiHandler {
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
    this.els.container = document.querySelector('#moves-game');
    this.els.board = document.querySelector('.board');
    this.els.prompt = document.querySelector('.prompt');
    this.els.countDown = document.querySelector('.countdown-sec');
    this.els.startStopButton = document.querySelector('.start-stop-button');
    this.els.startStopText = document.querySelector('.start-stop-text');
    this.els.flipBoardButton = document.querySelector('#flip-board-button');
    this.els.squares = document.querySelectorAll('td.square');
    this.els.timerSwitchContainer = document.querySelector('.timer-switch-container');

    // =========
    // listeners
    // =========
    this.els.scoreCloseButton.addEventListener('click', this.hideScore);
    this.els.startStopButton.addEventListener('click', this.startStopButtonPressed);
    this.els.flipBoardButton.addEventListener('click', this.flipBoard);

    this.els.moveablePieces;
  }

  initListenersForTapToMoveFunctionality = () => {
    this.els.squares.forEach((p) => {
      p.addEventListener('click', this.handleSquareClick);
    });
  };

  handleSquareClick = (e) => {
    const squareEl = e.currentTarget;
    const squareString = squareEl.dataset.square;
    const clickedSquareIsATarget = squareEl.classList.contains('legal-target');

    this.els.squares.forEach((s) => {
      s.classList.remove('legal-target');
      s.classList.remove('selected-for-move-by-tap');
    });

    if (clickedSquareIsATarget) {
      // move piece to this square
      const from = this.savedPiece.parentElement.dataset.square;
      const to = squareString;
      const legalMove = this.game.validateAnswer(from, to);
      if (legalMove) {
        this.game.answerGiven(from, to);
        squareEl.innerHTML = '';
        squareEl.appendChild(this.savedPiece);
      }
    } else {
      // check if clicked square has a piece on it
      const pieceEl = squareEl.querySelector('.draggable-piece');
      if (pieceEl) {
        // there is a piece
        this.savedPiece = pieceEl; // save it so it can be moved on second click
        let legalMoves = this.game.state.currentBoard.moves({ square: squareString });
        if (legalMoves.length > 0) {
          // highlight legal moves it can make
          legalMoves = legalMoves.map((m) => {
            // goal here is to get only the target square in algebraic notation
            m = m.replace('+', ''); // remove check character
            m.replace('#', ''); // remove mate character
            return m.substring(m.length - 2); // get last 2 chars (which will be algebraic notation square)
          });
          legalMoves.forEach((m) => {
            const s = document.querySelector(`.square[data-square="${m}"]`);
            if (s) s.classList.add('legal-target');
          });
          // and highlight the source square itself
          squareEl.classList.add('selected-for-move-by-tap');
        }
      }
    }
  };

  updatePrompt = (move) => {
    this.els.prompt.textContent = move;
    this.els.prompt.classList.add('appear');
    setTimeout(() => this.els.prompt.classList.remove('appear'), 200);
  };

  setCountdown = (secs) => {
    if (secs < 0) this.els.countDown.textContent = '';
    else this.els.countDown.textContent = ' - ' + secs;
  };

  showScore = () => {
    this.els.scoreCorrectCount.textContent = this.game.state.score.correctCount;
    this.els.scoreWrongCount.textContent = this.game.state.score.wrongCount;
    this.els.score.classList.remove('hidden');
  };

  hideScore = () => {
    this.els.score.classList.add('hidden');
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
            squareEl.innerHTML = fenToSVGMap[char] || '';
            squareEl.querySelector('div').draggable = true;
            squareEl.querySelector('div').classList.add('draggable-piece');
          }
          columnIndex++;
        } else {
          columnIndex += parseInt(char); // Skips empty squares
        }
      }
    });
  };

  startStopButtonPressed = () => {
    if (this.game.state.active) this.game.resetGame();
    else this.game.startGame();
  };

  startGame = () => {
    this.hideScore();
    this.els.startStopText.textContent = 'stop';
    this.els.prompt.classList.remove('hidden');
    this.els.flipBoardButton.classList.add('hidden');
    this.els.timerSwitchContainer.classList.add('hidden');
  };

  resetGame = () => {
    this.setCountdown(-1);
    this.els.prompt.classList.add('hidden');
    this.els.startStopText.textContent = 'start';
    this.els.flipBoardButton.classList.remove('hidden');
    this.els.timerSwitchContainer.classList.remove('hidden');
    this.showScore();
  };

  flipBoard = () => {
    this.els.board.classList.toggle('flipped');
  };

  highlightLastMove = (from, to) => {
    this.els.board.querySelectorAll('.square').forEach((square) => {
      if (square.classList.contains('last-move-highlight')) {
        square.classList.remove('last-move-highlight');
      }
    });
    this.els.board.querySelector(`td[data-square="${to}"`).classList.add('last-move-highlight');
    this.els.board.querySelector(`td[data-square="${from}"`).classList.add('last-move-highlight');
  };

  answerIsWrong = () => {
    this.els.prompt.classList.add('wrong');
    setTimeout(() => this.els.prompt.classList.remove('wrong'), 350);
  };
}
