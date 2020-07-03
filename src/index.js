const readline = require("readline");
const { createDecrypt, createEncrypt, cryptData } = require('./services/deId')

const rl = readline.createInterface({
  input: process.stdin,
  // output: process.stdout
});

const invalid = () => console.log('invalido')

const exit = () => process.exit(0)

const scriptsDescriptions = [
  '*** Choose a script:\n',
  '*** 1: crypt data',
  '*** 2: test encrypt',
  '*** 3: test decrypt\n',
  '*** or press 0 for leave...'
]

const scripts = {
  1: cryptData,
  2: createEncrypt,
  3: createDecrypt,
  0: exit,
  '': invalid,
  undefined: invalid,
}

const app = () => {
  scriptsDescriptions.map((s) => console.log(s))
  rl.question('', function(choosed) {
    console.clear()
    const script = scripts[choosed]
    if (typeof script === 'function') {
      return script(app)
    }
    return app()
  })
}
console.clear()
app(true)
