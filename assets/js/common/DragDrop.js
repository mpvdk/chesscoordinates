import { fenToSVGMap } from '../common/Utils.js';

export class DragDrop {
  constructor(onDragStartCb = null) {
    this.onDragStartCb = onDragStartCb;
    this.draggingPieceFenNotation = '';
    this.sourceSquare = null;
    this.validateOnSquareDropCb = null;
    this.squareDropCommitCb = null;
    this.isCastleMoveCb = null;
  }

  initListenersForPieces = () => {
    // remove all existing listeners to avoid clones
    this.removePiecesListeners();
    // and re-init the listeners so that the new pieces can be moved
    document.querySelectorAll('.draggable-piece').forEach((piece) => {
      piece.addEventListener('dragstart', this.onPieceDragStart);
    });
  };

  removePiecesListeners = () => {
    document.querySelectorAll('.draggable-piece').forEach((piece) => {
      piece.removeEventListener('dragstart', this.onPieceDragStart);
    });
  };

  onPieceDragStart = (e) => {
    if (this.onDragStartCb) this.onDragStartCb(e);
    this.draggingPieceFenNotation = e.target.dataset.fenPiece;
    if (e.target.parentElement.nodeName == 'TD') {
      this.sourceSquare = e.target.parentElement.dataset.square;
    } else {
      this.sourceSquare = null;
    }
  };

  initListenersForSquares = (validateOnSquareDropCb, squareDropCommitCb, isCastleMoveCb) => {
    this.validateOnSquareDropCb = validateOnSquareDropCb;
    this.squareDropCommitCb = squareDropCommitCb;
    this.isCastleMoveCb = isCastleMoveCb;
    // remove all existing listeners to avoid clones
    this.removeSquaresListeners();
    // and re-init the listeners so that the new pieces can be moved
    document.querySelectorAll('.board .square').forEach((square) => {
      square.addEventListener('dragover', this.onSquareDragOver);
      square.addEventListener('dragenter', this.onSquareDragEnter);
      square.addEventListener('dragleave', this.onSquareDragLeave);
      square.addEventListener('drop', this.onSquareDrop);
    });
  };

  removeSquaresListeners = () => {
    document.querySelectorAll('.board .square').forEach((square) => {
      square.removeEventListener('dragover', this.onSquareDragOver);
      square.removeEventListener('dragenter', this.onSquareDragEnter);
      square.removeEventListener('dragleave', this.onSquareDragLeave);
      square.removeEventListener('drop', this.onSquareDrop);
    });
  };

  onSquareDragOver = (e) => {
    e.preventDefault();
    let target = e.target;
    while (target.nodeName !== 'TD') {
      target = target.parentNode;
    }
    target.classList.add('dragover');
  };

  onSquareDragEnter = (e) => {
    let target = e.target;
    if (e.target.nodeName !== 'TD') {
      while (target.nodeName !== 'TD') {
        target = target.parentNode;
      }
    }
    target.classList.add('dragover');
  };

  onSquareDragLeave = (e) => {
    let target = e.target;
    if (e.target.nodeName !== 'TD') {
      while (target.nodeName !== 'TD') {
        target = target.parentNode;
      }
    }
    target.classList.remove('dragover');
  };

  onSquareDrop = (e) => {
    // todo: this is a bit of a mess, needs refactoring
    // this is called when a move is made in the 'moves' game mode,
    // but also when the user drops a piece on the board in the 'memory' game mode
    // should probably split this into two separate functions
    let moveIsCorrectAnswer = true;
    const from = this.sourceSquare;
    const piece = this.draggingPieceFenNotation;
    let target = e.target;
    if (e.target.nodeName !== 'TD') {
      while (target.nodeName !== 'TD') {
        target = target.parentNode;
      }
    }
    const to = target.dataset.square;

    target.classList.remove('dragover');

    if (this.validateOnSquareDropCb) {
      moveIsCorrectAnswer = this.validateOnSquareDropCb(from, to);
    }

    if (moveIsCorrectAnswer) {
      // create element from string
      let div = document.createElement('div');
      div.innerHTML = fenToSVGMap[this.draggingPieceFenNotation];
      div = div.querySelector('div');
      // and add class(es) and attribute(s)
      div.classList.add('draggable-piece');
      div.classList.add('piece-on-board');
      div.draggable = true;
      // and insert into the board square
      target.innerHTML = '';
      target.appendChild(div);

      if (from) {
        document.querySelector(`td[data-square="${from}"] div`).remove();
      }

      if (this.squareDropCommitCb) this.squareDropCommitCb(from, to, piece);
      this.initListenersForPieces();
    }
  };

  removeAllListeners = () => {
    document.querySelectorAll('.draggable-piece').forEach((piece) => {
      piece.removeEventListener('dragstart', this.onPieceDragStart);
    });
    document.querySelectorAll('#board .square').forEach((square) => {
      square.removeEventListener('dragover', this.onSquareDragOver);
      square.removeEventListener('dragenter', this.onSquareDragEnter);
      square.removeEventListener('dragleave', this.onSquareDragLeave);
      square.removeEventListener('drop', this.onSquareDrop);
    });
  };
}
