// Esto solo en los modulos nativos que notiene promesas nativas 
// const {promisify} = require('node:util')
// const readFilePromise = promisify(fs.readFile)

const fs = require('node:fs/promises')

console.log('Leyendo el primer archivo ...')

const text = fs.readFile('./archivo.txt','utf-8').then(
    text=>{
        console.log('primer texto:',text)
    }
)
console.log('Leyendo el segundo archivo ...')

const secondText = fs.readFile('./archivo2.txt','utf-8').then(
    text =>{
        console.log('segundo texto',text)
    }
)