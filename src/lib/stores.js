// src/lib/stores.js
import { writable, derived } from 'svelte/store';
import { generatePieces, checkWin } from './gameLogic';

function createGameStore() {
  // Generate initial pieces
  const pieces = generatePieces();
  
  const initialState = {
    board: Array(16).fill(null),
    pieces: pieces.slice(1), // All pieces except the first one
    selectedPiece: pieces[0], // Start with the first piece selected
    isPlayerTurn: true,
    winner: null,
    gameOver: false
  };

  const { subscribe, set, update } = writable(initialState);

  // Rest of the store logic remains the same
  function makeComputerMove(state) {
    const availableSpots = state.board
      .map((piece, index) => piece === null ? index : -1)
      .filter(index => index !== -1);
    
    if (availableSpots.length === 0) return state;
    
    const randomIndex = Math.floor(Math.random() * availableSpots.length);
    const position = availableSpots[randomIndex];
    
    const newBoard = [...state.board];
    newBoard[position] = state.selectedPiece;
    
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
      
      const newBoard = [...state.board];
      newBoard[index] = state.selectedPiece;
      
      const remainingPieces = state.pieces.filter(p => p.id !== state.selectedPiece.id);
      
      if (checkWin(newBoard)) {
        return {
          ...state,
          board: newBoard,
          pieces: remainingPieces,
          winner: 'Player',
          gameOver: true
        };
      }
      
      if (remainingPieces.length === 0) {
        return {
          ...state,
          board: newBoard,
          pieces: remainingPieces,
          gameOver: true
        };
      }
      
      return makeComputerMove({
        ...state,
        board: newBoard,
        pieces: remainingPieces,
        isPlayerTurn: false
      });
    }),
    reset: () => {
      const pieces = generatePieces();
      set({
        board: Array(16).fill(null),
        pieces: pieces.slice(1),
        selectedPiece: pieces[0],
        isPlayerTurn: true,
        winner: null,
        gameOver: false
      });
    }
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