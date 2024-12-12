// src/lib/gameLogic.js

// Piece attributes and their possible values
export const ATTRIBUTES = {
    height: ['tall', 'short'],
    color: ['red', 'blue'],
    shape: ['square', 'circular'],
    top: ['hollow', 'solid']
  };
  
  // Generate all possible pieces
  export function generatePieces() {
    const pieces = [];
    for (let height of ATTRIBUTES.height) {
      for (let color of ATTRIBUTES.color) {
        for (let shape of ATTRIBUTES.shape) {
          for (let top of ATTRIBUTES.top) {
            pieces.push({ height, color, shape, top, id: pieces.length });
          }
        }
      }
    }
    return pieces;
  }
  
  // Check if four pieces share any attribute
  export function checkWinningLine(pieces) {
    if (pieces.length !== 4) return false;
    
    for (const attr of Object.keys(ATTRIBUTES)) {
      const value = pieces[0][attr];
      if (pieces.every(piece => piece[attr] === value)) {
        return { winning: true, attribute: attr, value };
      }
    }
    return false;
  }
  
  // Check for winning conditions on the board
  export function checkWin(board) {
    // Check rows
    for (let row = 0; row < 4; row++) {
      const pieces = board.slice(row * 4, (row + 1) * 4).filter(p => p);
      if (pieces.length === 4) {
        const result = checkWinningLine(pieces);
        if (result) return { ...result, type: 'row', index: row };
      }
    }
  
    // Check columns
    for (let col = 0; col < 4; col++) {
      const pieces = [
        board[col],
        board[col + 4],
        board[col + 8],
        board[col + 12]
      ].filter(p => p);
      if (pieces.length === 4) {
        const result = checkWinningLine(pieces);
        if (result) return { ...result, type: 'column', index: col };
      }
    }
  
    // Check diagonals
    const diagonal1 = [board[0], board[5], board[10], board[15]].filter(p => p);
    const diagonal2 = [board[3], board[6], board[9], board[12]].filter(p => p);
    
    if (diagonal1.length === 4) {
      const result = checkWinningLine(diagonal1);
      if (result) return { ...result, type: 'diagonal', index: 1 };
    }
    
    if (diagonal2.length === 4) {
      const result = checkWinningLine(diagonal2);
      if (result) return { ...result, type: 'diagonal', index: 2 };
    }
  
    return false;
  }