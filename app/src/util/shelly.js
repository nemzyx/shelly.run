const sanitizeTransform = (transform) => {
  const { x, y } = transform.pos
  return {
    scl: transform.scl,
    rot: transform.rot % 360,
    pos: {
      x: x < 0 ? 100 : x % 100,
      y: y < 0 ? 100 : y % 100
    }
  }
}

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
