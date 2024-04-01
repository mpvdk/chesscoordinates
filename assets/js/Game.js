import { UiHandler } from './UiHandler.js';
import { DragDrop } from './DragDrop.js';
import { fenArray, pathnameToGameTypeMap, squaresColoursMap, files, ranks, squareToFenMapFromFen, squareToFenMapFromUi, mapToFen } from './Utils.js';

export class Game {
  constructor() {
    // game config
    this.config = {
      defaultCountdownSeconds: 30,
    };

    // game state
    this.state = {
      active: false,
      gameType: 'square',
      countdownSeconds: this.config.defaultCountdownSeconds,
      userInput: {
        file: '',
        rank: '',
        square: '',
        colour: '',
        fen: '',
      },
      prompt: {
        file: '',
        rank: '',
        square: '',
        fen: '',
      },
      score: {
        wrongCount: 0,
        correctCount: 0,
      },
    };

    this.uiHandler = new UiHandler(this);
    this.dragDrop = new DragDrop();
    this.intervalId = null;

    if (window.location.pathname != '/' && window.location.pathname in pathnameToGameTypeMap) {
      this.setGameType(pathnameToGameTypeMap[window.location.pathname]);
    } else {
      this.setGameType('squares');
    }
  }

  setGameType = (type) => {
    if (!type || type == this.state.gameType) return;
    if (type == 'positions') this.state.prompt.fen = fenArray[Math.floor(Math.random() * fenArray.length)];
    if (this.state.active) this.stopGame();

    this.state.gameType = type;
    history.pushState({ page: 1 }, 'Chess coordinates', '/' + type);
    this.uiHandler.setGameType(type);
  };

  handleRanksFilesSquaresAnswer = (e) => {
    this.state.userInput = {
      file: e.target.dataset.file,
      rank: e.target.dataset.rank,
      square: e.target.dataset.square,
      colour: squaresColoursMap.light.includes(e.target.dataset.square) ? 'light' : 'dark',
    };
    this.ranksFilesSquaresGameAnswerGiven();
  };

  ranksFilesSquaresGameAnswerGiven = () => {
    if (this.state.gameType == 'ranks') {
      if (this.state.userInput.rank == this.state.prompt.rank) {
        this.state.score.correctCount++;
        this.uiHandler.ranksFilesSquaresPromptResetStyles();
        this.uiHandler.flashRank(this.state.userInput.rank, true);
        this.updatePrompt();
      } else {
        this.state.score.wrongCount++;
        this.uiHandler.flashRank(this.state.userInput.rank, false);
        this.uiHandler.ranksFilesSquaresPromptShowAnswerIsWrong();
      }
    } else if (this.state.gameType == 'files') {
      if (this.state.userInput.file == this.state.prompt.file) {
        this.state.score.correctCount++;
        this.uiHandler.ranksFilesSquaresPromptResetStyles();
        this.uiHandler.flashFile(this.state.userInput.file, true);
        this.updatePrompt();
      } else {
        this.state.score.wrongCount++;
        this.uiHandler.flashFile(this.state.userInput.file, false);
        this.uiHandler.ranksFilesSquaresPromptShowAnswerIsWrong();
      }
    } else if (this.state.gameType == 'squares') {
      if (this.state.userInput.square == this.state.prompt.square) {
        this.state.score.correctCount++;
        this.uiHandler.ranksFilesSquaresPromptResetStyles();
        this.uiHandler.flashSquare(this.state.userInput.square, true);
        this.updatePrompt();
      } else {
        this.state.score.wrongCount++;
        this.uiHandler.flashSquare(this.state.userInput.square, false);
        this.uiHandler.ranksFilesSquaresPromptShowAnswerIsWrong();
      }
    }
  };

  handleColoursAnswer = (e) => {
    this.state.userInput = {
      file: '',
      rank: '',
      square: '',
      colour: [...e.target.classList].join().includes('light') ? 'light' : 'dark',
    };
    const currentColour = squaresColoursMap.light.includes(this.state.prompt.square) ? 'light' : 'dark';
    if (this.state.userInput.colour == currentColour) {
      this.state.score.correctCount++;
      this.uiHandler.coloursGameShowCorrectAnswerGiven(this.state.userInput.colour);
    } else {
      this.state.score.wrongCount++;
      this.uiHandler.coloursGameShowWrongAnswerGiven(this.state.userInput.colour);
    }
    this.updatePrompt();
  };

  updatePrompt = () => {
    this.state.prompt.file = files[Math.floor(Math.random() * 8)];
    this.state.prompt.rank = ranks[Math.floor(Math.random() * 8)];
    this.state.prompt.square = this.state.prompt.file + this.state.prompt.rank;
    this.uiHandler.updatePrompt(this.state.prompt.square, this.state.gameType);
  };

  startRanksFilesSquaresColoursGame = () => {
    this.state.active = true;
    this.state.score.wrongCount = 0;
    this.state.score.correctCount = 0;
    this.updatePrompt();
    this.startCountDown();

    if (this.state.gameType === 'colours') this.uiHandler.startColoursGame();
    else this.uiHandler.startRanksFilesSquaresGame();
  };

  startPositionsGame = () => {
    this.state.active = true;
    this.state.score.wrongCount = 0;
    this.state.score.correctCount = 0;
    this.dragDrop.initListenersForPieces();
    this.dragDrop.initListenersForSquares();
    this.uiHandler.startPositionsGame();
  };

  checkPosition = () => {
    const promptSquareToPieceMap = squareToFenMapFromFen(this.state.prompt.fen);
    const userInputSquareToPieceMap = squareToFenMapFromUi();
    this.state.userInput.fen = mapToFen(userInputSquareToPieceMap);
    this.uiHandler.finishPositionsGame(promptSquareToPieceMap, userInputSquareToPieceMap);
  };

  stopGame = () => {
    this.state.active = false;
    clearInterval(this.intervalId);
    this.state.countdownSeconds = this.config.defaultCountdownSeconds;
    this.uiHandler.stopGame();

    if (this.state.gameType === 'ranks' || this.state.gameType === 'files' || this.state.gameType === 'squares') {
      console.log('// stop ranks files squares game');
    } else if (this.state.gameType === 'colours') {
      console.log('// stop colours game');
    } else if (this.state.gameType === 'positions') {
      this.dragDrop.removeAllListeners();
    }
  };

  resetPositionsGame = () => {
    this.stopGame();
    this.uiHandler.hideScore();
    this.state.prompt.fen = fenArray[Math.floor(Math.random() * fenArray.length)];
    this.uiHandler.resetPositionsGame();
  };

  startCountDown = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.state.countdownSeconds = this.config.defaultCountdownSeconds;
    }
    this.uiHandler.setCountdown(this.state.countdownSeconds);
    this.intervalId = setInterval(() => {
      if (this.state.countdownSeconds <= 1) {
        this.stopGame();
      } else {
        this.state.countdownSeconds = this.state.countdownSeconds - 1;
        this.uiHandler.setCountdown(this.state.countdownSeconds);
      }
    }, 1000);
  };
}
