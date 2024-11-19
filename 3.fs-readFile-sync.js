const fs = require('node:fs')
// const {promisify} = require('node:util')
// const readFilePromise = promisify(fs.readFile)

console.log('Leyendo el primer archivo ...')

const text = fs.readFileSync('./archivo.txt','utf-8')

console.log('primer texto',text)

console.log('Leyendo el segundo archivo ...')

const secondText = fs.readFileSync('./archivo2.txt','utf-8')

console.log('segundo texto',secondText)