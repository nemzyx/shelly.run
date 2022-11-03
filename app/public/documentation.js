const documentationObject = (() => {
  return {
    shelly: {
      functions: {
        stay: {
          desc: "Put shelly into idle state, stop movement etc.",
          smpl: ["shelly.stay()"],
          args: []
        },
        hide: {
          desc: "Make shelly hide away in shell. Cute but useless.",
          smpl: ["shelly.hide()"],
          args: []
        },
        walk: {
          desc: "Walk forever, or for a number of units if specified in parameter",
          smpl: ["shelly.walk()", "shelly.walk(10)"],
          args: ["distance"]
        },
        run: {
          desc: "Run forever, or for a number of units if specified in parameter",
          smpl: ["shelly.run()", "shelly.run(10)"],
          args: ["distance"]
        },
      },
      // to do: better variables documentation,
      // with beautiful output, eg. images show their source in browser
      // Should only show current state of object
      variables: ['color', 'speed', 'animation', 'state', 'transform']
      // nice to have: deep variables:
      // variables: ['color', 'speed', 'animation', 'state', {
      //   'transform': ['scl', 'rot', {'pos': ['x', 'y']} ]
      // }]
    },
    states: {
      functions: {
        reset: {
          desc: "If you modified the states object, this will get you back to default",
          smpl: ["states.reset()"],
          args: []
        }
      },
      variables: ['hide', 'idle', 'walk', 'run']
    }
  }
})()
