<script>
  export let s = 17.73
  let pixels = [];
  $: ss = s*5

  // reactive console -----------------------------------
  import bindConsole from '../lib/bindConsole'
  
  window['grid'] = {
    // maddie was heeerreee
    // todo : migrate to a canvas api to make it faster (this is fine for now)
    // from my testing, this can run a video (56x40) at 30fps (bad apple lol)
    // it also handles screen capture pretty well (yes, doom was played on this)
    // another todo : add my super-cool examples to the docs (maybe in the readme?)
    drawPixel: (x, y, color) => {
      if (typeof x !== 'number' || typeof y !== 'number' || typeof color !== 'string') {
        return 'Invalid arguments'
      }
      pixels = [...pixels, { x, y, color }]
      return `Pixel drawn at ${x}, ${y} with color ${color}`
    },
    clearPixel: (x, y) => {
      if (typeof x !== 'number' || typeof y !== 'number') {
        return 'Invalid arguments'
      }
      pixels = pixels.filter(p => p.x !== x && p.y !== y)
      return `Pixel cleared at ${x}, ${y}`
    },
    clearScreen: () => {
      pixels = []
      return 'Screen cleared'
    },
    writePixels: (sourcePx) => {
      if (!Array.isArray(sourcePx)) {
        return 'Invalid argument'
      }
      if (!sourcePx.every(p => p.hasOwnProperty('x') && p.hasOwnProperty('y') && p.hasOwnProperty('color'))) {
        return 'Invalid pixel format';
      }        
      pixels = sourcePx
      return 'Pixels written'
    }
  }
  bindConsole(window['grid'], 's', s, (v) => {s = v})

  // window['grid'] = {
  //   set s(v) { setWm(wm, this, v) },
  //   get s()  { return wm.get(this).internal },
  // }

  // bindWm(wm, window['grid'], s, (v) => { s = v })

  // window.grid = {
  //   s_: s,
  //   sListener: (val) => {},
  //   set s(val) { this.s_ = val; this.sListener(val); },
  //   get s()    { return this.s_ },
  //   listen: function(listener) { this.sListener = listener }
  // }
  // window.grid.listen((val) => { s = val })
  //-----------------------------------------------------
</script>

<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="smallGrid" width={s} height={s} patternUnits="userSpaceOnUse">
      <path d={`M ${s} 0 L 0 0 0 ${s}`} fill="none" stroke="gray" stroke-width="0.3"/>
    </pattern>
    <pattern id="grid" width={ss} height={ss} patternUnits="userSpaceOnUse" overflow="hidden">
      <rect width={ss} height={ss} fill="url(#smallGrid)"/>
      <path d={`M ${ss} 0 L 0 0 0 ${ss}`} fill="none" stroke="gray" stroke-width="1"/>
      <!-- <circle cx={ss} cy={ss} r="10" fill="grey" /> -->
    </pattern>
  </defs>
      
  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>

<!-- this is pretty slow . todo: canvas api? :3c -->
{#each pixels as { x, y, color }}
  <div
    class="pixel"
    style="
      position: absolute;
      top: {y * ss}px;
      left: {x * ss}px;
      width: {ss}px;
      height: {ss}px;
      background-color: {color};
    "
  />
{/each}

<style>
  svg {
    position: absolute;
    top: 0;
    left: 0;
    overflow: visibile;
  }
</style>
