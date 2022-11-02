const setWm = (wm, obj, v) => {
  wm.set(obj, Object.assign(wm.get(obj), { internal: v }))
  wm.get(obj).listener(v)
}

const bindWm = (wm, obj, ref, f) => {
  wm.set(obj, {
    listener: () => {},
    listen: function(listener) { this.listener = listener },
    internal: ref,
  })
  wm.get(obj).listen(f)
}

const bindConsole = (obj, str, ref, f) => {
  const wm = new WeakMap()

  const pattern = {
    get()  { return wm.get(this).internal },
    set(v) { setWm(wm, this, v) }
  }

  bindWm(wm, obj, ref, f)
  Object.defineProperty(obj, str, pattern)
}

export default bindConsole
