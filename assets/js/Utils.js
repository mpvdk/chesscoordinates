export function squareToFenMapFromFen(fen) {
  const boardObject = {};
  const rows = fen.split(' ')[0].split('/');
  rows.forEach((row, rowIndex) => {
    let columnIndex = 0;
    for (let char of row) {
      const square = String.fromCharCode(97 + columnIndex) + (8 - rowIndex); // Constructs the square id (e.g., "a8")
      if (isNaN(char)) {
        // If it's a piece
        boardObject[square] = char; // Assign the piece to the square
        columnIndex++;
      } else {
        // If it's a number, indicating empty squares
        const emptySquares = parseInt(char);
        for (let i = 0; i < emptySquares; i++) {
          const emptySquare = String.fromCharCode(97 + columnIndex + i) + (8 - rowIndex);
          boardObject[emptySquare] = ''; // Mark the square as empty
        }
        columnIndex += emptySquares;
      }
    }
  });
  return boardObject;
}

export function squareToFenMapFromUi() {
  const squares = document.querySelectorAll('#positions-game .board .square');
  const boardObject = {};
  squares.forEach((square) => {
    const svg = square.querySelector('svg');
    if (svg) {
      boardObject[square.dataset.square] = svg.dataset.fenPiece;
    } else {
      boardObject[square.dataset.square] = '';
    }
  });
  return boardObject;
}

export function mapToFen(map) {
  let fen = '';
  let emptyCount = 0;

  // Loop through each rank and file of the map
  for (let rank = 8; rank >= 1; rank--) {
    for (let file = 1; file <= 8; file++) {
      const square = `${String.fromCharCode(96 + file)}${rank}`;
      const piece = map[square] || '';

      if (piece === '') {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          fen += emptyCount;
          emptyCount = 0;
        }
        fen += piece;
      }
    }

    if (emptyCount > 0) {
      fen += emptyCount;
      emptyCount = 0;
    }

    if (rank > 1) {
      fen += '/';
    }
  }

  return fen;
}

export const queryParamToGameTypeMap = {
  row: 'ranks',
  rows: 'ranks',
  rank: 'ranks',
  ranks: 'ranks',
  column: 'files',
  columns: 'files',
  file: 'files',
  files: 'files',
  square: 'squares',
  squares: 'squares',
  position: 'positions',
  positions: 'positions',
  colour: 'colours',
  colours: 'colours',
  color: 'colours',
  colors: 'colours',
};

export const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];

export const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const squaresColoursMap = {
  light: [
    'a2',
    'a4',
    'a6',
    'a8',
    'b1',
    'b3',
    'b5',
    'b7',
    'c2',
    'c4',
    'c6',
    'c8',
    'd1',
    'd3',
    'd5',
    'd7',
    'e2',
    'e4',
    'e6',
    'e8',
    'f1',
    'f3',
    'f5',
    'f7',
    'g2',
    'g4',
    'g6',
    'g8',
    'h1',
    'h3',
    'h5',
    'h7',
  ],
  dark: [
    'a1',
    'a3',
    'a5',
    'a7',
    'b2',
    'b4',
    'b6',
    'b8',
    'c1',
    'c3',
    'c5',
    'c7',
    'd2',
    'd4',
    'd6',
    'd8',
    'e1',
    'e3',
    'e5',
    'e7',
    'f2',
    'f4',
    'f6',
    'f8',
    'g1',
    'g3',
    'g5',
    'g7',
    'h2',
    'h4',
    'h6',
    'h8',
  ],
};

