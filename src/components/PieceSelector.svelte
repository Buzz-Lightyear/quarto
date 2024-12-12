<!-- src/components/PieceSelector.svelte -->
<script>
    import { gameStore, gameStatus } from '$lib/stores.js';
    import Piece from './Piece.svelte';
  
    function handleSelect(piece) {
      if ($gameStore.selectedPiece?.id === piece.id) {
        return;
      }
      gameStore.selectPiece(piece);
    }
  </script>
  
  <div class="piece-selector">
    <h2>{$gameStatus}</h2>
    
    <div class="pieces-grid">
      {#each $gameStore.pieces as piece}
        <Piece
          {piece}
          selectable={$gameStore.currentPlayer === 2}
          selected={$gameStore.selectedPiece?.id === piece.id}
          on:click={() => handleSelect(piece)}
        />
      {/each}
    </div>
  </div>
  
  <style>
    .piece-selector {
      padding: 16px;
      background-color: #f8f9fa;
      border-radius: 8px;
      max-width: 400px;
    }
  
    h2 {
      margin: 0 0 16px 0;
      font-size: 1.2rem;
      color: #495057;
      text-align: center;
    }
  
    .pieces-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
  </style>