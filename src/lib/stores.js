// src/lib/stores.js
import { writable, derived } from 'svelte/store';
import { generatePieces, checkWin } from './gameLogic';

function createGameStore() {
  const initialState = {
    board: Array(16).fill(null),
    pieces: generatePieces(),
    selectedPiece: null,
    currentPlayer: 1,
    winner: null,
    gameOver: false
  };

  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    selectPiece: (piece) => update(state => {
      if (state.gameOver) return state;
      return { ...state, selectedPiece: piece };
    }),
    placePiece: (index) => update(state => {
      if (state.gameOver || !state.selectedPiece || state.board[index]) return state;
      
      const newBoard = [...state.board];
      newBoard[index] = state.selectedPiece;
      
      const winResult = checkWin(newBoard);
      const remainingPieces = state.pieces.filter(p => p.id !== state.selectedPiece.id);
      
      return {
        ...state,
        board: newBoard,
        pieces: remainingPieces,
        selectedPiece: null,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        winner: winResult ? state.currentPlayer : null,
        gameOver: winResult || remainingPieces.length === 0
      };
    }),
    reset: () => set(initialState)
  };
}

export const gameStore = createGameStore();

export const gameStatus = derived(gameStore, $game => {
  if ($game.winner) {
    return `Player ${$game.winner} wins!`;
  }
  if ($game.gameOver) {
    return "It's a draw!";
  }
  return `Player ${$game.currentPlayer}'s turn${$game.selectedPiece ? ' to place piece' : ' to select piece'}`;
});