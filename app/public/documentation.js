const documentationObject ={
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
        args: ["distance", "wow"]
      },
      run: {
        desc: "Run forever, or for a number of units if specified in parameter",
        smpl: ["shelly.run()", "shelly.run(10)"],
        args: ["distance"]
      },
    },
    variables: ['color', 'state', 'states', 'transform']
  }
}
