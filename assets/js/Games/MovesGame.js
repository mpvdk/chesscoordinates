import { MovesUiHandler } from '../UiHandlers/MovesUiHandler.js';
import { DragDrop } from '../common/DragDrop.js';
import { fenArray, squareToFenMapFromFen, squareToFenMapFromUi, mapToFen } from '../common/Utils.js';

export class MovesGame {
  constructor() {
    // game state
    this.state = {
      active: false,
      countdownSeconds: 30,
      userInput: '',
      prompt: '',
    };

    this.uiHandler = new MovesUiHandler(this);
    this.dragDrop = new DragDrop();
    this.intervalId = null;
    this.uiHandler.fillBoardFromFen(fenArray[Math.floor(Math.random() * this.state.allowedFens.length)]);
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
    this.state.prompt = fenArray[Math.floor(Math.random() * this.state.allowedFens.length)];
    this.uiHandler.resetGame();
  };
}
