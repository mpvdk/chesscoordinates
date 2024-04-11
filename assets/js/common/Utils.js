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
  const squares = document.querySelectorAll('#memory-game .board .square');
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
  position: 'memory',
  memory: 'memory',
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
  '5rk1/R4pp1/1p5p/3Q4/1PPp2q1/3P2P1/5P2/4nK2 w - - 0 34',
  '1r6/5k2/2p1pNp1/p5Pp/1pQ1P2P/2P4R/KP3P2/3q4 w - - 4 31',
  '1r6/k2qn1b1/p1b1p1p1/2PpPpN1/2nN1P1P/p4B2/1PP2Q2/1K1R3R w - - 0 32',
  '1k1r3r/2q5/pp1n2p1/8/1Q6/3R2P1/PPP2P1P/3R2K1 b - - 4 29',
  'r5kr/pp1qb1p1/2p4p/3pPb1Q/3P4/2P1B3/PP4PP/R4RK1 b - - 1 17',
  '3r1rk1/1p4p1/p1p3Qp/2q5/8/3n1N1P/PP1R2P1/5R1K b - - 7 28',
  '8/8/2p2k2/1p1p4/3P4/1PP1pK2/8/8 b - - 3 64',
  'r1b4r/pp1k2pp/2nb2q1/1B1p2B1/3p3Q/8/PPP2PPP/3RR1K1 b - - 5 17',
  '1r4k1/4bpp1/1rp2n1p/3p4/3P4/2N1B1P1/Pq2QPKP/2R1R3 w - - 3 24',
  'r2qr2k/1pp2pp1/1b4np/pP2P3/P4n2/BQN2N1P/5PP1/R3R1K1 w - - 3 20',
  '1r3k2/5p1p/2p1pp2/P2n4/2r1N3/P4PK1/2R2P1P/2R5 b - - 9 29',
  '2r5/4ppkp/5bp1/1p6/1P6/P3B3/2r2PPP/1R1R2K1 b - - 2 22',
  '3Q4/5kr1/8/1P2pB2/2Pp1n2/q2P3P/7K/5R2 w - - 7 49',
  '6R1/8/Kpk1p3/1p1pP3/6P1/PPP1r3/8/8 b - - 3 40',
  'r4rk1/ppq2ppp/2nbp1b1/3p4/3Pn3/2PB1N1P/PP3PP1/R1BQRNK1 b - - 4 14',
  '3q1nk1/1bN2rpp/pp1P4/1N6/4n2b/8/PPP2PPP/R1BQ1RK1 w - - 1 16',
  '3r2k1/1b3pbR/p2P2P1/3p2N1/2p5/2P2N2/PP6/2K5 b - - 0 28',
  'rk5r/1b3R2/pp2p2q/4P2p/B2p3B/4R2P/PP4P1/5Q1K b - - 0 27',
  'r3kb1r/3nnpp1/4p1bp/1NppP3/3P4/6N1/P2BBPPP/R3K2R b KQkq - 0 17',
  '4r1k1/p4p1p/1p6/6q1/3P2n1/P4Q2/1P1B2P1/7K w - - 0 34',
  '2kr3r/p1p1bpp1/2p2n1p/8/8/1P6/P1P1RPPP/RNB3K1 w - - 1 16',
  '2kr3r/pp1n2pp/2QB1bp1/5q2/2B5/8/PPP2PPP/3R1RK1 b - - 0 17',
  '6k1/p4p2/1p5p/4r3/P3B3/1P3P2/2PK2PP/8 w - - 0 29',
  '2r3rk/5p2/4p2p/4q3/1Q6/8/1P3PPP/R4RK1 w - - 0 31',
  'r1bq3Q/1np2kp1/p5B1/1p1Pp3/1Pn2BP1/2b2P2/P3K3/R4N2 b - - 5 35',
  'r3k1nr/1pp2ppp/1pnp2q1/4p1B1/2B1P3/3P1Q1P/PPP2PP1/R4RK1 b kq - 0 11',
  '7Q/2p5/1p2prp1/p4k1p/P4p1P/8/6RK/3q4 b - - 2 37',
  'r1bqk2r/pp3ppp/4p2n/3pP3/1b1P1P2/2N5/PP4PP/R1BQKB1R b KQkq - 2 9',
  '1k1r4/ppp3p1/8/1P5p/8/P3n2P/2P1r1P1/B3NRK1 b - - 4 31',
  'r4rk1/6p1/b3p1nN/p1pp4/1p3P1q/3P1Q1B/PPP2PK1/R6R b - - 0 26',
  '6k1/2p2ppp/pnp5/B7/2P3PP/1P1bPPR1/r6r/3R2K1 b - - 1 29',
  '8/4k3/1p1p4/rP2p1p1/P2nP1P1/3BK3/8/R7 w - - 0 35',
  '8/6pp/3Bp2k/p2pP2P/P2bp1PK/8/r7/5R2 b - - 2 37',
  '7k/pb1qn2n/1p2R2Q/2p2p2/2Pp4/3B4/PP3PrP/4RK2 b - - 1 27',
  '2rq1rk1/7p/1n4pb/1R2p3/pPpP1P2/P1B5/3NQ1PP/2R3K1 w - - 0 31',
  'Q5k1/p1p3p1/5rP1/8/3P4/7P/q3r3/B4RK1 b - - 1 34',
  '4r1k1/2R3pp/2p4q/1p1p4/3P4/P7/1PP2R2/1K1N4 b - - 3 32',
  '8/7k/pR5p/3p4/5r2/2P1p2P/P5P1/6K1 w - - 0 40',
  'r2qk1nr/ppp3pp/2n5/1B1pp3/1b1P4/5Q1P/PP1B1PP1/RN2K2R b KQkq - 3 11',
  '2r3k1/2qR1ppp/p7/2p2Q2/P7/7P/5PP1/6K1 b - - 3 26',
  'r1q4r/2p1kP2/3p4/2pPp3/p1P1Pb2/P1NB3b/1P3KP1/R2Q1R2 w - - 1 23',
  'r2qr1k1/p5bp/1pp1b1p1/8/2QN1p2/2P1n2P/PP3PP1/R1B1RNK1 w - - 1 18',
  '3rk3/5p1r/p2Np1p1/3bP3/P2n4/8/1P3RPP/5RK1 b - - 4 25',
  '6k1/pb2r1pN/1n4Bp/3p4/1P2pR2/P7/3R1PPP/2r3K1 w - - 2 30',
  'r2b2k1/1p3q1p/p2p4/3P2p1/2P1PRQr/8/P2B3P/2R4K w - - 1 29',
  '1r3rk1/1pq2pbp/p1p1pnp1/2N1N3/3P4/1QP5/PP3PPP/3RR1K1 w - - 2 19',
  'rn1qk2r/pp3ppp/3bp1b1/3p4/3Pn2N/3BB3/PPP2PPP/RN1Q1RK1 w kq - 4 10',
  '8/1p4p1/pb2ppkp/3n4/3P4/P3BN1P/1P2KPP1/8 b - - 0 26',
  '1R6/6pk/2p4p/3bP2r/5B1P/2P2qP1/P4P1Q/4R1K1 w - - 2 40',
  '5Q2/pbp3np/1p1pB1pk/1P6/P3q2P/6K1/8/8 b - - 1 32',
  '6k1/6pp/p1N2p2/1pP2bP1/5P2/8/PPP5/3K4 b - - 1 28',
  '3r4/p1p2ppp/4k3/6Q1/5P2/4P3/Prqn2PP/3R1RK1 w - - 3 22',
  '2r3k1/4brp1/2p3b1/2Pp1q1p/3B3P/2P2N2/PP3P1K/R2Q2R1 w - - 1 31',
  '8/1p6/p1p2p2/P3b3/1PK3P1/2PBk3/8/8 b - - 3 60',
  '4r1k1/pp1qr1p1/7p/2pPR3/2P2p2/1PQ2P2/P5PP/4R1K1 w - - 3 33',
  '8/7Q/3p1kp1/1p6/2b5/2P4P/5PPK/4q3 b - - 8 36',
  'rn2k2Q/5p2/2p1p1r1/1q4p1/8/8/4NPPP/3R1K1R b q - 5 23',
  'r6k/3NR1p1/4n2p/5b2/p6P/6R1/8/6K1 w - - 2 43',
  '6k1/1R6/1p2p1pp/4P3/p1N2P2/6PK/7P/1r6 w - - 0 48',
  'br1qkb1r/p1pp1ppp/4Pn2/6B1/3Qn3/5NP1/P3PPBP/RN1R2K1 b k - 0 15',
  '5kr1/pp3p1p/1q2pBb1/1B1p4/P7/5P2/1P4rP/2Q1K2R b K - 0 21',
  '1R6/1P6/4pkp1/5p2/3P3p/3KP3/8/1r6 b - - 0 43',
  '3r1rk1/1p2q1pp/5p2/8/1P1n4/6Q1/PPbB1PPP/R2B1RK1 w - - 9 20',
  '8/2p1pk1p/Pp4p1/8/p1P2P2/3r2P1/3PR2P/3K4 b - - 1 33',
  '8/1bpp2k1/1p5r/1P2P3/3P1P2/2P1n1K1/2Q3P1/8 w - - 0 30',
  '3r4/4kp1p/1PQ1p1p1/p3b3/1p2P2P/1P6/6PK/8 w - - 1 36',
  '8/8/2B2p1p/P4Pp1/3p1kP1/1b1Pb2P/8/4K3 b - - 0 50',
  'r1b2rk1/2q2p1p/1p2pbp1/pP6/2P1Q3/P2B1N2/5PPP/3R1RK1 w - - 0 20',
  '1k4nr/pp1r1ppp/4p3/1Nb2q2/2Pp4/6P1/PP3P1P/R1BQR1K1 b - - 2 14',
  '2r3k1/p2q1pbp/1p2pnp1/nB1p4/3P4/1Pr1P2P/P1QB1PP1/2R2RK1 w - - 0 19',
  '8/1R6/p1pk4/6bp/1QP5/P7/KP6/3r2q1 b - - 2 44',
  '5rk1/Q2B1p1p/4p1p1/3p4/3N2b1/2q5/Pr3RPP/5RK1 w - - 0 23',
  '2k1r3/pppn1pp1/3b2b1/3p2Pp/2B2P2/3P3P/PPPR4/2K3NR w - - 0 18',
  '8/4bkp1/R6P/4p3/Pp2P3/1P1rB3/6P1/6K1 b - - 0 33',
  'r4rk1/pbp3pp/1p1pp3/6B1/2PPp2q/3nP2P/PP3P2/R2QKBR1 w Q - 8 16',
  '2K5/3P4/5b2/p1B5/P7/3k4/6p1/8 w - - 7 77',
  'r2qk2r/ppp2ppp/2n1b3/1B1N4/3b4/3P3P/P1P1QPP1/1R2K1NR w Kkq - 4 13',
  '1rb2r1k/4q2p/p2p4/3B1p2/1pPb4/1P2NQ2/P5PP/2R2RK1 w - - 1 24',
  '5rk1/p1Rb1ppp/2n1pn2/8/8/2P3P1/q4PBP/1rNQK2R b K - 2 16',
  'r4rk1/pp2bppp/2ppnn2/8/N1P1P3/q1P4P/P2N2PB/R2Q1R1K b - - 0 16',
  '2r3k1/4R1pp/p1p2p2/2p5/2P5/1PbN3P/P4PP1/6K1 w - - 0 25',
  '1rb1qrk1/6bp/2np4/2pNpp2/2P5/3P1B2/1B3PPP/1R1QR1K1 b - - 0 22',
  '3r2k1/1q3ppp/p2rp3/Qp1B4/7P/P4P2/1PP3P1/1K1R3R b - - 0 21',
  '8/6kp/4b1q1/1p6/1PpPp2Q/2P1P3/r2N2P1/5RK1 w - - 7 34',
  '1k6/pp6/4nNp1/P6p/3pr3/7P/3R1PPK/8 b - - 0 40',
  '1r2kr2/pp3p1p/2b1pn2/4N3/2P5/1N1B4/P3KP1P/6R1 b - - 4 21',
  'r6r/pp2kb2/3p1p1Q/1N1Pp3/3bP3/P2B2P1/1P4PP/7K w - - 6 28',
  'rnbqk2r/pp3ppp/5n2/3pN3/2B5/2P5/P1PPQPPP/R1B1K2R b KQkq - 1 8',
  'r2qkbnr/pp4pp/2p2p2/4n2b/2B1P3/2N2N2/PPP3PP/R1BQ1RK1 w kq - 0 10',
  '8/5k2/1P4R1/6PK/1r6/8/8/8 w - - 1 58',
  '8/5p1k/5Ppb/2p3P1/1p6/8/KB5Q/3q4 b - - 4 58',
  '7R/8/8/6p1/2p1p1k1/2PbK2p/P7/8 w - - 4 71',
  'r2k2nr/pp2qBb1/3p3p/Q5p1/3n1B2/2N2R2/PPP3P1/R5K1 b - - 1 18',
  '8/8/3p4/4kp2/1pP3pP/1RbK2P1/8/8 w - - 2 42',
  '5r1k/6b1/3p3p/1P1q2pQ/r5P1/3p1N1P/3R2P1/4R2K w - - 2 34',
  '4r1k1/B7/2p2pK1/3n3p/8/1Q3PP1/P6r/8 b - - 0 31',
  '2r1q1k1/8/b2b1r1p/Pp1pNpp1/3Pn3/1RPQ3P/P1B1NPP1/4R1K1 w - - 3 28',
  'Q5k1/5q2/p2p4/b1p1pr2/P7/6P1/4KP1R/8 b - - 3 38',
  '1r5r/5pk1/4p3/2Np2PP/p1nP4/n1P5/P3B3/K1R4R w - - 2 34',
  '8/6pp/8/3kP3/1p1P2P1/rPpK3P/4R3/8 b - - 1 39',
  '5rk1/bpp3pp/p1npb3/4p3/1P2Nr1q/P1PP3P/1B1QBPR1/2K3R1 b - - 2 21',
  'rnq2r2/pp3pbk/3p1n2/2pPpPQ1/2P1P3/2N2NP1/PP4KP/R4R2 b - - 2 18',
  '8/p5pk/1p3b1p/3r3P/6P1/3nBN2/P4PK1/4R3 w - - 3 30',
  '2k4r/pp3pp1/4pn2/2np2p1/8/1B1P1Pq1/PPPN1R2/R2Q3K w - - 6 20',
  'r2qk2r/1pp2ppp/p1pb1n2/4P3/3Q4/2N2b2/PPP2PPP/R1B2RK1 w kq - 0 10',
  'b4b1r/3k1ppp/p2p4/1p2p3/3nq3/N1P1B3/PP3PPP/R2Q1RK1 w - - 1 16',
  '8/5k2/7p/p1P1bPpP/Pp2P3/1P1pBK2/8/8 w - - 1 47',
  '5rk1/4bppp/4b3/1p1pPpPP/2pP4/2P5/rqNQKP2/2RRN3 b - - 5 23',
  '3r1bnr/2p2ppp/2b5/R1k5/5P2/2N5/4N1PP/1R4K1 b - - 3 21',
  '5rk1/p4p1p/4p1p1/5nq1/8/5QPP/5PK1/2RR4 w - - 6 35',
  '8/2p1N1p1/3r3p/6k1/3p4/6P1/6KP/3R4 w - - 0 42',
  '8/8/8/6R1/2pk2P1/1r3K1P/8/8 w - - 0 48',
  '8/2p5/2P2k1p/2pKp3/3p2P1/3B1p2/7P/8 w - - 0 42',
  '1r4k1/p4p1p/6p1/3rb3/K7/2PpB3/1P1R1PPP/7R w - - 1 25',
  '3rr1k1/p4pp1/1pp4p/3pPQ2/1P3P2/2P3qP/P2R2P1/5RK1 w - - 1 24',
  'rnbq1rk1/p4ppp/1p2p3/2p5/2QPn3/2P1PN2/P3BPPP/R1B2RK1 w - - 0 11',
  '3k2q1/pb1p3p/1p1P4/2p5/2P2Q1K/8/P7/5R2 b - - 2 36',
  '6k1/5pp1/2R1p2p/8/P1B5/1P4P1/1q3Q1P/3r2K1 w - - 1 35',
  '8/5P1P/1p4K1/8/6P1/8/2p5/k6r b - - 0 62',
  'r3r1k1/p2Q1p1p/1p2p1p1/8/1P1P4/P3P3/1B2Nb1q/2KR1R2 w - - 0 19',
  '3r4/p5k1/1p1qprnp/1Q1pN1p1/3P1pP1/1PP5/P5PP/4RRK1 b - - 3 29',
  'r2q1rk1/ppp2ppp/2nbb3/8/6n1/2NPBN2/PPP1BPPP/R2QK2R w KQ - 5 9',
  '2rq1r1k/p5pp/8/1p1BpPb1/2Pp2Q1/P2P2R1/6PP/R5K1 b - - 3 25',
  'N2k3r/1b1n1Bpp/p7/1pb1P3/6P1/4p3/PPP4P/1K1R3R w - - 1 20',
  'r1b1k3/ppr4p/5p2/5p2/8/2P3P1/P4PP1/4RK1R b q - 1 23',
  'r3k2r/p1bN2pp/2p1pp2/3p3b/3P1q2/2N4P/PPPQ1PP1/R3R1K1 w kq - 0 16',
  '3r4/6k1/1p1pr1p1/p1p2p2/PnP1p1P1/1P6/3R1PBP/4R1K1 b - - 0 29',
  '5qk1/pQ3pp1/7p/b2N1b2/P3r3/5K2/7P/R4B2 b - - 1 24',
  'rnb1k2r/ppp4p/3b1qp1/3P1pBQ/4p2N/2N5/PPP2PPP/R3R1K1 b kq - 1 13',
  '6k1/4qpp1/3p3p/8/2BP4/1Pn5/2Qn1PPP/6K1 w - - 0 29',
  '3r1rk1/5ppp/p5q1/1p1P4/2PpP3/P6Q/B4PPP/2R3K1 b - - 0 29',
  '2rqrbk1/pp3ppp/4n3/3p1N2/3NnBQ1/2P4P/PP3PP1/R4RK1 b - - 14 22',
  '2k3r1/ppp2prp/1q2b3/8/Q7/2P1R1P1/P4P1P/4R1K1 b - - 3 23',
  'r3k3/ppp1qp2/1b1p3p/4p2r/2B1P1b1/P1PP1P2/1P4PQ/RN3R1K b q - 2 18',
  '8/1pp5/p2p3p/3P1Pk1/P3K1P1/1P5R/8/2r5 w - - 1 39',
  '2r3k1/5p1p/4pP2/3p3P/8/5P2/p1b3P1/2R3K1 b - - 0 30',
  '8/5k2/8/3pPPB1/1p4K1/1b6/8/8 b - - 0 45',
  '1k6/8/8/6p1/1pp5/p4PP1/N1P4P/7K w - - 0 38',
  '7R/1K3p2/6k1/PP4p1/8/6rp/8/8 b - - 2 47',
  'rnbk3r/pppp1Bpp/8/5p2/4p3/2PP4/P1P2PPP/R1B1K2R b KQ - 0 13',
  'r7/p1qbppbk/2p3p1/2pp4/4PP2/1P1P1N2/P1P3PP/3Q1RK1 b - - 2 16',
  'Q4n1k/p2b2pp/3b4/2p5/4pq2/2Pn3P/PP1NBPP1/R1B2RK1 w - - 1 23',
  '5k2/1R6/3pp1P1/2p5/1pr1PK2/5P2/8/8 b - - 0 60',
  '3r1rk1/p4pp1/b1p4p/8/BPPq4/P2P3P/2Q3P1/RNB4K b - - 2 27',
  'r5k1/5pp1/1p1rb2p/3pR2q/p1pP4/P1P3Q1/5PPN/4R1K1 b - - 1 30',
  '3r1rk1/pp2n1pp/8/8/Nq6/1PB5/P3QPPP/4R1K1 b - - 1 25',
  'r1bq1r2/1p4kp/4p1p1/1NpPp1P1/2P1P3/pPQ4B/P4n2/2KR3R b - - 1 21',
  '1r3rk1/2p1Nppb/p2nq3/1p2p1Pp/4Qn1P/2P1N3/PPB2P1K/3R2R1 b - - 5 28',
  '2b2k2/6q1/pn4p1/1rp2p2/8/8/1P2Q1P1/1K2R2R b - - 3 32',
  '1r1r2k1/pp4pp/2nNb3/2R2p2/2P1p3/8/P4PPP/3BR1K1 w - - 1 26',
  '1r4k1/p3p1bp/1n3qp1/6B1/6Q1/1P4pP/P5B1/3R3K b - - 0 29',
  '6r1/1p1bRk2/p2q1n1r/3p4/3Q4/1P1B3P/P1P2PP1/4R1K1 b - - 4 27',
  'R7/4k3/5p2/3p2p1/4b2p/2K1P2P/5PP1/8 w - - 2 47',
  '2R5/7p/1K4k1/8/5p2/5n2/8/8 w - - 0 63',
  '8/1b3pp1/1k4Pp/4K2P/4PP2/8/8/8 b - - 0 46',
  'r7/p3qkp1/1p4p1/3Nn3/Q7/4PP2/PP3K2/6R1 b - - 0 25',
  'r3r3/1kpRnqpp/p4p2/Qp2P2P/1N6/4Pb2/PPP3P1/2K2R2 b - - 0 22',
  '4rrk1/ppp2pp1/7p/3n4/3P3q/1P2p2P/P5P1/R1BQRBK1 w - - 2 23',
  '8/8/2p2p2/p4P1p/Pk5P/4K1P1/8/8 w - - 1 39',
  '8/5Rpk/3p3p/p1qPp3/P3n3/5N1P/1Q3PPK/2r5 b - - 0 35',
  '6k1/2q1pp2/p5pB/2p4n/3pP1Q1/P2P3P/1r4P1/5RK1 b - - 1 30',
  '7k/6p1/8/4p3/Pp1b4/1P3b1q/3Q2P1/5RK1 w - - 0 45',
  '3R1rk1/pp3ppp/2p3b1/2n3P1/2B2q1P/5N2/PPP1QP2/4R1K1 b - - 0 23',
  'b7/5pk1/R3pn1p/8/3NP3/5P2/6PP/2rB2K1 w - - 1 31',
  '8/pp6/2p1kpp1/3p4/3P1PPp/1P3K2/P1P4P/8 w - - 0 31',
  '4r2k/p6p/1p3R2/2p5/2P5/1P4R1/r5PP/2K5 w - - 0 32',
  '8/8/1p1k1n1p/4p3/1PP2pp1/3K4/3N1PPP/8 b - - 3 37',
  '6r1/7p/2pk1p2/P2p4/P2KbP2/4P3/4NR1P/8 w - - 1 35',
  'r2q1kr1/ppp2p1p/2n5/8/3P4/P2BP1N1/1P1Q1PbP/R3K2R w KQ - 0 17',
  'r2qkb1r/ppp1pppp/8/3p3Q/3n1P2/3B3P/PPP2PP1/RN2K2R b KQkq - 1 9',
  '4r1k1/pp1qn3/2p4R/6p1/3P1rR1/3Q2P1/PP3P1P/6K1 b - - 0 31',
  '6k1/6pp/1p6/p1n5/4qp2/1P2PN2/P4PPP/3Q2K1 b - - 0 28',
  '8/1p5k/p3pQq1/3pP3/2p3P1/2P5/PP6/2K5 w - - 3 33',
  '5r1k/5r2/2b2RQp/1p1p2p1/1q4P1/8/8/1B3R1K b - - 0 36',
  'rnbqk2r/1p3ppp/p4b2/2Pp4/8/2N2N2/PP2PPPP/R2QKB1R w KQkq - 0 9',
  '1rbr1k2/p4ppp/2B5/2pR1NP1/2P5/P7/7P/4R1K1 b - - 0 27',
  '2r2Qk1/p2q2p1/1p2p1Np/3p3P/3Pb1P1/2P5/PP3R2/6K1 b - - 4 33',
  '4r1k1/5pp1/2R4p/1p6/8/1PP3QP/2q2PP1/6K1 w - - 0 29',
  '2k2rr1/1p1q3p/1p2p3/1NbpQ3/P1p2P2/6P1/6KP/R4R2 b - - 0 31',
  '4r3/pN3kpp/2N1b3/2R5/5b2/P7/1P3PPP/7K w - - 1 30',
  '1k6/p1p5/P2p4/3P4/1PK2N1p/4P3/5r2/4B3 b - - 12 57',
  'b3k2r/4bpp1/2q1p2p/1p1nP3/1Pp1N3/2P5/2B2PPP/2BQR1K1 w k - 0 19',
  'r1b4r/ppk2ppp/2p5/3n2B1/2P5/6P1/P1P1B2P/2KR3R b - - 0 16',
  '8/4R3/1k6/8/p7/1p1N2P1/5KP1/r7 w - - 0 55',
  '4Q3/6pk/p3p2p/5p2/1p1P2P1/4q2P/2B1n2B/7K w - - 0 35',
  '5r2/4bp1k/2ppq1p1/4p1Q1/4N2P/3P4/1P1R1P2/4K1R1 b - - 0 29',
  '3r1rk1/3b1pp1/7p/8/N2Qp1n1/1P6/PB1q1PP1/R5K1 b - - 1 25',
  '1r2r1k1/ppp1q1pp/4b3/4P3/1Q1p1P2/8/P5PP/R1BR2K1 w - - 6 19',
  'rnbq1rk1/ppp2pp1/3p1n1p/2b1p2N/2B1P3/3P4/PPP2PPP/RNBQ1RK1 b - - 2 7',
  '4R3/1k2R3/3K2p1/1P6/1P6/2rp3r/8/8 b - - 3 45',
  'r5k1/pp4p1/1n6/3pB3/3P2pb/2NQ1r2/PP6/2K3R1 w - - 2 24',
  '8/b2r1p1k/5Qp1/1p5p/4p3/1P1q3P/5PP1/2B2RK1 b - - 13 38',
  'r1bk3r/ppp1n2p/3pNQ2/8/2BpP2p/8/PPPq2PP/R5K1 b - - 2 21',
  '8/2p4r/1p3k2/p2Pp1p1/P1P1RpP1/1P3P1r/4R1K1/8 w - - 7 46',
  '1q3r2/p5k1/1p2pbpp/2p2p2/2P1N3/2P2PQP/PP3P2/6RK b - - 2 29',
  'r1qr3k/pp3pB1/1np1pb2/8/3P3P/2N2PR1/PP1Q2P1/2KR4 b - - 0 22',
  'r4rk1/1p4p1/p1p1n1Pp/q3p3/4P3/2N1QP2/PPP5/2KR3R w - - 0 21',
  '3r2k1/pQ3ppp/4R1n1/2q5/2P5/2B3P1/P4PBP/6K1 b - - 0 24',
  '4r1k1/ppqb3p/6B1/3pb2Q/8/2P5/PP1B2PP/5RK1 b - - 0 20',
  '5rk1/ppq3pR/4p1r1/3p4/8/2P4Q/PP3RPP/6K1 b - - 0 22',
  '5r1k/pb3Qpp/2p5/5p2/3P4/8/PPP2PPP/4R1K1 b - - 0 21',
  '2r5/1p2k1pp/4p3/1N3p2/5P2/P2nP3/1R4PP/6K1 w - - 0 24',
  'r2q1rk1/p1p1bppp/2pp1nb1/4p3/4P1PN/2NP3P/PPP2PK1/R1BQ1R2 b - - 4 11',
  '7k/1q5p/3Q2p1/8/P3p3/1p2B2P/1br3P1/R5K1 b - - 0 32',
  '8/r7/Pk5p/3R2p1/4p1P1/4P3/3K4/8 b - - 0 48',
  '1rbk3r/3qp1b1/p3p1Bp/1N1P2p1/8/P5P1/1P2Q1P1/R3K2R w KQ - 2 23',
  '8/7p/6pK/5p2/4p3/1k4P1/5P1P/8 w - - 2 44',
  '8/8/8/2Pk4/pK4p1/3N4/5P2/3b4 b - - 7 59',
  'r2q2kr/p4pp1/4b2p/n1Qn4/5B2/4P3/PP3PPP/2KR1BNR w - - 1 14',
  '1r3k2/1p1q1p2/p2p1np1/2pP2bp/2P1P1n1/1PQ3P1/P3N1K1/3N1R1R b - - 11 28',
  '2rr2k1/5p2/4p2p/4N1pQ/1p3P2/4P3/np3P1P/2q2BRK b - - 1 32',
  '2r2rk1/3p1ppp/p3p3/1p2q3/6P1/3Q4/PP5P/1K2RR2 b - - 0 22',
  '8/r4k2/7R/5PK1/1n6/8/8/8 b - - 3 56',
  'r7/4kpRp/2p2p1P/p1P1n3/Pp6/1B6/5PP1/6K1 b - - 2 35',
  'r1bk1bnr/pppp1Bpp/8/3Nq3/3nP3/3P4/PPP2PPP/R1BQK2R b KQ - 0 8',
  '4r1k1/p4ppp/bqp2n2/2Qp4/3P4/8/PP3PPP/RNB1N1K1 w - - 1 16',
  '4r3/p1R3p1/4r2p/3k1n2/3p4/P5B1/1P4PP/4R1K1 w - - 2 28',
  '2k2r2/pp5p/3p4/3Nb1p1/8/1P1P3P/P1Pn4/1K1R1R2 w - - 3 28',
  '5rk1/p6p/2r1pBp1/4P3/2b5/3p4/P4PPP/1R2R1K1 w - - 0 27',
  'r1b2k1r/pp4p1/2pq2p1/3p4/3p4/1N6/PPP2PPP/R2Q1RK1 w - - 0 17',
  '8/8/6p1/PR3p2/1P3k2/7P/r5P1/7K w - - 1 39',
  '3R4/3P4/8/5p2/5kPp/8/3r1KP1/8 w - - 1 64',
  'R7/1p3kp1/2pK3p/3p1PP1/1r1B2nP/8/1P6/8 b - - 2 39',
  '5rk1/5ppp/1R6/3Qp3/2B1P3/2q3P1/3R1PKP/1r6 b - - 0 27',
  'r2q1rk1/p3bpp1/2pp1nb1/4p1Q1/8/1B3N1P/PPP3P1/R1B2RK1 b - - 0 18',
  'r2qk3/5p1r/p1p1p3/1p1pP1p1/P1nP2Pn/2P2NB1/2P2P2/R1QR2K1 w q - 1 21',
  '1r4k1/4Ppbp/p5p1/2q5/p2n4/P2Q2B1/r2N1PPP/3KR2R b - - 0 27',
  '6k1/5pp1/7p/2p5/2P5/2rp2PP/PR3P2/5K2 w - - 0 37',
  '3r2k1/1b2qpb1/pp4p1/3rp3/3R2P1/2P2NBP/PP2Q2K/3R4 b - - 0 33',
  '6k1/5r1p/4b1pQ/5q2/3B3P/2P5/6P1/4R1K1 w - - 7 36',
  '6k1/6Bp/6pP/3q1p2/p2PnQ2/2r5/P5PK/4R3 b - - 1 39',
  'r2qk2r/pp1n1ppp/4pn2/3p2B1/1b1P4/2N1QN1P/PPb1BPP1/R4RK1 w kq - 0 12',
  '2k4r/pp6/3p4/2pBb3/4P2B/2P2bp1/PP1R4/R5K1 w - - 1 32',
  '8/8/1n4kP/1P3p2/3P1K2/2p1N3/8/8 w - - 4 49',
  'kr6/1pR4p/p4R2/n2r4/P3p3/4B3/6PP/6K1 b - - 0 38',
  '2r3k1/3q1pp1/1rp5/2Rn2Np/1p1N3n/1Q2P3/5PP1/2R3K1 w - - 0 33',
  '5k2/1p3pp1/p3pb2/r7/2P2B2/1P6/1PR1K1PP/8 b - - 0 33',
  '1k6/1p1q4/P2p3p/1NpPpn1Q/5b2/2P3r1/1P2B1P1/R6K b - - 3 28',
  '5r1k/7p/p2pB3/3Pb1p1/4p2q/1P2B3/P1Q2P2/2R3K1 w - - 0 31',
  '3r3k/1p4pp/2p3q1/8/3Q4/8/PP4rP/R4R1K b - - 1 28',
  '8/p7/1p2k1pp/5p2/3P1P2/4K3/PP5P/8 w - - 2 37',
  'r1b1kb1r/pppp1ppp/2n1p3/3nN3/3P2q1/4B3/PPP1BPPP/RN1Q1RK1 b kq - 9 8',
  'r2qkb1r/ppp2ppp/2n5/3pPb2/3n1B2/2NB1N2/PP3PPP/R2QK2R b KQkq - 3 9',
  'r5k1/pbp2ppp/6q1/2pp4/3B3r/2P1R1P1/PP2QP1P/R5K1 b - - 1 20',
  '2n4k/p3b2p/Pp6/1PpPp3/2B1PpP1/1P6/5BK1/8 b - - 0 33',
  '5k2/8/4p3/3p2p1/p1pQ2P1/P1P2q2/1PB5/7K w - - 0 42',
  '2k5/1p4p1/p4b2/3p4/3P4/2PQN3/PP3q2/1K6 w - - 0 37',
  '4R3/1p4k1/1q1N1bpp/3B4/5p1P/p4P2/3RK1P1/8 w - - 4 42',
  '2r3k1/2r1q1p1/p3p1Q1/1p1p4/nP1P4/2P4R/P4PPP/2R3K1 b - - 0 30',
  '6k1/1N4pp/p7/4bp2/P1P5/1r6/6PP/2R3K1 w - - 1 33',
  'r1b1k2r/ppp2ppp/2n5/2bBp3/2Pq4/3P1QP1/P2B1P1P/1R2K1NR b Kkq - 2 12',
  '7k/np2b1pp/p1b2p2/2P1pq2/PPQ4P/5PP1/1B5K/3BN3 b - - 0 29',
  '8/1p6/p1b5/5k1p/1PB1p2P/P3P1K1/8/8 b - - 2 35',
  '3r3k/p5pp/2r2q2/2p4Q/8/8/P5PP/3R1R1K b - - 5 29',
  'r3r1k1/6b1/p2Nn2p/1P1Qp3/6nq/2P5/1PB2PP1/R1B1R1K1 w - - 1 30',
  '8/8/5pp1/5k1p/5P1P/4R1P1/2r5/5K2 w - - 0 43',
  '6k1/3R3p/1p5q/3P4/3QP1pN/6P1/PPr3B1/5rK1 w - - 0 25',
  'r1b3k1/pp3Rpp/3p4/2pN4/2P4b/5Q1P/PPP3P1/4qNK1 b - - 0 21',
  'rn1qr1k1/1p2bppp/2p2B2/p2p4/3P4/2N2N2/PPP1QPPP/2KRR3 b - - 0 12',
  '4r1k1/2p1qpp1/3p4/1p1P2PQ/1P5b/3R3P/2PBr3/5RK1 b - - 6 26',
  '8/8/2B5/4pK2/3k1pPp/5n1P/8/8 b - - 3 57',
  '1R6/3k1Q2/p2b1p2/2r1p3/3n4/P6P/5PP1/4qBK1 b - - 1 40',
  '1k5r/ppp5/2p5/3n4/5pQ1/3P1P1r/PPP2K2/5R2 w - - 2 26',
  '1k6/1Pp1rqp1/p1R5/6pp/Q6P/1P6/P4PBK/3r4 b - - 5 34',
  'r1b1kb1r/1p2np2/p1p4p/4PPp1/3PN3/8/PPP3PP/R1B2RK1 b kq - 0 15',
  '8/6rk/6p1/1R3b1p/2pQ1P2/2P3P1/qP4PK/8 b - - 0 36',
  '2kr3r/pp1b1pq1/2n1p3/2Pp4/5Np1/1QP3P1/P4PBP/R4RK1 b - - 4 19',
  'r5k1/1pp2Bp1/5n1p/1q2N3/3P4/7P/5PP1/4Q1K1 b - - 2 30',
  'r2q1rk1/1bb2ppp/p1n1p3/4P3/Np1P4/1B2NP2/1P4PP/2RQ1RK1 b - - 0 20',
  '8/1p2np2/1Pp1k3/p1P3p1/P2K3p/7P/4BPP1/8 b - - 1 33',
  '3k1rr1/pR1b3Q/2pqp3/8/N2P4/8/5PB1/R4K2 w - - 5 34',
  '3r4/2k2p1p/pp2pp2/2p5/3nN3/6P1/PPP2PRP/2K5 w - - 2 23',
  '4rk2/pbp2pp1/1p1b4/3P1q2/QPBPN3/1KP2P2/P5r1/R3R3 w - - 0 25',
  '6k1/6pp/1PP5/4b3/3p4/Br5P/4prP1/R5RK w - - 1 30',
  '2B4k/p1p3pb/8/5pnr/8/2P2R2/PPP2K2/6R1 w - - 6 34',
  'r2q1r2/ppp2pk1/3p1n2/4p1p1/2B1P3/2NP2Q1/PPP5/2K4R b - - 0 19',
  '6k1/1p3pp1/pB2qb1p/2P5/1P6/6QP/4r1P1/3R3K b - - 4 33',
  'r1bq1rk1/pp2bppp/2pp1n2/8/5P2/5N2/PBPPB1PP/RN1Q1RK1 w - - 5 11',
  '5r1r/pR5p/k1ppb1n1/4p1Q1/N3P3/1P1P4/P1P3PP/6K1 w - - 1 23',
  'r2qr1k1/pn1p2pp/bp3p2/2p1N3/2P5/1PB3Q1/P1P3PP/R4RK1 w - - 0 18',
  '6k1/3P1pp1/4p3/p7/Q3R3/3q1PP1/1P3PK1/2r5 w - - 0 37',
  'r1q1r1k1/1p3pp1/n1p4p/p1bpp2P/P3P3/2P2P2/1P1QBP2/R1BK3R b - - 3 23',
  '5k2/R3Rp2/6p1/1p5p/1P5K/2nr4/7P/8 b - - 7 43',
  'r3r1k1/ppp2ppp/2nn1q2/8/3P4/P1P1P1P1/2Q3BP/R1B1KR2 b Q - 4 16',
  '5QR1/5p1p/1b3qp1/p6k/P2P4/8/1P2rPPP/5RK1 w - - 7 32',
  '1k3r2/q5r1/2Qp3p/N2Bp3/4P1p1/P7/1PP2PPP/R5K1 w - - 12 35',
  '1rr3k1/5p1p/p5pQ/4p3/4q3/B3P3/PPPR1PPP/2KR4 w - - 6 27',
  'r3r1k1/pbq5/1p2pp1p/2p1N3/2PP2Q1/1P1B4/P5PP/R5K1 b - - 1 24',
  '5rk1/1bR3q1/pQ6/8/6r1/4R2P/P7/6K1 w - - 0 28',
  '6rk/7p/R2N3P/1r6/1P5K/P7/8/8 b - - 4 50',
  '8/8/8/p3b3/P1B2pKp/1Pk1p2P/6P1/8 w - - 8 50',
  '2r4k/5Q1p/p7/1pq5/4p2N/2P3bP/PP4P1/4R2K b - - 0 34',
  '8/5K1p/1p4pk/8/3brp2/5R2/8/8 b - - 5 50',
  'r3k3/p1pbq3/2p2p2/4p1p1/2B3p1/2P4r/P1P2PQP/3RR1K1 b q - 3 20',
  '3r4/p1pk1p1p/2pp1qr1/2b5/Q3P1b1/5NB1/P2N1PPP/R4RK1 w - - 2 16',
  '1n3rk1/r3q1bp/pp2p1p1/2p1NnN1/4QP2/BPP5/P2R2PP/5RK1 b - - 2 21',
  'r1bq1rk1/pp2pp1p/6pB/3Nb3/8/5B2/Pn2QPPP/R4RK1 b - - 1 15',
  'k7/pp1r2p1/2n2q2/3b1P1B/1P5P/2P5/P4Q2/2KR2R1 w - - 1 32',
  '5r2/7r/2kpqB1P/p1p1p2Q/P3P3/2PP4/5P1K/6R1 w - - 0 40',
  'r2qkbnr/pp5p/8/4Nb2/3p4/1QN5/PP2PPPP/R3KB1R b KQkq - 1 12',
  '8/1p6/7p/3k1pp1/1P5P/3K1P2/6P1/8 w - - 0 39',
  '3kRr2/3n1B1p/2pP4/p1n5/Ppp5/8/1P3PPP/4R1K1 b - - 8 32',
  'r2n2k1/1bRq1rpp/1p6/3P4/p3Q3/B3P3/PP3PPP/3R2K1 b - - 0 20',
  'r4rk1/p1p1R1pp/2p2p2/5P2/6Q1/1P5P/q5PK/8 b - - 1 30',
  '6k1/5p2/4p2p/3pPP2/1R5P/7r/2B5/2b2K2 b - - 0 46',
  '2kr3r/Qpp2ppp/3b1n2/8/3N4/4P1Pq/PP1B1P1P/2R2RK1 w - - 4 18',
  '3r1q1k/pppb2pp/2np4/6N1/5B2/1Q4P1/PP4PP/4R2K b - - 11 24',
  '2k1r2r/1p2P3/p1b1p3/3p1npp/5q2/1N3N1Q/PP3PPP/2R2RK1 w - - 1 22',
  '3r1rk1/Q3qppp/8/1ppb4/2Pn1B1n/2N3P1/PP3P2/R2R1K2 w - - 0 21',
  'r2q1rk1/pbp1bp2/1p2pn1Q/5nN1/8/P1NB4/1PP3PP/R4RK1 w - - 2 17',
  'r1b1kr2/p1p2pQp/1p2pP2/8/8/1P4P1/P2KNP1P/R1B4q b q - 0 17',
  'r7/7R/P3k3/4p2p/3b2p1/3K4/8/5R2 b - - 7 55',
  '8/n7/P7/3k4/PK6/7P/5PP1/8 w - - 0 53',
  '8/2p1b3/q1Pp2k1/3Pp3/4Pr2/1Q3PK1/3N2P1/7R w - - 1 47',
  '3r1rk1/1Q3ppp/1q2pb2/8/1P1N4/4P1P1/3B1PBP/R5K1 b - - 0 23',
  '1k5r/n2r2pp/5p2/ppN5/5P2/8/2R3PP/1R4K1 b - - 3 28',
  '6k1/pp3rpp/4Nb2/4p3/1B1r4/6PK/PP5P/2R5 b - - 0 28',
  '6rk/1pp1R1p1/6Bp/2b4P/8/pP3PK1/P1P5/8 w - - 5 32',
  '2r3k1/1p1q1ppp/4p3/Q7/3P4/P1B5/1Pr2PPP/R5K1 b - - 0 22',
  '8/7p/4K3/6p1/2k3P1/8/5P2/8 b - - 0 43',
  '8/3r1ppp/4p3/k3P3/pR2R2P/2P5/2Kr1PP1/8 w - - 4 31',
  '2k3r1/pp5p/4p3/2p2p2/2P5/P4P1q/1PQ1RR1b/7K w - - 0 32',
  'r1bq3r/ppppnkpp/2n5/b5N1/4P3/B1P5/P4PPP/RN1QK2R b KQ - 1 9',
  'r1bk4/pppp3p/2n5/2b1prN1/8/1B6/PPPP2PP/RNB2RK1 w - - 1 14',
  '8/8/1pr1p1kp/pbPp2pN/3Pp1P1/1P2K3/P6P/2R5 b - - 0 29',
  'r2q1rk1/p3b1pp/2p5/4ppB1/4p1nP/2N5/PPP1QPP1/3R1RK1 b - - 8 15',
  '1k1r1r2/pp4p1/6q1/2Qp4/5bP1/2P4p/PPN3NP/R4R1K w - - 0 30',
  'r1bqkb1r/ppp1n1p1/7p/3Pp1N1/2P5/8/PP3PPP/RNBQK2R w KQkq - 0 11',
  '1r3rk1/pP2qppp/1b3n2/1Q2p3/4P3/2NP1bP1/PP2NP1P/R1B2RK1 w - - 1 15',
  'r6r/pQ2nkpp/4b3/2p1q3/4p3/2N5/PP1B1PPP/R4RK1 w - - 1 15',
  'rnbqkb1r/pp3p1p/6pP/P1ppp3/6n1/3P1P2/1PP1P1P1/RNBQKBNR b KQkq - 0 7',
  '8/4k2p/Q1p1p3/p2pP1r1/q7/P6P/1P3PK1/2R2R2 w - - 1 28',
  '2kr1b1R/p5p1/8/3P1p2/8/4B3/PPPK1P2/8 w - - 1 25',
  'r1b5/p4pkp/3p2p1/2pPr3/2P5/1P1B4/R4PPP/R5K1 w - - 0 24',
  'r4q1k/2bn2p1/2p3pp/1pP5/1P1B2P1/1Q1P1r1P/5PB1/4RRK1 w - - 0 27',
  '8/1k6/1pn1R3/8/Pp4p1/4P3/5PK1/8 w - - 0 51',
  '8/2p5/5ppp/1PkP4/p4PPP/P1K5/8/8 b - - 0 39',
  '1k5r/ppp1R2p/3r1p2/5Q2/3p4/2qP4/2P2PPP/2K1R3 b - - 5 26',
  '3r2k1/2q1bppp/b3n3/p2N4/2p1P3/P3QN2/1PP2PPP/4R1K1 b - - 1 22',
  '3k4/ppp2p1r/4p2P/5n2/3Pp1N1/2P2K2/P1P3P1/7R w - - 0 30',
  '2kr4/p1pr1pp1/1p4p1/1PP1P3/3B1PP1/PQ2Pn1P/2KRR3/5q2 w - - 1 30',
  'r3k1nr/p1q3pp/1pb1p3/2b2p2/8/N1BQ1P2/PPP3PP/2KR3R b kq - 3 14',
  '2kr2nr/pp2nppp/2pp4/2b2PP1/4NPq1/3B1R2/PPP4P/R2QB2K w - - 5 18',
  '2k1r2r/Qpq5/3bp3/1P1P4/5pp1/2P5/1B2RPP1/R5K1 w - - 1 28',
  'r4k2/ppp3p1/3p3r/2q5/2NnP3/2Q2PBp/PP3R1P/5RK1 w - - 4 25',
  '3r1r2/p5kp/1p4pP/2p5/2PbBQ2/2q5/P1P1K3/5R2 b - - 0 34',
  'r2qkb1r/pp1nppp1/2p2n1p/3p1b2/3P4/BP2PN2/P1P2PPP/RN1QKB1R w KQkq - 2 7',
  'r6k/6bp/p7/2Q5/8/5P2/4bKPP/8 b - - 2 37',
  '2r1r2k/ppq3pp/3b1p2/3Q3R/3P4/4B3/PP3PPP/R5K1 w - - 1 20',
  '1r2r3/p2k3p/2bP1q1P/1p2ppp1/1P6/1KPB4/P6Q/3R1R2 b - - 1 38',
  'r4rk1/pbp1n1pp/1p1p4/3Pp1N1/2B4P/2PQ4/PP3qP1/R2K3R b - - 1 17',
  'r6r/p3kpbp/2Q1pnp1/q7/P2P1P2/1PP5/6PP/R1B2RK1 b - - 0 16',
  '3rr1k1/pp1q1pp1/1n1P1b1p/1Np5/8/1Q3N1P/PP3PP1/3R1RK1 b - - 2 20',
  'r1b2rk1/2q1bp1p/p5p1/1p2p1PB/3BP3/2N5/PPPQ3P/R3K2R w KQ - 0 17',
  'r3r1k1/1Q3ppp/8/pP6/2q5/7P/3R2P1/5R1K w - - 0 30',
  'rnbqk1nr/ppppbppp/4p3/8/5P2/5N2/PPPPP1PP/RNBQKB1R w KQkq - 2 3',
  'r4rk1/ppp2pn1/2np4/q2N4/3PP3/5P2/PPP5/1K1R1B1R b - - 2 18',
  '6k1/6b1/p1r1p2p/1pN4r/3P3q/2P2Q2/P4PP1/1R2R1K1 w - - 2 31',
  'r4rk1/pppq2b1/2np3p/4p2b/B5p1/2PPQ2P/PP1N1P1B/R3NRK1 w - - 0 21',
  '8/1R5R/4kpp1/4p3/4P2K/5P1P/r7/6r1 b - - 10 40',
  '2rqr1k1/B2b1ppp/5n2/8/3Q4/3B4/P1P2PPP/R3R1K1 w - - 3 22',
  '1n6/1P6/5pp1/8/2k3PP/4P3/3K4/8 b - - 0 51',
  'rn5Q/ppk1np2/3B4/6N1/6b1/8/PPP1q3/2KR4 b - - 0 18',
  '7k/pp5p/4r1pP/5pP1/3Q1n2/P1P5/KP6/5q2 b - - 1 35',
  'r4rk1/pb2ppb1/1q6/6PQ/8/2NP1N2/PPnK1PP1/R6R b - - 1 16',
  '8/8/3p2N1/3Pp1n1/4Pp1p/3k1P1P/6K1/8 w - - 8 57',
  '8/p7/1p4k1/2pN2p1/4Pp2/P1P4r/1P3KR1/8 w - - 6 50',
  '1rb2rk1/4bppp/p1n1p3/1p1qP3/7N/P5P1/1PQ2PBP/R1B2RK1 b - - 1 15',
  '1r4k1/p4ppp/4p3/p5n1/4P3/1P1N1PPq/QB3b1P/R5K1 w - - 0 30',
  '2k5/p3qp2/bpp1p1p1/4P2r/P4n1p/5P2/BPQ2B1P/1K1R4 b - - 0 30',
  '8/8/8/8/8/4K3/1k3Q2/1q6 b - - 5 53',
  '6k1/5pp1/p1N1b3/1n5p/1B4P1/P4P1P/2K5/8 b - - 2 42',
  'r3k1nr/1bq2ppp/p2p4/1p2p1NQ/3nP3/1BN4P/PP3PP1/R2R2K1 b kq - 2 15',
  '8/p3Q2p/6p1/4p1k1/5q2/8/Pr4PP/6K1 b - - 1 36',
  'b7/p1k1pp2/1pn2qp1/8/4B3/1PNR4/P1P2PP1/5K2 b - - 1 26',
  '5bk1/5ppp/8/Q7/3p4/8/P1K1q2P/2R5 w - - 2 33',
  '5q1k/2r3p1/1p2p2b/3p2NQ/3P4/1p6/5R2/6K1 b - - 1 38',
  '1k1r4/1p3Qp1/p2q3p/3N4/1b6/8/PP3PPP/2R3K1 w - - 4 22',
  '4k3/1R6/6p1/4Np1p/7P/2r3PK/5b2/8 w - - 11 47',
  'r6r/4kppp/2pNpnq1/p1P1n3/8/B3P3/PP2QPPP/3R1RK1 w - - 7 20',
  '8/5k2/8/1p1p2pN/1PpP1nP1/2P1KP2/8/8 b - - 10 58',
  '8/1kp5/4n3/3pN3/r2P3R/2K4P/8/8 w - - 5 48',
  '5r1k/1pp3p1/7p/pP1N4/P3P3/2PP3P/3BnbPK/R7 w - - 2 27',
  '8/6p1/8/pp2k1p1/2p2p2/2P1KPPP/PP6/8 w - - 0 37',
  'r2qkb1r/pp3ppp/2pp1nn1/8/4PB2/2N2B2/PPP2PPP/R2Q1RK1 w kq - 2 10',
  '8/8/6RP/2p5/p1k1pP2/4P3/np1K4/8 w - - 0 48',
  '8/3R3p/5kp1/8/2Bnp3/1P5P/P6r/4K3 b - - 1 40',
  'rnbQ1b1r/pp2n2p/2p2k2/1q2p1p1/3P4/5N2/P1P2PPP/R1B1K2R b KQ - 0 13',
  '3n2k1/6p1/pp3p1p/8/2r1NR1P/6P1/1PP5/1K6 b - - 1 32',
  'r4rk1/ppp3pp/4p3/2P4P/1nNP2q1/P3QP2/1Pb2K2/R4B1R b - - 0 22',
  '2r3nr/p5pp/b3kp2/3p4/4p3/BP3P2/P1PN2PP/2KR3R b - - 0 18',
  '1r2q1k1/R1p4p/3pNp2/3P4/1p3pbb/1BP5/1P3PPK/Q4R2 w - - 2 28',
  '6k1/5p1p/4pbp1/p2p4/2rP1P2/P3B1P1/1P2R1KP/8 b - - 0 30',
  '6r1/pp1qbpk1/8/2pPp1r1/2P1Pp2/P1N2Qp1/3B2K1/R6R w - - 0 31',
  '3r3r/q4pk1/p4N2/1p2PQp1/P4n2/3p1P1P/1P4P1/3RR1K1 w - - 0 32',
  '3r4/7p/p3nkp1/1b6/4P2P/1B2B3/P4KP1/8 b - - 1 38',
  '5r1k/ppQ3p1/6qp/5r2/3Pp1b1/2P5/P2B1PPP/R4R1K w - - 5 22',
  '1r1q1rk1/1b4b1/4p1pp/3pP3/p2B2P1/3B3Q/PPP5/2KR3R w - - 0 23',
  'r5k1/5pp1/2p5/P1N4p/2Pp1n2/1P3P2/5P1P/3R2K1 w - - 1 26',
  '3r1rk1/p1p2pbp/1p4p1/7n/4P3/1P2BP1q/P1B3QP/3R1R1K b - - 6 23',
];

