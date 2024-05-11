import { MovesUiHandler } from '../UiHandlers/MovesUiHandler.js';
import { DragDrop } from '../common/DragDrop.js';
import games from '../../Nakamura.js';
import { Chess } from '../common/chess.js';
import { Game } from './Game.js';

export class MovesGame extends Game {
  constructor() {
    super();

    // game state
    this.state.prompt = {
      moves: [],
      currentIndex: 0,
    };
    this.state.firstGameFinished = false;
    this.state.currentBoard = null;

    this.uiHandler = new MovesUiHandler(this);
    this.dragDrop = new DragDrop();
    this.intervalId = null;

    setTimeout(() => {
      this.initPrompt(); // move to task queue for performance improvement
    }, 0);
  }

  initPrompt = () => {
    const chess = new Chess();
    const game = games[Math.floor(Math.random() * games.length)];
    // -2 to make sure we don't start at end of game and have no moves to make
    // the commitAnswer function will handle the case where we are at the end
    // of the game, but practice hasn't finsihed yet (a new game will be started)
    const randomCutoff = Math.floor(Math.random() * game.length - 2);

    const movesToMakeOnBoard = game
      .slice(0, randomCutoff)
      .map((i) => i.split(' '))
      .flat();
    movesToMakeOnBoard.forEach((moveStr) => {
      chess.move(moveStr, { sloppy: true });
    });

    this.state.prompt.moves = game
      .slice(randomCutoff, -1)
      .map((i) => i.split(' '))
      .flat();
    this.state.prompt.currentIndex = 0;

    this.state.currentBoard = chess;
    this.uiHandler.fillBoardFromFen(this.state.currentBoard.fen());
    this.uiHandler.initListenersForTapToMoveFunctionality();

    const history = chess.history({ verbose: true });
    const lastMove = history[history.length - 1];
    if (lastMove) this.uiHandler.highlightLastMove(lastMove.from, lastMove.to);
  };

  startGame = () => {
    this.state.active = true;
    if (this.state.firstGameFinished) this.initPrompt();
    this.state.score.correctCount = 0;
    this.state.score.wrongCount = 0;
    this.dragDrop.initListenersForPieces();
    this.dragDrop.initListenersForSquares(this.validateAnswer, this.commitAnswer, this.isCastleMove);
    this.uiHandler.updatePrompt(this.state.prompt.moves[this.state.prompt.currentIndex]);
    if (this.state.useTimer) {
      this.startCountDown();
    }
    this.uiHandler.startGame();
  };

  resetGame = () => {
    if (!this.state.firstGameFinished) this.state.firstGameFinished = true;
    this.state.active = false;
    clearInterval(this.intervalId);
    this.dragDrop.removeAllListeners();
    this.uiHandler.resetGame();
  };

  validateAnswer = (from, to) => {
    const game = new Chess();
    game.loadPgn(this.state.currentBoard.pgn());
    try {
      game.move({ from: from, to: to });
      const moveInLAN = from + to;
      const promptInLAN = this.promptToLAN();
      if (moveInLAN === promptInLAN) {
        this.state.score.correctCount++;
        return true;
      } else {
        this.state.score.wrongCount++;
        this.uiHandler.answerIsWrong();
        return false;
      }
    } catch (e) {
      this.state.score.wrongCount++;
      this.uiHandler.answerIsWrong();
      return false;
    }
  };

  commitAnswer = (from, to) => {
    this.state.currentBoard.move({ from: from, to: to });
    if (this.state.prompt.currentIndex >= this.state.prompt.moves.length) {
      this.initPrompt();
    } else {
      this.state.prompt.currentIndex++;
    }
    this.uiHandler.updatePrompt(this.state.prompt.moves[this.state.prompt.currentIndex]);
    this.uiHandler.highlightLastMove(from, to);
  };

  isCastleMove = () => {
    const promptMove = this.state.prompt.moves[this.state.prompt.currentIndex];
    return promptMove === 'O-O' || promptMove === 'O-O-O';
  };

  promptToLAN = () => {
    const game = new Chess();
    game.loadPgn(this.state.currentBoard.pgn());
    game.move(this.state.prompt.moves[this.state.prompt.currentIndex]);
    const history = game.history({ verbose: true });
    const lastMove = history[history.length - 1];
    return lastMove.lan;
  };

  startCountDown = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.state.countdownSeconds = 30;
    }
    this.uiHandler.setCountdown(this.state.countdownSeconds);
    this.intervalId = setInterval(() => {
      if (this.state.countdownSeconds <= 1) {
        this.resetGame();
      } else {
        this.state.countdownSeconds = this.state.countdownSeconds - 1;
        this.uiHandler.setCountdown(this.state.countdownSeconds);
      }
    }, 1000);
  };
}
