import { fenToSVGMap } from './Utils.js';

export class DragDrop {
  constructor() {
    this.draggingPieceFenNotation = '';
  }

  initListenersForPieces = () => {
    document.querySelectorAll('.draggable-piece').forEach((piece) => {
      piece.addEventListener('dragstart', this.onPieceDragStart);
      piece.addEventListener('dragend', this.onPieceDragEnd);
    });
  };

  onPieceDragStart = (e) => {
    this.draggingPieceFenNotation = e.target.dataset.fenPiece;
  };

  onPieceDragEnd = (e) => {
    if (e.target.classList.contains('piece-on-board')) {
      e.target.remove();
    }
  };

  initListenersForSquares = () => {
    document.querySelectorAll('#positions-game .board .square').forEach((square) => {
      square.addEventListener('dragover', this.onSquareDragOver);
      square.addEventListener('dragenter', this.onSquareDragEnter);
      square.addEventListener('dragleave', this.onSquareDragLeave);
      square.addEventListener('drop', this.onSquareDrop);
    });
  };

  onSquareDragOver = (e) => {
    e.preventDefault();
    e.target.classList.add('dragover');
  };

  onSquareDragEnter = (e) => {
    e.target.classList.add('dragover');
  };

  onSquareDragLeave = (e) => {
    e.target.classList.remove('dragover');
  };

  onSquareDrop = (e) => {
    e.target.classList.remove('dragover');

    // create element from string
    let div = document.createElement('div');
    div.innerHTML = fenToSVGMap[this.draggingPieceFenNotation];
    div = div.querySelector('div');
    // and add a class
    div.classList.add('draggable-piece');
    div.classList.add('piece-on-board');
    div.draggable = true;
    // and insert into the board square
    e.target.innerHTML = '';
    e.target.appendChild(div);

    // init listeners
    this.initListenersForPieces();
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
