// const fs =require('node:fs')

// fs.readdir('.',(error,files)=>{
//     if(error){
//         console.error('Error al leer el directorio',error)
//         return;
//     }
//     files.forEach(file =>{
//         console.log(file)
//     })
// })
const { error } = require('node:console')
const fs =require('node:fs/promises')

fs.readdir('.').then((files) => {
    files.forEach(file =>{
        console.log(file)
    })
}).catch(error =>{
    if(error){
        console.error('Error al leer el directorio',error)
        return;
    }
})