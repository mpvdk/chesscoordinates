import { MemoryUiHandler } from '../UiHandlers/MemoryUiHandler.js';
import { DragDrop } from '../common/DragDrop.js';
import { fenArray, squareToFenMapFromFen, squareToFenMapFromUi, mapToFen, countPiecesInFen } from '../common/Utils.js';

export class MemoryGame {
  constructor() {
    // game state
    this.state = {
      active: false,
      difficulty: {
        easy: true,
        medium: true,
        hard: true,
      },
      countdownSeconds: 30,
      userInput: '', // fen
      prompt: '', // fen
      allowedFens: [],
    };

    this.uiHandler = new MemoryUiHandler(this);
    this.dragDrop = new DragDrop();
    this.intervalId = null;
    this.updateAllowedFens();
  }

  startGame = () => {
    this.state.active = true;
    this.dragDrop.initListenersForPieces();
    this.dragDrop.initListenersForSquares();
    this.uiHandler.startGame();
  };

  checkPosition = () => {
    const promptSquareToPieceMap = squareToFenMapFromFen(this.state.prompt);
    const userInputSquareToPieceMap = squareToFenMapFromUi();
    this.state.userInput = mapToFen(userInputSquareToPieceMap);
    this.uiHandler.finishGame(promptSquareToPieceMap, userInputSquareToPieceMap);
  };

  resetGame = () => {
    this.state.active = false;
    clearInterval(this.intervalId);
    this.dragDrop.removeAllListeners();
    this.state.prompt = this.state.allowedFens[Math.floor(Math.random() * this.state.allowedFens.length)];
    this.uiHandler.resetGame();
  };

  restartGameWithSameFen = () => {
    this.state.active = false;
    clearInterval(this.intervalId);
    this.dragDrop.removeAllListeners();
    this.uiHandler.resetGame();
    this.startGame();
  };

  difficultyChanged = () => {
    const checkBoxEls = document.querySelectorAll('.difficulty-selection-container input');
    checkBoxEls.forEach((el) => {
      if (el.id === 'difficulty-easy') {
        this.state.difficulty.easy = el.checked;
      } else if (el.id === 'difficulty-medium') {
        this.state.difficulty.medium = el.checked;
      } else if (el.id === 'difficulty-hard') {
        this.state.difficulty.hard = el.checked;
      }
    });
    this.updateAllowedFens();
  };

  updateAllowedFens = () => {
    this.state.allowedFens = fenArray.filter((fen) => {
      const piecesCnt = countPiecesInFen(fen);
      if (piecesCnt < 11) return this.state.difficulty.easy;
      else if (piecesCnt > 10 && piecesCnt < 21) return this.state.difficulty.medium;
      else return this.state.difficulty.hard;
    });
    this.state.prompt = this.state.allowedFens[Math.floor(Math.random() * this.state.allowedFens.length)];
    if (this.state.prompt) this.uiHandler.fillBoardFromFen(this.state.prompt);
  };
}
