import { MovesUiHandler } from '../UiHandlers/MovesUiHandler.js';
import { DragDrop } from '../common/DragDrop.js';
import games from '../../Nakamura.js';
import { Chess } from '../common/chess.js';

export class MovesGame {
  constructor() {
    // game state
    this.state = {
      active: false,
      countdownSeconds: 30,
      userInput: '',
      prompt: {
        moves: [],
        currentIndex: 0,
      },
      score: {
        wrongCount: 0,
        correctCount: 0,
      },
      firstGameFinished: false,
      currentBoard: null,
    };

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
    const randomCutoff = Math.floor(Math.random() * game.length);

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
    this.dragDrop.initListenersForSquares(this.validateAnswer, this.answerGiven);
    this.uiHandler.updatePrompt(this.state.prompt.moves[this.state.prompt.currentIndex]);
    this.uiHandler.startGame();
    this.startCountDown();
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

  answerGiven = (from, to) => {
    this.state.currentBoard.move({ from: from, to: to });
    if (this.state.prompt.currentIndex >= this.state.prompt.moves.length) {
      this.initPrompt();
    } else {
      this.state.prompt.currentIndex++;
    }
    this.uiHandler.updatePrompt(this.state.prompt.moves[this.state.prompt.currentIndex]);
    this.uiHandler.highlightLastMove(from, to);
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
