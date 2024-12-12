<script>
    import { gameStore } from '$lib/stores.js';
    import Piece from './Piece.svelte';

    function handlePlace(index) {
        gameStore.placePiece(index);
    }
</script>

<div class="board">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    {#each $gameStore.board as piece, index}
        <div
            class="cell"
            on:click={() => $gameStore.selectedPiece && handlePlace(index)}
            class:available={$gameStore.selectedPiece && !piece}
        >
            <Piece {piece} />
        </div>
        
    {/each}
</div>

<style>
    .board {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        padding: 8px;
        background-color: #f8f9fa;
        border-radius: 8px;
        width: fit-content;
    }

    .cell {
        background-color: white;
        border-radius: 4px;
        transition: background-color 0.2s;
    }

    .available {
        cursor: pointer;
    }

    .available:hover {
        background-color: #e9ecef;
    }
</style>