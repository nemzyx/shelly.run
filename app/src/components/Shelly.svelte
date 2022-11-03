<script>
  import F0 from '../assets/shelly/shelly-F0.png'
  import F1 from '../assets/shelly/shelly-F1.png'
  import F2 from '../assets/shelly/shelly-F2.png'
  import F3 from '../assets/shelly/shelly-F3.png'
  import F4 from '../assets/shelly/shelly-F4.png'
  const hide = [F0]
  const idle = [F1]
  const walk = [F1, F3, F1, F4]
  const run =  [F2, F3, F2, F4]

  let color = 'rgb(160, 78, 122)' // #a04e7a

  let states = {
    "hide": {
      key: "hide",
      msg: 'Shy shelly shell 🐢',
      animation: hide,
      speed: 0
    },
    "idle": {
      key: "idle",
      msg: 'Shelly is now idle 🐢',
      animation: idle,
      speed: 0
    },
    "walk": {
      key: "walk",
      msg: 'Walking...',
      animation: walk,
      speed: 90
    },
    "run": {
      key: "run",
      msg: 'Running!',
      animation: run,
      speed: 250
    }
  }

  let state = states["idle"]

  $: transform = {
    pos: { x: 50, y: 50 }, // should be 0, 0, screen / world coords
    rot: 0,
    scl: 1
  }

  let cnt = 0
  $: sprite = state["animation"][cnt]

  const step = () => {
    cnt++
    cnt = cnt % state["animation"].length
  }

  let animate
  $: {
    clearInterval(animate)
    animate = setInterval(step, (100000 / state["animation"].length) / state["speed"])
  }

  // state machine
  import { sanitizeTransform } from '../util/shelly'
  let lastKey = state.key
  $: if (!!state.key) {
    if(state.key !== lastKey) { // state *actually* changed

      console.log('UPDATE STATE MACHINE')
      switch(state.key) {
        case "run":
          transform.pos.y += 3
          sanitizeTransform(transform)
          break
      }

    }
    lastKey = state.key // update previous key
  }

  // public interface --------------------------------------------------------------------
  import bindConsole from '../lib/bindConsole'

  $: {
    window['shelly'] = {
      stay: () => (state = states["idle"]).msg,
      hide: () => (state = states["hide"]).msg,
      walk: (dist) => {
        const res = (state = states["walk"]).msg
        if(!!!dist) return res
        return "Walk for distance" // promise that can be awaited
      },
      run:  () => (state = states["run"]).msg,
      // run:  () => { // run in current direction based on transform
      //   setInterval(() => {
      //     transform.pos.y += 1
      //     transform.pos.y %= 100
      //   },70)
      //   return (state = states["run"]).msg
      // },
      // turn: () => setInterval(() => { // conditional on walking / running
      //   transform.rot += 1
      //   transform.rot = transform.rot % 360
      // }, 30),
    }

    // reative console
    bindConsole(window["shelly"], 'color', color, (v) => { color = v })
    bindConsole(window["shelly"], 'state', state, (v) => {
      state = v
      states[state.key] = v
    })
    bindConsole(window["shelly"], 'states', states, (v) => {
      states = v
      state = states[state.key]
    })
    bindConsole(window["shelly"], 'transform', transform, (v) => {transform = v })

    const tickState = () => { window["shelly"].state = state }
    bindConsole(window["shelly"].state, 'key', state.key, tickState)
    bindConsole(window["shelly"].state, 'msg', state.msg, tickState)
    bindConsole(window["shelly"].state, 'speed', state.speed, tickState)
    bindConsole(window["shelly"].state, 'animation', state.animation, tickState)

    const tickTransform = async () => {
      window["shelly"].transform = sanitizeTransform(window["shelly"].transform)
    }
    bindConsole(window["shelly"].transform, 'scl', transform.scl, tickTransform)
    bindConsole(window["shelly"].transform, 'rot', transform.rot, tickTransform)
    bindConsole(window["shelly"].transform, 'pos', transform.pos, tickTransform)
    bindConsole(window["shelly"].transform.pos, 'x', transform.pos.x, tickTransform)
    bindConsole(window["shelly"].transform.pos, 'y', transform.pos.y, tickTransform)
  }
</script>

<div
  id="shelly"
  style={`
    top: ${transform.pos.y}%;
    left: ${transform.pos.x}%;
    height: ${80*transform.scl}px;
    transform: rotate(${transform.rot}deg);
  `}
>
  <div class="child" id="color" style={`
    background-color: ${color};
    width: ${80*transform.scl}px;
    height: ${80*transform.scl}px;
  `} />
  <img class="child" src={sprite} alt="shelly" />
</div>

<style>
  #shelly {
    position: absolute;
    transform-origin: 50% 50%;
  }
  #shelly #color {
    /* background-color: #765dff; */
    /* background-color: #a04e7a; */
    border-radius: 50%;
    transform: translate(-50%, -60%) scale(0.5, 0.6);
  }
  
  .child {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    transform: translate(-50%, -50%);
  }
  
  img {
    image-rendering: pixelated;
  }  
</style>
