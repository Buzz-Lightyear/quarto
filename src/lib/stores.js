// src/lib/stores.js
import { writable, derived } from 'svelte/store';
import { generatePieces, checkWin } from './gameLogic';

function createGameStore() {
  const pieces = generatePieces();
  
  const initialState = {
    board: Array(16).fill(null),
    pieces: pieces.slice(1), // All pieces except the first one
    selectedPiece: pieces[0], // Start with the first piece selected
    isPlayerTurn: true,
    waitingForPieceSelection: false, // True when player needs to select piece for computer
    winner: null,
    gameOver: false
  };

  const { subscribe, set, update } = writable(initialState);

  function makeComputerMove(state) {
    const availableSpots = state.board
      .map((piece, index) => piece === null ? index : -1)
      .filter(index => index !== -1);
    
    if (availableSpots.length === 0) return state;
    
    // Computer makes a random move
    const position = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    const newBoard = [...state.board];
    newBoard[position] = state.selectedPiece;
    
    const remainingPieces = state.pieces.filter(p => p.id !== state.selectedPiece.id);
    
    // Check if computer won
    if (checkWin(newBoard)) {
      return {
        ...state,
        board: newBoard,
        pieces: remainingPieces,
        selectedPiece: null,
        winner: 'Computer',
        gameOver: true
      };
    }

    // If there are no more pieces, game is a draw
    if (remainingPieces.length === 0) {
      return {
        ...state,
        board: newBoard,
        pieces: remainingPieces,
        selectedPiece: null,
        gameOver: true
      };
    }

    // Computer chooses a piece for the player
    const nextPiece = remainingPieces[Math.floor(Math.random() * remainingPieces.length)];
    const newPieces = remainingPieces.filter(p => p.id !== nextPiece.id);
    
    return {
      ...state,
      board: newBoard,
      pieces: newPieces,
      selectedPiece: nextPiece,
      isPlayerTurn: true,
      waitingForPieceSelection: false
    };
  }

  return {
    subscribe,
    // Player places a piece
    placePiece: (index) => update(state => {
      if (state.gameOver || !state.selectedPiece || !state.isPlayerTurn || state.board[index]) {
        return state;
      }
      
      const newBoard = [...state.board];
      newBoard[index] = state.selectedPiece;
      
      const remainingPieces = state.pieces.filter(p => p.id !== state.selectedPiece.id);
      
      // Check if player won
      if (checkWin(newBoard)) {
        return {
          ...state,
          board: newBoard,
          pieces: remainingPieces,
          selectedPiece: null,
          winner: 'Player',
          gameOver: true
        };
      }
      
      // If there are no more pieces, game is a draw
      if (remainingPieces.length === 0) {
        return {
          ...state,
          board: newBoard,
          pieces: remainingPieces,
          selectedPiece: null,
          gameOver: true
        };
      }
      
      // After player's move, they need to select a piece for the computer
      return {
        ...state,
        board: newBoard,
        pieces: remainingPieces,
        selectedPiece: null,
        isPlayerTurn: false,
        waitingForPieceSelection: true
      };
    }),
    
    // Player selects a piece for the computer
    selectPieceForOpponent: (piece) => update(state => {
      if (!state.waitingForPieceSelection) return state;
      
      // Computer's turn with the selected piece
      return makeComputerMove({
        ...state,
        selectedPiece: piece,
        pieces: state.pieces.filter(p => p.id !== piece.id),
        waitingForPieceSelection: false
      });
    }),
    
    reset: () => {
      const pieces = generatePieces();
      set({
        board: Array(16).fill(null),
        pieces: pieces.slice(1),
        selectedPiece: pieces[0],
        isPlayerTurn: true,
        waitingForPieceSelection: false,
        winner: null,
        gameOver: false
      });
    }
  };
}

export const gameStore = createGameStore();

export const gameStatus = derived(gameStore, $game => {
  if ($game.winner) {
    const winner = $game.winner === "Player" ? "You" : "Computer";
    return `${winner} wins!`;
  }
  if ($game.gameOver) {
    return "It's a draw!";
  }
  if ($game.waitingForPieceSelection) {
    return "Select a piece for the computer to play";
  }
  return "Your turn - place the highlighted piece";
});