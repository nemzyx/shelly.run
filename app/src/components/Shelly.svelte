<script>
  import { sanitizeTransform } from '../util/shelly'

  import F0 from '../assets/shelly/shelly-F0.png'
  import F1 from '../assets/shelly/shelly-F1.png'
  import F2 from '../assets/shelly/shelly-F2.png'
  import F3 from '../assets/shelly/shelly-F3.png'
  import F4 from '../assets/shelly/shelly-F4.png'
  import F5 from '../assets/shelly/shelly-F5.png'
  import F6 from '../assets/shelly/shelly-F6.png'
  const hide = [F0]
  const idle = [F6, F5, F5, F5, F5, F5, F5, F5, F5, F6, F5, F5, F5, F5, F5]
  const walk = [F3, F1, F4, F1]
  const run =  [F3, F2, F4, F2]

  let color = 'rgb(160, 78, 122)' // #a04e7a

  $: states = {
    "hide": {
      msg: 'Shy shelly shell 🐢',
      animation: hide,
      speed: 10
    },
    "idle": {
      msg: 'Shelly is now idle 🐢',
      animation: idle,
      speed: 20
    },
    "walk": {
      msg: 'Walking...',
      animation: walk,
      speed: 90
    },
    "run": {
      msg: 'Running!',
      animation: run,
      speed: 250
    }
  }

  $: state = 'idle'
  $: speed = states[state].speed
  $: animation = states[state].animation

  $: transform = {
    pos: { x: 50, y: 50 }, // should be 0, 0, screen / world coords
    rot: 0,
    scl: 1
  }

  let cnt = 0
  $: sprite = animation[cnt]

  const step = () => {
    cnt++
    cnt = cnt % animation.length
  }

  let animate
  $: {
    clearInterval(animate)
    animate = setInterval(step, (100000 / animation.length) / speed)
  }

  // state machine
  $:switch(state) {
    case "run":
      transform.pos.y += 3
      sanitizeTransform(transform)
      break
  }

  const changeState = (newState) => {
    state = newState
    return states[newState].msg
  }

  // public interface --------------------------------------------------------------------
  import bindConsole from '../lib/bindConsole'

  $: {
    window['shelly'] = {
      stay: () => changeState('idle'),
      hide: () => changeState('hide'),
      walk: (dist) => {
        const res = changeState('walk')
        if(!!!dist) return res
        return "Walk for distance" // promise that can be awaited
      },
      run:  () => changeState('run'),
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
    bindConsole(window["shelly"], 'state', state, (v) => { state = v })
    bindConsole(window["shelly"], 'speed', speed, (v) => { speed = v  })
    // bindConsole(window["shelly"], 'states', states, (v) => { states = v })
    bindConsole(window["shelly"], 'transform', transform, (v) => {transform = v })
    bindConsole(window["shelly"], 'animation', animation, (v) => { animation = v })

    window['states'] = states
    const tickSpeed = () => { window["shelly"].speed = states[state].speed }
    bindConsole(window["states"].run, 'speed', states.run.speed, tickSpeed)
    bindConsole(window["states"].walk, 'speed', states.walk.speed, tickSpeed)
    bindConsole(window["states"].idle, 'speed', states.idle.speed, tickSpeed)
    bindConsole(window["states"].hide, 'speed', states.hide.speed, tickSpeed)

    const tickAnim = () => { window["shelly"].animation = states[state].animation }
    bindConsole(window["states"].run, 'animation', states.run.animation, tickAnim)
    bindConsole(window["states"].walk, 'animation', states.walk.animation, tickAnim)
    bindConsole(window["states"].idle, 'animation', states.idle.animation, tickAnim)
    bindConsole(window["states"].hide, 'animation', states.hide.animation, tickAnim)

    const tickTransform = () => {
      window["shelly"].transform = sanitizeTransform(window["shelly"].transform)
    }
    bindConsole(window["shelly"].transform, 'scl', transform.scl, tickTransform)
    bindConsole(window["shelly"].transform, 'rot', transform.rot, tickTransform)
    bindConsole(window["shelly"].transform, 'pos', transform.pos, tickTransform)
    bindConsole(window["shelly"].transform.pos, 'x', transform.pos.x, tickTransform)
    bindConsole(window["shelly"].transform.pos, 'y', transform.pos.y, tickTransform)
  }

  // side effects
  $: if (!!state) {
    window['shelly'].speed = speed
    window['shelly'].animation = animation
  }
  $: if (!!animation) { cnt = 0 }
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
