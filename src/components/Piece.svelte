<!-- src/components/Piece.svelte -->
<script>
  export let piece = null;
  export let size = "80px";
  export let selectable = false;
  export let selected = false;

  $: sizeNum = parseInt(size);
  $: height = piece?.height === 'tall' ? sizeNum * 0.8 : sizeNum * 0.4;
  
  // Declare variables before using them in reactive statements
  let fillColor, strokeColor;
  
  // Lighter fills, darker strokes for better visibility
  $: {
    if (piece?.color === 'red') {
      fillColor = '#ffa8a8';  // Light red fill
      strokeColor = '#f03e3e'; // Darker red stroke
    } else if (piece?.color === 'blue') {
      fillColor = '#74c0fc';  // Light blue fill
      strokeColor = '#1c7ed6'; // Darker blue stroke
    } else {
      fillColor = 'transparent';
      strokeColor = 'transparent';
    }
  }
  
  $: isHollow = piece?.top === 'hollow';

  function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.currentTarget.click();
    }
  }
</script>

<div
  class="piece-container"
  class:selectable
  class:selected
  style="width: {size}; height: {size};"
  on:click
  on:keydown={handleKeyPress}
  role={selectable ? 'button' : 'presentation'}
  tabindex={selectable ? 0 : -1}
>
  {#if piece}
    <svg
      viewBox="0 0 100 120"
      preserveAspectRatio="xMidYMid meet"
      class="piece-svg"
    >
      {#if piece.shape === 'circular'}
        <!-- Shadow -->
        <ellipse
          cx="50"
          cy="90"
          rx="25"
          ry="10"
          fill="#000000"
          opacity="0.1"
        />
        
        <!-- Main cylinder body -->
        <path
          d="M25,85 
             C25,85 25,{85-height} 25,{85-height}
             C25,{85-height-3} 35,{85-height-8} 50,{85-height-8}
             C65,{85-height-8} 75,{85-height-3} 75,{85-height}
             C75,{85-height} 75,85 75,85
             C75,88 65,93 50,93
             C35,93 25,88 25,85 Z"
          fill={isHollow ? 'none' : fillColor}
          stroke={strokeColor}
          stroke-width="2"
        />
        
        <!-- Top circle -->
        <ellipse
          cx="50"
          cy={85-height}
          rx="25"
          ry="8"
          fill={isHollow ? 'none' : fillColor}
          stroke={strokeColor}
          stroke-width="2"
        />
        
      {:else}
        <!-- Square piece -->
        <!-- Front face -->
        <path
          d="M35,85 
             l0,-{height} 
             l30,0 
             l0,{height} 
             Z"
          fill={isHollow ? 'none' : fillColor}
          stroke={strokeColor}
          stroke-width="2"
        />
        <!-- Top face -->
        <path
          d="M35,{85-height} 
             l15,-8 
             l30,0 
             l-15,8 
             Z"
          fill={isHollow ? 'none' : fillColor}
          stroke={strokeColor}
          stroke-width="2"
        />
        <!-- Right side -->
        <path
          d="M65,85 
             l15,-8 
             l0,-{height} 
             l-15,8 
             Z"
          fill={isHollow ? 'none' : fillColor}
          stroke={strokeColor}
          stroke-width="2"
        />
      {/if}
    </svg>
  {/if}
</div>

<style>
  .piece-container {
    display: flex;
    align-items: center;
    justify-content: center;
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
  }
</style>