// Esto solo en los modulos nativos que notiene promesas nativas 
// const {promisify} = require('node:util')
// const readFilePromise = promisify(fs.readFile)

import { readFile } from 'node:fs/promises'

Promise.all([
    readFile('./archivo.txt','utf-8'),
    readFile('./archivo2.txt','utf-8')
]).then(([text,secondText]) => {
    console.log('primer texto', text)
    console.log('segundo text',secondText)
})