export function countPiecesInFen(fen) {
  let count = 0;
  const positions = fen.split(' ')[0].split('');
  positions.forEach((p) => {
    if (/^[rnbqkp]$/i.test(p)) count++;
  });
  return count;
}

export const svgPieces = {
  whitePawn:
    '<div data-fen-piece="P" class="div-around-piece-svg">\
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="15 8 16 33"data-fen-piece="P">\
        <path\
          d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z"\
          style="\
            opacity: 1;\
            fill: #ffffff;\
            fill-opacity: 1;\
            fill-rule: nonzero;\
            stroke: #000000;\
            stroke-width: 1.5;\
            stroke-linecap: round;\
            stroke-linejoin: miter;\
            stroke-miterlimit: 4;\
            stroke-dasharray: none;\
            stroke-opacity: 1;\
          "\
        />\
      </svg>\
    </div>',
  whiteRook:
    '<div data-fen-piece="R" class="div-around-piece-svg">\
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="9 8 27 32" data-fen-piece="R">\
        <g\
          style="\
            opacity: 1;\
            fill: #ffffff;\
            fill-opacity: 1;\
            fill-rule: evenodd;\
            stroke: #000000;\
            stroke-width: 1.5;\
            stroke-linecap: round;\
            stroke-linejoin: round;\
            stroke-miterlimit: 4;\
            stroke-dasharray: none;\
            stroke-opacity: 1;\
          "\
          transform="translate(0,0.3)"\
        >\
          <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z " style="stroke-linecap: butt" />\
          <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z " style="stroke-linecap: butt" />\
          <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14" style="stroke-linecap: butt" />\
          <path d="M 34,14 L 31,17 L 14,17 L 11,14" />\
          <path d="M 31,17 L 31,29.5 L 14,29.5 L 14,17" style="stroke-linecap: butt; stroke-linejoin: miter" />\
          <path d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />\
          <path d="M 11,14 L 34,14" style="fill: none; stroke: #000000; stroke-linejoin: miter" />\
        </g>\
      </svg>\
    </div>',
  whiteKnight:
    '<div data-fen-piece="N" class="div-around-piece-svg">\
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="5 6 34 34" data-fen-piece="N">\
        <g\
          xmlns="http://www.w3.org/2000/svg"\
          style="\
            opacity: 1;\
            fill: none;\
            fill-opacity: 1;\
            fill-rule: evenodd;\
            stroke: #000000;\
            stroke-width: 1.5;\
            stroke-linecap: round;\
            stroke-linejoin: round;\
            stroke-miterlimit: 4;\
            stroke-dasharray: none;\
            stroke-opacity: 1;\
          "\
          transform="translate(0,0.3)"\
        >\
          <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" style="fill: #ffffff; stroke: #000000" />\
          <path\
            d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"\
            style="fill: #ffffff; stroke: #000000"\
          />\
          <path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z" style="fill: #000000; stroke: #000000" />\
          <path d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" style="fill: #000000; stroke: #000000" />\
        </g>\
      </svg>\
    </div>',
  whiteBishop:
    '<div data-fen-piece="B" class="div-around-piece-svg">\
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="6 5 33 36" data-fen-piece="B">\
        <g\
          style="\
            opacity: 1;\
            fill: none;\
            fill-rule: evenodd;\
            fill-opacity: 1;\
            stroke: #000000;\
            stroke-width: 1.5;\
            stroke-linecap: round;\
            stroke-linejoin: round;\
            stroke-miterlimit: 4;\
            stroke-dasharray: none;\
            stroke-opacity: 1;\
          "\
          transform="translate(0,0.6)"\
        >\
          <g style="fill: #ffffff; stroke: #000000; stroke-linecap: butt">\
            <path\
              d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"\
            />\
            <path\
              d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"\
            />\
            <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />\
          </g>\
          <path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18" style="fill: none; stroke: #000000; stroke-linejoin: miter" />\
        </g>\
      </svg>\
    </div>',
  whiteQueen:
    '<div data-fen-piece="Q" class="div-around-piece-svg">\
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="3 6 40 35" data-fen-piece="Q">\
        <g xmlns="http://www.w3.org/2000/svg" style="fill: #ffffff; stroke: #000000; stroke-width: 1.5; stroke-linejoin: round">\
          <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z" />\
          <path\
            d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"\
          />\
          <path d="M 11.5,30 C 15,29 30,29 33.5,30" style="fill: none" />\
          <path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" style="fill: none" />\
          <circle cx="6" cy="12" r="2" />\
          <circle cx="14" cy="9" r="2" />\
          <circle cx="22.5" cy="8" r="2" />\
          <circle cx="31" cy="9" r="2" />\
          <circle cx="39" cy="12" r="2" />\
        </g>\
      </svg>\
    </div>',
  whiteKing:
    '<div data-fen-piece="K" class="div-around-piece-svg">\
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="4 4 38 38" data-fen-piece="K">\
        <g xmlns="http://www.w3.org/2000/svg" fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">\
          <path stroke-linejoin="miter" d="M22.5 11.63V6M20 8h5" />\
          <path fill="#fff" stroke-linecap="butt" stroke-linejoin="miter" d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" />\
          <path fill="#fff" d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7" />\
          <path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0" />\
        </g>\
      </svg>\
    </div>',
  blackPawn:
    '<div data-fen-piece="p" class="div-around-piece-svg">\
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="15 8 16 33" data-fen-piece="p">\
        <path\
          d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z"\
          style="\
            opacity: 1;\
            fill: #000000;\
            fill-opacity: 1;\
            fill-rule: nonzero;\
            stroke: #000000;\
            stroke-width: 1.5;\
            stroke-linecap: round;\
            stroke-linejoin: miter;\
            stroke-miterlimit: 4;\
            stroke-dasharray: none;\
            stroke-opacity: 1;\
          "\
        />\
      </svg>\
    </div>',
  blackRook:
    '<div data-fen-piece="r" class="div-around-piece-svg">\
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="9 8 27 32" data-fen-piece="r">\
        <g\
          xmlns="http://www.w3.org/2000/svg"\
          style="\
            opacity: 1;\
            fill: #000000;\
            fill-opacity: 1;\
            fill-rule: evenodd;\
            stroke: #000000;\
            stroke-width: 1.5;\
            stroke-linecap: round;\
            stroke-linejoin: round;\
            stroke-miterlimit: 4;\
            stroke-dasharray: none;\
            stroke-opacity: 1;\
          "\
          transform="translate(0,0.3)"\
        >\
          <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z " style="stroke-linecap: butt" />\
          <path d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z " style="stroke-linecap: butt" />\
          <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z " style="stroke-linecap: butt" />\
          <path d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z " style="stroke-linecap: butt; stroke-linejoin: miter" />\
          <path d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z " style="stroke-linecap: butt" />\
          <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z " style="stroke-linecap: butt" />\
          <path d="M 12,35.5 L 33,35.5 L 33,35.5" style="fill: none; stroke: #ffffff; stroke-width: 1; stroke-linejoin: miter" />\
          <path d="M 13,31.5 L 32,31.5" style="fill: none; stroke: #ffffff; stroke-width: 1; stroke-linejoin: miter" />\
          <path d="M 14,29.5 L 31,29.5" style="fill: none; stroke: #ffffff; stroke-width: 1; stroke-linejoin: miter" />\
          <path d="M 14,16.5 L 31,16.5" style="fill: none; stroke: #ffffff; stroke-width: 1; stroke-linejoin: miter" />\
          <path d="M 11,14 L 34,14" style="fill: none; stroke: #ffffff; stroke-width: 1; stroke-linejoin: miter" />\
        </g>\
      </svg>\
    </div>',
  blackKnight:
    '<div data-fen-piece="n" class="div-around-piece-svg">\
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="5 6 34 34" data-fen-piece="n">\
        <g\
          style="\
            opacity: 1;\
            fill: none;\
            fill-opacity: 1;\
            fill-rule: evenodd;\
            stroke: #000000;\
            stroke-width: 1.5;\
            stroke-linecap: round;\
            stroke-linejoin: round;\
            stroke-miterlimit: 4;\
            stroke-dasharray: none;\
            stroke-opacity: 1;\
          "\
          transform="translate(0,0.3)"\
        >\
          <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" style="fill: #000000; stroke: #000000" />\
          <path\
            d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"\
            style="fill: #000000; stroke: #000000"\
          />\
          <path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z" style="fill: #ffffff; stroke: #ffffff" />\
          <path d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" style="fill: #ffffff; stroke: #ffffff" />\
          <path\
            d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "\
            style="fill: #ffffff; stroke: none"\
          />\
        </g>\
      </svg>\
    </div>',
  blackBishop:
    '<div data-fen-piece="b" class="div-around-piece-svg">\
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="6 5 33 36" data-fen-piece="b">\
        <g\
          xmlns="http://www.w3.org/2000/svg"\
          style="\
            opacity: 1;\
            fill: none;\
            fill-rule: evenodd;\
            fill-opacity: 1;\
            stroke: #000000;\
            stroke-width: 1.5;\
            stroke-linecap: round;\
            stroke-linejoin: round;\
            stroke-miterlimit: 4;\
            stroke-dasharray: none;\
            stroke-opacity: 1;\
          "\
          transform="translate(0,0.6)"\
        >\
          <g style="fill: #000000; stroke: #000000; stroke-linecap: butt">\
            <path\
              d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"\
            />\
            <path\
              d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"\
            />\
            <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />\
          </g>\
          <path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18" style="fill: none; stroke: #ffffff; stroke-linejoin: miter" />\
        </g>\
      </svg>\
    </div>',
  blackQueen:
    '<div data-fen-piece="q" class="div-around-piece-svg">\
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="3 6 40 35" data-fen-piece="q">\
        <g style="fill: #000000; stroke: #000000; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round">\
          <path\
            d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"\
            style="stroke-linecap: butt; fill: #000000"\
          />\
          <path\
            d="m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1,2.5 -1,2.5 -1.5,1.5 0,2.5 0,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z"\
          />\
          <path d="M 11.5,30 C 15,29 30,29 33.5,30" />\
          <path d="m 12,33.5 c 6,-1 15,-1 21,0" />\
          <circle cx="6" cy="12" r="2" />\
          <circle cx="14" cy="9" r="2" />\
          <circle cx="22.5" cy="8" r="2" />\
          <circle cx="31" cy="9" r="2" />\
          <circle cx="39" cy="12" r="2" />\
          <path d="M 11,38.5 A 35,35 1 0 0 34,38.5" style="fill: none; stroke: #000000; stroke-linecap: butt" />\
          <g style="fill: none; stroke: #ffffff">\
            <path d="M 11,29 A 35,35 1 0 1 34,29" />\
            <path d="M 12.5,31.5 L 32.5,31.5" />\
            <path d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" />\
            <path d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" />\
          </g>\
        </g>\
      </svg>\
    </div>',
  blackKing:
    '<div data-fen-piece="k" class="div-around-piece-svg">\
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="4 4 38 38" data-fen-piece="k">\
        <g\
          style="\
            fill: none;\
            fill-opacity: 1;\
            fill-rule: evenodd;\
            stroke: #000000;\
            stroke-width: 1.5;\
            stroke-linecap: round;\
            stroke-linejoin: round;\
            stroke-miterlimit: 4;\
            stroke-dasharray: none;\
            stroke-opacity: 1;\
          "\
        >\
          <path d="M 22.5,11.63 L 22.5,6" style="fill: none; stroke: #000000; stroke-linejoin: miter" id="path6570" />\
          <path\
            d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"\
            style="fill: #000000; fill-opacity: 1; stroke-linecap: butt; stroke-linejoin: miter"\
          />\
          <path\
            d="M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37"\
            style="fill: #000000; stroke: #000000"\
          />\
          <path d="M 20,8 L 25,8" style="fill: none; stroke: #000000; stroke-linejoin: miter" />\
          <path\
            d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.5,26.6 L 22.5,24.5 C 20,18 10.85,14 6.97,19.85 C 4.5,25.5 13,29.5 13,29.5"\
            style="fill: none; stroke: #ffffff"\
          />\
          <path d="M 12.5,30 C 18,27 27,27 32.5,30 M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5 M 12.5,37 C 18,34 27,34 32.5,37" style="fill: none; stroke: #ffffff" />\
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
