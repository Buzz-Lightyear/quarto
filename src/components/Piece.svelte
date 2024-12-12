<!-- src/components/Piece.svelte -->
<script>
  export let piece = null;
  export let size = "60px";
  export let selectable = false;
  export let selected = false;
</script>

<div
  class="piece"
  class:selectable
  class:selected
  style="width: {size}; height: {size};"
  on:click
>
  {#if piece}
    <div
      class="piece-inner"
      class:tall={piece.height === 'tall'}
      class:short={piece.height === 'short'}
      class:red={piece.color === 'red'}
      class:blue={piece.color === 'blue'}
      class:square={piece.shape === 'square'}
      class:circular={piece.shape === 'circular'}
      class:hollow={piece.top === 'hollow'}
      class:solid={piece.top === 'solid'}
    />
  {/if}
</div>

<style>
  .piece {
    border: 2px solid #ccc;
    border-radius: 4px;
    padding: 4px;
    box-sizing: border-box;
    cursor: default;
  }

  .selectable {
    cursor: pointer;
  }

  .selectable:hover {
    background-color: #f0f0f0;
  }

  .selected {
    background-color: #e0e0e0;
    border-color: #666;
  }

  .piece-inner {
    width: 100%;
    height: 100%;
    transition: all 0.2s ease;
  }

  .tall {
    height: 90%;
  }

  .short {
    height: 60%;
  }

  .red {
    background-color: #ff6b6b;
  }

  .blue {
    background-color: #4dabf7;
  }

  .square {
    border-radius: 0;
  }

  .circular {
    border-radius: 50%;
  }

  .hollow {
    border: 3px solid currentColor;
    background-color: transparent !important;
  }

  .solid {
    border:none;
  }
</style>