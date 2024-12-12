<!-- src/components/PieceSelector.svelte -->
<script>
    import { gameStore, gameStatus } from '$lib/stores.js';
    import Piece from './Piece.svelte';
  </script>
  
  <div class="piece-selector">
    <h2>{$gameStatus}</h2>
    
    <div class="pieces-grid">
      <div class="mandatory-piece">
        <h3>Piece you must play:</h3>
        {#if $gameStore.selectedPiece}
          <div class="highlighted-piece">
            <Piece piece={$gameStore.selectedPiece} size="120px" />
          </div>
        {/if}
      </div>
      
      <div class="available-pieces">
        <h3>Remaining pieces:</h3>
        <div class="grid">
          {#each $gameStore.pieces.filter(p => p.id !== $gameStore.selectedPiece?.id) as piece}
            <Piece {piece} size="80px" />
          {/each}
        </div>
      </div>
    </div>
  </div>
  
  <style>
    .piece-selector {
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
      min-width: 450px;
    }
  
    h2 {
      margin: 0 0 20px 0;
      font-size: 1.2rem;
      color: #495057;
      text-align: center;
    }
  
    h3 {
      margin: 0 0 16px 0;
      font-size: 1rem;
      color: #666;
    }
  
    .pieces-grid {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  
    .mandatory-piece {
      text-align: center;
    }
  
    .highlighted-piece {
      display: inline-block;
      padding: 16px;
      background-color: #fff3bf;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  
    .available-pieces {
      border-top: 1px solid #dee2e6;
      padding-top: 20px;
    }
  
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      padding: 0 12px;
    }
  </style>