export const fenArray = [
  'r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24',
  '5rk1/1p3ppp/pq3b2/8/8/1P1Q1N2/P4PPP/3R2K1 w - - 2 27',
  '8/4R3/1p2P3/p4r2/P6p/1P3Pk1/4K3/8 w - - 1 64',
  'r2qr1k1/b1p2ppp/pp4n1/P1P1p3/4P1n1/B2P2Pb/3NBP1P/RN1QR1K1 b - - 1 16',
  '8/8/4k1p1/2KpP2p/5PP1/8/8/8 w - - 0 53',
  '4r3/1k6/pp3r2/1b2P2p/3R1p2/P1R2P2/1P4PP/6K1 w - - 0 35',
  'r4rk1/pp3ppp/2n1b3/q1pp2B1/8/P1Q2NP1/1PP1PP1P/2KR3R w - - 0 15',
  'r1bqk2r/pp1nbNp1/2p1p2p/8/2BP4/1PN3P1/P3QP1P/3R1RK1 b kq - 0 19',
  '5r1k/5rp1/p7/1b2B2p/1P1P1Pq1/2R1Q3/P3p1P1/2R3K1 w - - 0 41',
  '8/7R/8/5p2/4bk1P/8/2r2K2/6R1 w - - 7 51',
  '3R4/8/K7/pB2b3/1p6/1P2k3/3p4/8 w - - 4 58',
  '4r3/5pk1/1p3np1/3p3p/2qQ4/P4N1P/1P3RP1/7K w - - 6 34',
  'r2q1rk1/5ppp/1np5/p1b5/2p1B3/P7/1P3PPP/R1BQ1RK1 b - - 1 17',
  '2kr3r/pp3p2/4p2p/1N1p2p1/3Q4/1P1P4/2q2PPP/5RK1 b - - 1 20',
  '4r1k1/5ppp/r1p5/p1n1RP2/8/2P2N1P/2P3P1/3R2K1 b - - 0 21',
  '1qr2rk1/pb2bppp/8/8/2p1N3/P1Bn2P1/2Q2PBP/1R3RK1 b - - 3 23',
  'r6r/1pNk1ppp/2np4/b3p3/4P1b1/N1Q5/P4PPP/R3KB1R w KQ - 3 18',
  '2r3k1/2r4p/4p1p1/1p1q1pP1/p1bP1P1Q/P6R/5B2/2R3K1 b - - 5 34',
  '7r/6k1/2b1pp2/8/P1N3p1/5nP1/4RP2/Q4K2 w - - 2 38',
  '5r1k/pp4pp/5p2/1BbQp1r1/6K1/7P/1PP3P1/3R3R w - - 2 26',
  '2r3k1/p1q2pp1/Q3p2p/b1Np4/2nP1P2/4P1P1/5K1P/2B1N3 b - - 3 33',
  '6k1/1p3pp1/1p5p/2r1p3/2n5/r3PN2/2RnNPPP/2R3K1 b - - 1 32',
  '1rb2rk1/q5P1/4p2p/3p3p/3P1P2/2P5/2QK3P/3R2R1 b - - 0 29',
  '6nr/pp3p1p/k1p5/8/1QN5/2P1P3/4KPqP/8 b - - 5 26',
  'r3k2r/pb1p1ppp/1b4q1/1Q2P3/8/2NP1Pn1/PP4PP/R1B2R1K w kq - 1 17',
  'r4rk1/p3ppbp/Pp1q1np1/3PpbB1/2B5/2N5/1PPQ1PPP/3RR1K1 w - - 4 18',
  'k1r1b3/p1r1nppp/1p1qpn2/2Np4/1P1P4/PQRBPN2/5PPP/2R3K1 w - - 0 19',
  '8/4R1k1/p5pp/3B4/5q2/8/5P1P/6K1 b - - 5 40',
  'r3kb1r/pppqpn1p/5p2/3p1bpQ/2PP4/4P1B1/PP3PPP/RN2KB1R w KQkq - 1 11',
  'r5k1/pp4pp/4p1q1/4p3/3n4/P5P1/1PP2Q1P/2KR1R2 w - - 4 24',
  'r7/2p2r1k/p2p1q1p/Pp1P4/1P2P3/2PQ4/6R1/R5K1 b - - 2 28',
  '8/8/kpq5/p4pQp/P7/7P/3r2P1/4R2K b - - 10 48',
  'r3brk1/5pp1/p1nqpn1p/P2pN3/2pP4/2P1PN2/5PPP/RB1QK2R b KQ - 4 16',
  'r3kb1r/ppq2ppp/4pn2/2Ppn3/1P4bP/2P2N2/P3BPP1/RNBQ1RK1 b kq - 2 10',
  '7r/p2q1pk1/1pp3p1/8/6P1/4Q3/PP1R1P1r/5KN1 b - - 0 38',
  '3r1rk1/1b1n1pp1/3p4/p4PPQ/4P3/3q1BN1/8/2R2RK1 b - - 1 28',
  'r3qrk1/2p2pp1/p2bpn1p/2ppNb2/3P1P2/1PP1P1B1/P2N2PP/R2Q1RK1 b - - 0 14',
  'r3kbnr/ppp1qppp/2n5/3pP3/5B2/4PQ2/PPP2PPP/RN2KB1R w KQkq - 1 7',
  'r4rk1/pp3ppp/3p1q2/P1P1p3/2B5/2B2n2/2P2P1P/R2Q1RK1 w - - 0 16',
  '8/8/1p6/k7/P1R5/1K5r/8/8 w - - 26 64',
  '8/6p1/2B1bn2/6k1/3B4/6K1/4P3/8 b - - 4 44',
  '8/7p/2b1k3/p2p1pPB/1n1P3P/N1p1P3/4K3/8 b - - 1 42',
  'r6k/q1pb1p1p/1b3Pr1/p1ppP2Q/3P2p1/4B3/PP2NRPP/3R2K1 b - - 1 25',
  'r2r2k1/1p2qppp/2n1p3/5n2/p2P4/P2Q1N2/BP3PPP/2R1R1K1 w - - 4 20',
  '2nk4/8/2PBp1n1/1pK1P1p1/1P4P1/8/8/8 b - - 2 42',
  '1r5r/p3kp2/4p2p/4P3/3R1Pp1/6P1/P1P4P/4K2R w K - 1 25',
  '8/3pk3/R7/1R2Pp1p/2PPnKr1/8/8/8 w - - 4 43',
  '6k1/3bqr1p/2rpp1pR/p7/Pp1QP3/1B3P2/1PP3P1/2KR4 w - - 6 22',
  'r4k1r/pNqnppb1/6pn/2p3Np/7P/2P2Q2/PP3PP1/R1B1K2R b KQ - 2 15',
  '2r5/pR5p/5p1k/4p3/4r3/B4nPP/PP3P2/1K2R3 w - - 0 27',
  '8/6pk/7p/2p5/2qp4/5PP1/P3QK1P/8 b - - 1 40',
  'r1bqk1nr/1pp2ppp/p1pb4/4p3/3PP3/5N2/PPP2PPP/RNBQ1RK1 b kq - 0 6',
  '8/r1b1q2k/2p3p1/2Pp4/1P2p1n1/2B1P3/NQ6/2K4R b - - 1 36',
  'rn3rk1/p5pp/3N4/4np1q/5Q2/1P3K2/PB1P2P1/2R4R w - - 0 25',
  'r3kb1r/p4ppp/b1p1p3/3q4/3Q4/4BN2/PPP2PPP/R3K2R b KQkq - 0 11',
  '1R6/1p2k2p/p2n2p1/4K3/8/6P1/P6P/8 w - - 10 37',
  'r1b1k2N/ppp3pp/2n5/2bp4/7q/1B4n1/PPPP1P1P/RNBQ1RK1 w q - 0 10',
  '6rk/pp6/2n5/3ppn1p/3p4/2P2P1q/PP3QNB/R4R1K w - - 2 29',
  'r1bqk2r/pp1nbppp/3p4/1B1p4/3P1B2/8/PPP2PPP/R2QK1NR w KQkq - 2 9',
  'r2qr1k1/ppp2ppp/4b3/3P4/1nP2Q2/2N2N1P/PP3KP1/R4R2 w - - 1 15',
  '2r2rk1/6pp/3Q1q2/8/3N1B2/6P1/PP1K3P/R4b2 w - - 0 24',
  '3r2k1/4nppp/pq1p1b2/1p2P3/2r2P2/2P1NR2/PP1Q2BP/3R2K1 b - - 0 24',
  'rnbqkb1r/pppp2pp/8/4P3/2B5/4p3/PPPP2PP/R1BQK1NR w KQkq - 0 7',
  '8/1N3k2/6p1/8/2P3P1/pr6/R5K1/8 w - - 1 56',
  '4r3/p5k1/2p2R1p/2Pp4/1P1pr1P1/P6P/8/3R3K w - - 1 35',
  '4qk2/1b3rR1/p7/1p2Q3/4P2P/P2P3K/2r5/3R4 w - - 5 41',
  '8/8/4R1kp/p7/5rPK/8/7P/8 b - - 2 42',
  'r1bk2r1/ppq2pQp/3bpn2/1BpnN3/5P2/1P6/PBPP2PP/RN2K2R w KQ - 3 13',
  '3r4/R7/2p5/p1P2p2/1p4k1/nP6/P2KNP2/8 w - - 3 41',
  '8/7R/5p2/p7/7P/2p5/3k2r1/1K2N3 w - - 3 48',
  '2kr2r1/1bp4n/1pq1p2p/p1P5/1P3B2/P6P/5RP1/RB2Q1K1 w - - 3 26',
  '5rk1/5ppp/1p6/1qp2P1Q/3p3P/6R1/6PK/8 b - - 0 30',
  '1r4k1/p4ppp/2Q5/3pq3/8/P6P/2PR1PP1/Rr4K1 w - - 1 26',
  'r4rk1/3q1pbp/p1n1p1p1/2p3NP/1p3B2/3P3Q/PPP3P1/R3R1K1 b - - 2 19',
  '8/4kr2/R2p4/1p1Pp1p1/5p2/3K1P2/PPP5/8 b - - 0 39',
  'r2r2k1/2q1bpp1/3p1n1p/1ppN4/1P1BP3/P5Q1/4RPPP/R5K1 b - - 1 20',
  '4rr1k/pQpn2pp/3p1q2/8/8/2P5/PP3PPP/RN3RK1 w - - 1 16',
  '5Q2/8/1b1kp1p1/5p2/3p4/5qPK/7P/8 b - - 1 51',
  '3q2k1/2r5/pp3p1Q/2b1n3/P3N3/2P5/1P4PP/R6K b - - 0 24',
  '8/2k3n1/3p2p1/1KpP2Pp/2P4P/7B/8/8 w - - 0 57',
  '6k1/p3b2p/1p1pP3/2p3P1/1Pnp3B/P6P/3Q3K/8 w - - 0 38',
  '6k1/ppq3pp/2p1rp2/4r3/4p1Q1/P5RP/1P3PP1/3R2K1 b - - 3 34',
  '2q3k1/4br1p/6RQ/1p1n2p1/7P/1P4P1/1B2PP2/6K1 b - - 0 27',
  '5rk1/1p2p1rp/p2p4/2pPb2R/2P1P3/1P1BKP1R/8/8 b - - 4 30',
  'r1b2rk1/p3pp2/2B4b/2Qpq3/3N2pp/4P3/2P2PPP/1R2K2R b K - 1 23',
  '3r1rk1/1pR3pp/p2bp3/1q2Np2/3P4/1P5Q/5PPP/4R1K1 w - - 2 27',
  'r6k/2q3pp/8/2p1n3/R1Qp4/7P/2PB1PP1/6K1 b - - 0 32',
  '2rr4/2N2pk1/p1Q1b1pp/1p4q1/3pP3/1B1P4/PPP3PP/6RK w - - 7 25',
  'r5k1/2p1pp2/pp4p1/1q1r4/5P2/2QP2R1/PP6/1K4R1 b - - 0 32',
  'r1b1qrk1/pp1n1pbp/2pp1np1/4p3/2PP1B2/2NBPN1P/PP3PP1/R2Q1RK1 w - - 0 10',
  '3rk2r/2qn1pp1/p1Q1R3/3n3p/8/8/PP4PP/5R1K b k - 0 23',
  '8/8/1p1k1p1p/3npp2/2B5/PP1K1PP1/7P/8 b - - 0 36',
  '8/8/5pp1/3K3p/3N2kP/8/8/8 w - - 2 62',
  '1r6/pp2kpp1/2n1p1n1/3p2PQ/5P2/2PqP3/PP1N4/2KR3R w - - 3 27',
  '8/3k4/1K1P4/2P3r1/R7/5b2/8/8 b - - 0 68',
  'r1r3k1/ppq3bQ/4p2p/4n3/3p4/2P5/PBB2PPP/4R1K1 b - - 2 24',
  '6k1/pp3pp1/2p1q1Pp/3b4/8/6Q1/PB3Pp1/3RrNK1 b - - 2 27',
  'r2q1r1k/2p3p1/pb2Q2p/1p1p1n2/8/1BP5/PP1B1PPP/3RR1K1 w - - 3 20',
  'r1q3k1/4bppp/pp2pn2/4B3/8/2N2Q2/PPPR1PPP/6K1 b - - 0 18',
  '7r/pppk4/2pb1r2/8/2NP2p1/2P5/PP2RPP1/4R1K1 w - - 2 26',
];

