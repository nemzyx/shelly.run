const sanitizeTransform = (transform) => ({
  scl: transform.scl,
  rot: transform.rot % 360,
  pos: {
    x: transform.pos.x % 100, // currently 100 = 0, not good.
    y: transform.pos.y % 100  // currently 100 = 0, not good.
  }
})

const defaultStates = (animations) => ({
  "hide": {
    msg: 'Shy shelly shell 🐢',
    animation: animations.hide,
    speed: 10
  },
  "idle": {
    msg: 'Shelly is now idle 🐢',
    animation: animations.idle,
    speed: 20
  },
  "walk": {
    msg: 'Walking...',
    animation: animations.walk,
    speed: 90
  },
  "run": {
    msg: 'Running!',
    animation: animations.run,
    speed: 250
  }
})

export { sanitizeTransform, defaultStates }
