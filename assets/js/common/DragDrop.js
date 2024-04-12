import { fenToSVGMap } from '../common/Utils.js';

export class DragDrop {
  constructor() {
    this.draggingPieceFenNotation = '';
    this.sourceSquare = null;
    this.validateOnSquareDropCb = null;
    this.squareDropCommitCb = null;
  }

  initListenersForPieces = () => {
    document.querySelectorAll('.draggable-piece').forEach((piece) => {
      piece.addEventListener('dragstart', this.onPieceDragStart);
    });
  };

  onPieceDragStart = (e) => {
    this.draggingPieceFenNotation = e.target.dataset.fenPiece;
    if (e.target.parentElement.nodeName == 'TD') {
      this.sourceSquare = e.target.parentElement.dataset.square;
    } else {
      this.sourceSquare = null;
    }
  };

  initListenersForSquares = (validateOnSquareDropCb = null, squareDropCommitCb = null) => {
    this.validateOnSquareDropCb = validateOnSquareDropCb;
    this.squareDropCommitCb = squareDropCommitCb;
    document.querySelectorAll('.board .square').forEach((square) => {
      square.addEventListener('dragover', this.onSquareDragOver);
      square.addEventListener('dragenter', this.onSquareDragEnter);
      square.addEventListener('dragleave', this.onSquareDragLeave);
      square.addEventListener('drop', this.onSquareDrop);
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
    let validMove = true;
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
      validMove = this.validateOnSquareDropCb(from, to, piece);
    }

    if (validMove) {
      // create element from string
      let div = document.createElement('div');
      div.innerHTML = fenToSVGMap[this.draggingPieceFenNotation];
      div = div.querySelector('div');
      // and add a class
      div.classList.add('draggable-piece');
      div.classList.add('piece-on-board');
      div.draggable = true;
      // and insert into the board square
      target.innerHTML = '';
      target.appendChild(div);

      if (from) {
        document.querySelector(`td[data-square="${from}"] div`).remove();
      }

      // init listeners
      this.initListenersForPieces();

      if (this.squareDropCommitCb) this.squareDropCommitCb(from, to, piece);
    }
  };

  removeAllListeners = () => {
    document.querySelectorAll('.draggable-piece').forEach((piece) => {
      piece.removeEventListener('dragstart', this.onPieceDragStart);
      piece.removeEventListener('dragend', this.onPieceDragEnd);
    });
    document.querySelectorAll('#board .square').forEach((square) => {
      square.removeEventListener('dragover', this.onSquareDragOver);
      square.removeEventListener('dragenter', this.onSquareDragEnter);
      square.removeEventListener('dragleave', this.onSquareDragLeave);
      square.removeEventListener('drop', this.onSquareDrop);
    });
  };
}
