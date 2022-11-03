const list = (obj) => {
  // https://developer.chrome.com/docs/devtools/console/format-style/
  const dimText = (str) => `\x1B[37m${str}\x1B[m`
  const keyText = (str) => `\x1B[97;46m ${str} \x1B[m`
  const keyTxt2 = (str) => `\x1B[97;104m ${str} \x1B[m`
  const availbl = (str) => `\x1B[102m ${str} \x1B[m`
  
  const pText = (args) => {
    const base = 'parameters'
    const l = args.length
    if(l < 1) return `${base} ${l}`
    return args.reduce((acc,cur,i) => acc+=` ${i+1}:${cur} |`, base).slice(0, -1)
  }

  const objToStr = (obj) => {
    let str = ''
    for (const p in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, p)) {
            str += p + '::' + obj[p] + '\n'
        }
    }
    return str
  }
  
  // const deepVariables = (input, obj) => {
  //   return input.reduce((acc,cur) => {
  //     if(typeof cur === 'string') {
  //       return Object.assign(acc, { [cur]: x.obj[cur] }) 
  //     } else {
  //       const deepKey = Object.keys(cur)[0]
  //       return Object.assign(acc, { [deepKey]: deepVariables(cur[deepKey], obj) })
  //     }
  //   },{})
  // }

  const keys = Object.keys(documentationObject)
  objKey = keys.find(x => objToStr(window[x]) === objToStr(obj))
  const x = {
    obj: window[objKey],
    doc: documentationObject[objKey]
  }
  if(!!objKey) { //show specific documentation
    console.log(`\n\n${dimText("Documentation and help for:")} \x1B[1m${objKey}
\x1B[m---\n${keyText("Functions↓")}\n`)
    // ƒ 𝑓(𝑥) 𖨠 ➤
    if(!!Object.keys(x.doc.functions).length) { // if functions found
      console.group(`${objKey}.`)
      Object.keys(x.doc.functions).forEach((key) => {
        const d = x.doc.functions[key]
        const f = x.obj[key]
        console.groupCollapsed(`\x1B[3;2mƒ \x1B[m${key}() \t\x1B[2m${dimText(pText(d.args))}`)

        console.log(`\x1B[3m${dimText(`Example${
          d.smpl.length > 1 ? 's': ''
          }:\x1B[m \x1B[1m${d.smpl.join(' | ')}`)}`)
        
        console.log(`\n\x1B[4m${dimText(`"${d.desc}"`)}\n\n`)
        // console.log({definition: f})

        console.groupEnd()
      })
      console.groupEnd()
    } else {
      console.log(`\x1B[1mNo functions on ${objKey} object\x1B[m`)
    }
    //variables
    console.log(keyText("Variables↓"))
    // console.groupCollapsed(`${objKey}.`)
    // return deepVariables(x.doc.variables, obj)
    return x.doc.variables.reduce((acc,cur) => {
      return Object.assign(acc, { [cur]: x.obj[cur] }) 
    },{})
  }
  else { // list available objects, shelly, grid etc.
    const name = "list"
    const args = ["object"]
    const smpl = ["list(shelly), list()"]
    const desc = "Display documentation and help for available objects"
    console.log(`${dimText("\nHow to use")} \x1B[1m${name}:
\x1B[m-\n${keyText("Usage↓")}\n`)
    console.group(`\x1B[3;2mƒ \x1B[m${name}() \t\x1B[2m${dimText(pText(args))}`)
    console.log(`\x1B[3m${dimText(`Examples:\x1B[m \x1B[1m${smpl.join(' | ')}`)}`)
    console.log(`\n\x1B[4m${dimText(`"${desc}"`)}\n\n`)
    console.groupEnd()
    console.log(keyTxt2("Available objects↓"))
    console.log(`\x1B[1m${availbl(keys
      .reduce((acc,cur) => `${acc}${cur}\n`,'').slice(0, -1))}\n\n`)
    return keys.reduce((acc,cur) => Object.assign(acc, {
      [cur]: window[cur]
    }),{})
  }
}

const init = () => {
  //styles
  const h1 = ["font-size: 200%"]
  const sub = ["color: grey", "display: inline-block"]

  //sequence
  console.clear()
  const initMsg = () => {
    console.log("\n\ninitializing Shelly Shell\n:::::::::::::::::::::::::\n\n")
  }
  // const startupInterval = setInterval(initMsg, 250)

  setTimeout(initMsg, 400)
  setTimeout(() => {
    // clearInterval(startupInterval)
    console.clear()
    console.log(`%c\n\nWelcome to\nShelly Shell 🐢\n\n`, h1.join(';'))
    console.info(`%c\n\nShell means the same thing as\nconsole or terminal\n\n`,
      sub.join(';'))
  }, 1000)
}
init()
