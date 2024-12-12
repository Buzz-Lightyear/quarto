<!-- src/components/Piece.svelte -->
<script>
  export let piece = null;
  export let size = "80px";
  export let selectable = false;
  export let selected = false;

  $: sizeNum = parseInt(size);
  $: height = piece?.height === 'tall' ? sizeNum * 0.8 : sizeNum * 0.4;
  $: fillColor = piece ? (piece.color === 'red' ? '#ff6b6b' : '#4dabf7') : 'transparent';
  $: opacity = piece?.top === 'hollow' ? '0.4' : '0.9';
  
  // Calculate cylinder side curve points
  function getCylinderPath(baseY, pieceHeight) {
    const centerX = 50;
    const radiusX = 20;
    const radiusY = 8;
    
    // Create smooth curve for cylinder sides
    const curve1 = `C${centerX-radiusX},${baseY-radiusY} ${centerX-radiusX},${baseY-pieceHeight+radiusY} ${centerX},${baseY-pieceHeight}`;
    const curve2 = `C${centerX+radiusX},${baseY-pieceHeight+radiusY} ${centerX+radiusX},${baseY-radiusY} ${centerX},${baseY}`;
    
    return `M${centerX},${baseY} ${curve1} ${curve2}`;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="piece-container"
  class:selectable
  class:selected
  style="width: {size}; height: {size};"
  on:click
>
  {#if piece}
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      class="piece-svg"
    >
      <!-- If piece is circular -->
      {#if piece.shape === 'circular'}
        <!-- Bottom ellipse shadow -->
        <ellipse
          cx="50"
          cy="80"
          rx="20"
          ry="8"
          fill="#ddd"
          opacity="0.3"
        />
        <!-- Main cylinder body -->
        <path
          d={getCylinderPath(80, height)}
          fill={fillColor}
          opacity={opacity}
          class="main-body"
        />
        <!-- Top ellipse -->
        <ellipse
          cx="50"
          cy={80 - height}
          rx="20"
          ry="8"
          fill={fillColor}
          opacity={opacity}
          class="top"
        />
        <!-- Outer strokes -->
        <path
          d={getCylinderPath(80, height)}
          fill="none"
          stroke="#333"
          stroke-width="1"
        />
        <ellipse
          cx="50"
          cy={80 - height}
          rx="20"
          ry="8"
          fill="none"
          stroke="#333"
          stroke-width="1"
        />
      {:else}
        <!-- Square piece (unchanged) -->
        <path
          d={`M30,80 l0,-${height} l40,0 l0,${height} Z`}
          fill={fillColor}
          opacity={opacity}
          class="front"
        />
        <path
          d={`M30,${80 - height} l20,-10 l40,0 l-20,10 Z`}
          fill={fillColor}
          opacity={opacity}
          class="top"
        />
        <path
          d={`M70,80 l20,-10 l0,-${height} l-20,10 Z`}
          fill={fillColor}
          opacity={opacity * 0.8}
          class="side"
        />
        <path
          d={`M30,80 l0,-${height} l40,0 l20,-10 l0,${height} l-20,10 Z`}
          fill="none"
          stroke="#333"
          stroke-width="1"
        />
        <path
          d={`M30,${80 - height} l20,-10 l40,0`}
          fill="none"
          stroke="#333"
          stroke-width="1"
        />
      {/if}
    </svg>
  {/if}
</div>

<style>
  .piece-container {
    border: 2px solid #ccc;
    border-radius: 4px;
    padding: 4px;
    box-sizing: border-box;
    cursor: default;
    background-color: white;
  }

  .piece-svg {
    width: 100%;
    height: 100%;
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
</style>