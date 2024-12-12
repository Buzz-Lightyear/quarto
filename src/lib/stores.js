// src/lib/stores.js
import { writable, derived } from 'svelte/store';
import { generatePieces, checkWin } from './gameLogic';

function createGameStore() {
  const initialState = {
    board: Array(16).fill(null),
    pieces: generatePieces(),
    selectedPiece: null,  // The piece that must be played
    isPlayerTurn: true,   // True when player needs to place piece
    winner: null,
    gameOver: false
  };

  const { subscribe, set, update } = writable(initialState);

  // Simple computer move - just picks the first available spot
  function makeComputerMove(state) {
    const availableSpots = state.board
      .map((piece, index) => piece === null ? index : -1)
      .filter(index => index !== -1);
    
    if (availableSpots.length === 0) return state;
    
    const randomIndex = Math.floor(Math.random() * availableSpots.length);
    const position = availableSpots[randomIndex];
    
    // Place the piece
    const newBoard = [...state.board];
    newBoard[position] = state.selectedPiece;
    
    // Select a random piece for the player
    const remainingPieces = state.pieces.filter(p => p.id !== state.selectedPiece.id);
    const nextPiece = remainingPieces[Math.floor(Math.random() * remainingPieces.length)];
    
    return {
      ...state,
      board: newBoard,
      pieces: remainingPieces,
      selectedPiece: nextPiece,
      isPlayerTurn: true,
      winner: checkWin(newBoard) ? 'Computer' : null,
      gameOver: checkWin(newBoard) || remainingPieces.length === 0
    };
  }

  return {
    subscribe,
    placePiece: (index) => update(state => {
      if (state.gameOver || !state.selectedPiece || !state.isPlayerTurn || state.board[index]) {
        return state;
      }
      
      // Place player's piece
      const newBoard = [...state.board];
      newBoard[index] = state.selectedPiece;
      
      const remainingPieces = state.pieces.filter(p => p.id !== state.selectedPiece.id);
      
      // Check if player won
      if (checkWin(newBoard)) {
        return {
          ...state,
          board: newBoard,
          pieces: remainingPieces,
          winner: 'Player',
          gameOver: true
        };
      }
      
      // If game isn't over, prepare computer's turn
      if (remainingPieces.length === 0) {
        return {
          ...state,
          board: newBoard,
          pieces: remainingPieces,
          gameOver: true
        };
      }
      
      // Computer's turn
      return makeComputerMove({
        ...state,
        board: newBoard,
        pieces: remainingPieces,
        isPlayerTurn: false
      });
    }),
    reset: () => set(initialState)
  };
}

export const gameStore = createGameStore();

export const gameStatus = derived(gameStore, $game => {
  if ($game.winner) {
    return `${$game.winner} wins!`;
  }
  if ($game.gameOver) {
    return "It's a draw!";
  }
  return $game.isPlayerTurn 
    ? "Your turn - place the highlighted piece" 
    : "Computer is thinking...";
});