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
    },
    grid: {
      functions: {
        drawPixel: {
          desc: "Draws a pixel on the grid. Color can be a color name, hex or RGB value",
          smpl: ["grid.drawPixel(0, 0, \"black\")"],
          args: ["x", "y", "color"]
        },
        clearPixel: {
          desc: "Clears a pixel on the grid",
          smpl: ["grid.clearPixel(0, 0)"],
          args: ["x", "y"]
        },
        writePixels: {
          desc: "Write an array of pixels to the grid. Faster than running drawPixel multiple times",
          smpl: [`grid.writePixels([{ x: 0, y: 0, color: "red" }, { x: 1, y: 0, color: "rgb(0, 255, 0)" }])`],
          args: ["pixels"]
        },
        clearScreen: {
          desc: "Clears the entire grid",
          smpl: ["grid.clearScreen()"],
          args: []
        }
      },
      variables: []
    }
  }
})()