export const svgPieces = {
  whitePawn:
    '<div data-fen-piece="P">\
      <svg fill="#fff" viewBox="-96 0 512 512" xmlns="http://www.w3.org/2000/svg" data-fen-piece="P">\
        <g>\
          <path\
            stroke="black"\
            stroke-width="20"\
            d="M105.1 224H80a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h16v5.49c0 44-4.14 86.6-24 122.51h176c-19.89-35.91-24-78.51-24-122.51V288h16a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-25.1c29.39-18.38 49.1-50.78 49.1-88a104 104 0 0 0-208 0c0 37.22 19.71 69.62 49.1 88zM304 448H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"\
          ></path>\
        </g>\
      </svg>\
    </div>',
  whiteRook:
    '<div data-fen-piece="R">\
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#fff" data-fen-piece="R">\
        <g>\
          <path\
            stroke="black"\
              stroke-width="20"\
              fill="#fff"\
              d="M406 484.7H106v-60h300v60zm-56.67-330.83h-50.05V91.3h-82.39v62.57h-54.22V91.3h-54.23v113.67h295.12V91.3h-54.23v62.57zm23.35 67.23H139.32v187.6h233.36V221.1z"\
            ></path>\
          </g>\
        </svg>\
    </div>',
  whiteKnight:
    '<div data-fen-piece="N">\
      <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" data-fen-piece="N">\
        <g>\
          <g>\
            <path\
              stroke="black"\
              stroke-width="1.5"\
              d="M7.2,16l1.1-0.2c1.6-0.3,3.3-0.5,5-0.7c-2.4,2.3-3.9,5.3-4.7,7.9h14.7c0.4-1.5,1.1-3,2.3-4.1l0.2-0.2 c0.2-0.2,0.3-0.4,0.3-0.6C26.6,13,24.2,8,19.8,5.3c-0.8-1.4-2-2.4-3.6-2.9l-0.9-0.3C15,2,14.7,2,14.4,2.2C14.2,2.4,14,2.7,14,3v2.4 l-1.4,0.7C12.2,6.3,12,6.6,12,7v0.5l-4.7,3.1C6.5,11.1,6,12.1,6,13.1V15c0,0.3,0.1,0.6,0.4,0.8C6.6,16,6.9,16,7.2,16z"              ></path>\
            <path stroke="black" stroke-width="1.5" d="M6.8,25C6.3,25.5,6,26.2,6,27v2c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1v-2c0-0.8-0.3-1.5-0.8-2H6.8z"></path>\
          </g>\
        </g>\
      </svg>\
    </div>',
  whiteBishop:
    '<div data-fen-piece="B">\
      <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226.417 226.417" data-fen-piece="B">\
        <g>\
          <g>\
             <path\
              stroke="black"\
              stroke-width="8"\
              fill="#fff"\
              d="M175.827,200.452v25.966H50.59v-25.966H175.827z M158.438,166.801h-13.748v-55.218h13.748V85.615h-16.893 c5.627-6.366,9.066-14.709,9.066-23.871C150.611,41.807,114.506,0,114.506,0S78.415,41.807,78.415,61.744 c0,9.171,3.443,17.517,9.073,23.871H67.973v25.969h13.746v55.218H67.973v25.973h90.464V166.801L158.438,166.801z"\
            ></path>\
          </g>\
        </g>\
      </svg>\
    </div>',
  whiteQueen:
    '<div data-fen-piece="Q">\
      <svg fill="#fff" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-fen-piece="Q">\
        <g>\
          <path\
            stroke="black"\
            stroke-width="20"\
            d="M256 112a56 56 0 1 0-56-56 56 56 0 0 0 56 56zm176 336H80a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm72.87-263.84l-28.51-15.92c-7.44-5-16.91-2.46-22.29 4.68a47.59 47.59 0 0 1-47.23 18.23C383.7 186.86 368 164.93 368 141.4a13.4 13.4 0 0 0-13.4-13.4h-38.77c-6 0-11.61 4-12.86 9.91a48 48 0 0 1-93.94 0c-1.25-5.92-6.82-9.91-12.86-9.91H157.4a13.4 13.4 0 0 0-13.4 13.4c0 25.69-19 48.75-44.67 50.49a47.5 47.5 0 0 1-41.54-19.15c-5.28-7.09-14.73-9.45-22.09-4.54l-28.57 16a16 16 0 0 0-5.44 20.47L104.24 416h303.52l102.55-211.37a16 16 0 0 0-5.44-20.47z"\
          ></path>\
        </g>\
      </svg>\
    </div>',
  whiteKing:
    '<div data-fen-piece="K">\
      <svg fill="#fff" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg" data-fen-piece="K">\
        <g>\
          <path\
            stroke="black"\
            stroke-width="20"\
            d="M400 448H48a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm16-288H256v-48h40a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8h-40V8a8 8 0 0 0-8-8h-48a8 8 0 0 0-8 8v40h-40a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h40v48H32a32 32 0 0 0-30.52 41.54L74.56 416h298.88l73.08-214.46A32 32 0 0 0 416 160z"\
          ></path>\
        </g>\
      </svg>\
    </div>',
  blackPawn:
    '<div data-fen-piece="p">\
      <svg fill="#000000" viewBox="-96 0 512 512" xmlns="http://www.w3.org/2000/svg" data-fen-piece="p">\
        <g>\
          <path\
            d="M105.1 224H80a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h16v5.49c0 44-4.14 86.6-24 122.51h176c-19.89-35.91-24-78.51-24-122.51V288h16a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-25.1c29.39-18.38 49.1-50.78 49.1-88a104 104 0 0 0-208 0c0 37.22 19.71 69.62 49.1 88zM304 448H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"\
          ></path>\
        </g>\
      </svg>\
    </div>',
  blackRook:
    '<div data-fen-piece="r">\
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000" data-fen-piece="r">\
        <g>\
          <path\
            fill="#000000"\
            d="M406 484.7H106v-60h300v60zm-56.67-330.83h-50.05V91.3h-82.39v62.57h-54.22V91.3h-54.23v113.67h295.12V91.3h-54.23v62.57zm23.35 67.23H139.32v187.6h233.36V221.1z"\
          ></path>\
        </g>\
      </svg>\
    </div>',
  blackKnight:
    '<div data-fen-piece="n">\
      <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" data-fen-piece="n">\
        <g>\
          <g>\
            <path\
              d="M7.2,16l1.1-0.2c1.6-0.3,3.3-0.5,5-0.7c-2.4,2.3-3.9,5.3-4.7,7.9h14.7c0.4-1.5,1.1-3,2.3-4.1l0.2-0.2 c0.2-0.2,0.3-0.4,0.3-0.6C26.6,13,24.2,8,19.8,5.3c-0.8-1.4-2-2.4-3.6-2.9l-0.9-0.3C15,2,14.7,2,14.4,2.2C14.2,2.4,14,2.7,14,3v2.4 l-1.4,0.7C12.2,6.3,12,6.6,12,7v0.5l-4.7,3.1C6.5,11.1,6,12.1,6,13.1V15c0,0.3,0.1,0.6,0.4,0.8C6.6,16,6.9,16,7.2,16z"\
            ></path>\
            <path d="M6.8,25C6.3,25.5,6,26.2,6,27v2c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1v-2c0-0.8-0.3-1.5-0.8-2H6.8z"></path>\
          </g>\
        </g>\
      </svg>\
    </div>',
  blackBishop:
    '<div data-fen-piece="b">\
      <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226.417 226.417" data-fen-piece="b">\
        <g>\
          <g>\
            <path\
              d="M175.827,200.452v25.966H50.59v-25.966H175.827z M158.438,166.801h-13.748v-55.218h13.748V85.615h-16.893 c5.627-6.366,9.066-14.709,9.066-23.871C150.611,41.807,114.506,0,114.506,0S78.415,41.807,78.415,61.744 c0,9.171,3.443,17.517,9.073,23.871H67.973v25.969h13.746v55.218H67.973v25.973h90.464V166.801L158.438,166.801z"\
            ></path>\
          </g>\
        </g>\
      </svg>\
    </div>',
  blackQueen:
    '<div data-fen-piece="q">\
      <svg fill="#000000" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-fen-piece="q">\
        <g>\
          <path\
            d="M256 112a56 56 0 1 0-56-56 56 56 0 0 0 56 56zm176 336H80a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm72.87-263.84l-28.51-15.92c-7.44-5-16.91-2.46-22.29 4.68a47.59 47.59 0 0 1-47.23 18.23C383.7 186.86 368 164.93 368 141.4a13.4 13.4 0 0 0-13.4-13.4h-38.77c-6 0-11.61 4-12.86 9.91a48 48 0 0 1-93.94 0c-1.25-5.92-6.82-9.91-12.86-9.91H157.4a13.4 13.4 0 0 0-13.4 13.4c0 25.69-19 48.75-44.67 50.49a47.5 47.5 0 0 1-41.54-19.15c-5.28-7.09-14.73-9.45-22.09-4.54l-28.57 16a16 16 0 0 0-5.44 20.47L104.24 416h303.52l102.55-211.37a16 16 0 0 0-5.44-20.47z"\
          ></path>\
        </g>\
      </svg>\
    </div>',
  blackKing:
    '<div data-fen-piece="k">\
      <svg fill="#000000" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg" data-fen-piece="k">\
        <g>\
          <path\
            d="M400 448H48a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm16-288H256v-48h40a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8h-40V8a8 8 0 0 0-8-8h-48a8 8 0 0 0-8 8v40h-40a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h40v48H32a32 32 0 0 0-30.52 41.54L74.56 416h298.88l73.08-214.46A32 32 0 0 0 416 160z"\
          ></path>\
        </g>\
      </svg>\
    </div>',
};

export const fenToSVGMap = {
  r: svgPieces.blackRook,
  n: svgPieces.blackKnight,
  b: svgPieces.blackBishop,
  q: svgPieces.blackQueen,
  k: svgPieces.blackKing,
  p: svgPieces.blackPawn,
  R: svgPieces.whiteRook,
  N: svgPieces.whiteKnight,
  B: svgPieces.whiteBishop,
  Q: svgPieces.whiteQueen,
  K: svgPieces.whiteKing,
  P: svgPieces.whitePawn,
};
