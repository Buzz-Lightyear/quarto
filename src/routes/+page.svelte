<!-- src/routes/+page.svelte -->
<script>
    import { gameStore } from '$lib/stores.js';
    import Board from '../components/Board.svelte';
    import PieceSelector from '../components/PieceSelector.svelte';
  </script>
  
  <main>
    <h1>Quarto</h1>
    
    <div class="instructions">
      <p>Instructions: TBD</p>
    </div>
    
    <div class="game-container">
      <Board />
      <PieceSelector />
    </div>
  
    {#if $gameStore.gameOver}
      <button class="reset-button" on:click={() => gameStore.reset()}>
        New Game
      </button>
    {/if}
  </main>
  
  <style>
    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }
  
    h1 {
      color: #212529;
      margin-bottom: 16px;
    }
  
    .instructions {
      max-width: 600px;
      margin: 0 auto 32px;
      padding: 12px;
      background-color: #e7f5ff;
      border-radius: 8px;
    }
  
    .instructions p {
      margin: 0;
      color: #1864ab;
    }
  
    .game-container {
      display: flex;
      gap: 32px;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;
    }
  
    .reset-button {
      margin-top: 24px;
      padding: 12px 24px;
      font-size: 1.1rem;
      background-color: #4dabf7;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
  
    .reset-button:hover {
      background-color: #339af0;
    }
  </style>