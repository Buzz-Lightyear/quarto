<!-- src/components/PieceSelector.svelte -->
<script>
    import { gameStore, gameStatus } from '$lib/stores.js';
    import Piece from './Piece.svelte';
  
    function selectPieceForOpponent(piece) {
      if ($gameStore.waitingForPieceSelection) {
        gameStore.selectPieceForOpponent(piece);
      }
    }
  </script>
  
  <div class="piece-selector">
    <h2>{$gameStatus}</h2>
    
    <div class="pieces-grid">
      {#if $gameStore.selectedPiece}
        <div class="mandatory-piece">
          <h3>Piece you must play:</h3>
          <div class="highlighted-piece">
            <div class="piece-wrapper">
              <Piece piece={$gameStore.selectedPiece} size="90px" />
            </div>
          </div>
        </div>
      {:else if $gameStore.waitingForPieceSelection}
        <div class="selection-needed">
          <h3>Select a piece for the computer to use:</h3>
        </div>
      {/if}
      
      <div class="available-pieces">
        <h3>Available pieces:</h3>
        <div class="grid">
          {#each $gameStore.pieces as piece}
            <div 
              class="piece-wrapper" 
              class:selectable={$gameStore.waitingForPieceSelection}
            >
              <Piece 
                piece={piece} 
                size="65px"
                selectable={$gameStore.waitingForPieceSelection}
                on:click={() => selectPieceForOpponent(piece)}
              />
            </div>
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
      width: 450px;
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
      gap: 24px;
    }
  
    .mandatory-piece {
      text-align: center;
    }
  
    .highlighted-piece {
      display: inline-block;
      padding: 12px;
      background-color: #fff3bf;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }
  
    .piece-wrapper {
      height: 120px; /* Increased height to accommodate tall pieces */
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .selection-needed {
      text-align: center;
      padding: 12px;
      background-color: #e7f5ff;
      border-radius: 8px;
    }
  
    .available-pieces {
      border-top: 1px solid #dee2e6;
      padding-top: 20px;
    }
  
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      padding: 0 8px;
    }
  
    .selectable {
      cursor: pointer;
    }
  
    .selectable:hover {
      background-color: #fff3bf;
      border-radius: 4px;
    }
  </style>