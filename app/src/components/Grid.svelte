<script>
  export let s = 17.73;
  export let pixels = [];
  $: ss = s * 5;

  // reactive console -----------------------------------
  import bindConsole from "../lib/bindConsole";

  window["grid"] = {};
  bindConsole(window["grid"], "s", s, (v) => {
    s = v;
  });

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
      <path
        d={`M ${s} 0 L 0 0 0 ${s}`}
        fill="none"
        stroke="gray"
        stroke-width="0.3"
      />
    </pattern>
    <pattern
      id="grid"
      width={ss}
      height={ss}
      patternUnits="userSpaceOnUse"
      overflow="hidden"
    >
      <rect width={ss} height={ss} fill="url(#smallGrid)" />
      <path
        d={`M ${ss} 0 L 0 0 0 ${ss}`}
        fill="none"
        stroke="gray"
        stroke-width="1"
      />
      <!-- <circle cx={ss} cy={ss} r="10" fill="grey" /> -->
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>

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
