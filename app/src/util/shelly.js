const sanitizeTransform = (transform) => ({
  scl: transform.scl,
  rot: transform.rot % 360,
  pos: {
    x: transform.pos.x % 100, // currently 100 = 0, not good.
    y: transform.pos.y % 100  // currently 100 = 0, not good.
  }
})

export { sanitizeTransform }
