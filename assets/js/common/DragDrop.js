import { fenToSVGMap } from '../common/Utils.js';

export class DragDrop {
  constructor() {
    this.draggingPieceFenNotation = '';
    this.sourceSquare = null;
    this.validateOnSquareDropCb = null;
    this.squareDropCommitCb = null;
    this.isCastleMoveCb = null;
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

  initListenersForSquares = (validateOnSquareDropCb, squareDropCommitCb, isCastleMoveCb) => {
    this.validateOnSquareDropCb = validateOnSquareDropCb;
    this.squareDropCommitCb = squareDropCommitCb;
    this.isCastleMoveCb = isCastleMoveCb;
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

      if (this.isCastleMoveCb()) {
        console.log('castle move');
        // This is a castle - we need to move the rook as well
        let rookFrom;
        let rookTo;
        if (to[0] === 'g') {
          rookFrom = 'h' + to[1];
          rookTo = 'f' + to[1];
        } else {
          rookFrom = 'a' + to[1];
          rookTo = 'd' + to[1];
        }
        // create element from string
        let rookDiv = document.createElement('div');
        rookDiv.innerHTML = fenToSVGMap[to[1] == 1 ? 'R' : 'r'];
        rookDiv = rookDiv.querySelector('div');
        // and add class(es) and attribute(s)
        rookDiv.classList.add('draggable-piece');
        rookDiv.classList.add('piece-on-board');
        rookDiv.draggable = true;
        // and insert into the board square
        document.querySelector(`td[data-square="${rookTo}"]`).innerHTML = '';
        document.querySelector(`td[data-square="${rookTo}"]`).appendChild(rookDiv);
        // and lastly remove the rook from the original square
        document.querySelector(`td[data-square="${rookFrom}"] div`).remove();
      } else {
        console.log('not castle move');
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
