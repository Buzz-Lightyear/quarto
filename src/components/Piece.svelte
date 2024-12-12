<!-- src/components/Piece.svelte -->
<script>
  export let piece = null;
  export let size = "80px";
  export let selectable = false;
  export let selected = false;

  $: sizeNum = parseInt(size);
  $: height = piece?.height === 'tall' ? sizeNum * 0.8 : sizeNum * 0.4;
  $: fillColor = piece ? (piece.color === 'red' ? '#ff6b6b' : '#4dabf7') : 'transparent';
  
  // Define stroke colors based on piece color
  $: strokeColor = piece?.color === 'red' ? '#d63939' : '#228be6';
  
  // For hollow pieces, we'll use different gradients
  $: isHollow = piece?.top === 'hollow';
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
      <defs>
        <!-- Gradient for solid pieces -->
        <linearGradient id="solidGradient-{piece.color}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:{strokeColor};stop-opacity:1"/>
          <stop offset="50%" style="stop-color:{fillColor};stop-opacity:1"/>
          <stop offset="100%" style="stop-color:{strokeColor};stop-opacity:1"/>
        </linearGradient>
        <!-- Gradient for hollow pieces -->
        <linearGradient id="hollowGradient-{piece.color}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:{strokeColor};stop-opacity:0.3"/>
          <stop offset="50%" style="stop-color:{fillColor};stop-opacity:0.3"/>
          <stop offset="100%" style="stop-color:{strokeColor};stop-opacity:0.3"/>
        </linearGradient>
      </defs>

      {#if piece.shape === 'circular'}
        <!-- Shadow -->
        <ellipse
          cx="50"
          cy="82"
          rx="25"
          ry="10"
          fill="#000000"
          opacity="0.1"
        />
        
        {#if isHollow}
          <!-- Inner cylinder for hollow pieces -->
          <path
            d="M30,80 
               C30,80 30,{80-height+5} 30,{80-height+5}
               C30,{80-height+2} 38,{80-height-3} 50,{80-height-3}
               C62,{80-height-3} 70,{80-height+2} 70,{80-height+5}
               C70,{80-height+5} 70,80 70,80
               C70,83 62,88 50,88
               C38,88 30,83 30,80 Z"
            fill="url(#hollowGradient-{piece.color})"
            stroke={strokeColor}
            stroke-width="1"
          />
          <ellipse
            cx="50"
            cy={80-height+5}
            rx="20"
            ry="7"
            fill="url(#hollowGradient-{piece.color})"
            stroke={strokeColor}
            stroke-width="1"
          />
        {/if}
        
        <!-- Main cylinder outline -->
        <path
          d="M25,80 
             C25,80 25,{80-height} 25,{80-height}
             C25,{80-height-3} 35,{80-height-8} 50,{80-height-8}
             C65,{80-height-8} 75,{80-height-3} 75,{80-height}
             C75,{80-height} 75,80 75,80
             C75,83 65,88 50,88
             C35,88 25,83 25,80 Z"
          fill="none"
          stroke={strokeColor}
          stroke-width="2"
        />
        
        <!-- Top rim -->
        <ellipse
          cx="50"
          cy={80-height}
          rx="25"
          ry="8"
          fill="none"
          stroke={strokeColor}
          stroke-width="2"
        />
        
      {:else}
        <!-- Square piece with similar hollow/solid treatment -->
        {#if isHollow}
          <!-- Inner square for hollow pieces -->
          <path
            d={`M35,75 l0,-${height-10} l30,0 l0,${height-10} Z`}
            fill={fillColor}
            opacity="0.3"
            stroke={strokeColor}
            stroke-width="1"
          />
          <path
            d={`M35,${75 - height + 10} l15,-7 l30,0 l-15,7 Z`}
            fill={fillColor}
            opacity="0.3"
            stroke={strokeColor}
            stroke-width="1"
          />
        {/if}
        
        <!-- Outer square (unchanged structure, updated colors) -->
        <path
          d={`M30,80 l0,-${height} l40,0 l0,${height} Z`}
          fill="none"
          stroke={strokeColor}
          stroke-width="2"
        />
        <path
          d={`M30,${80 - height} l20,-10 l40,0 l-20,10 Z`}
          fill="none"
          stroke={strokeColor}
          stroke-width="2"
        />
        <path
          d={`M70,80 l20,-10 l0,-${height} l-20,10 Z`}
          fill="none"
          stroke={strokeColor}
          stroke-width="2"
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