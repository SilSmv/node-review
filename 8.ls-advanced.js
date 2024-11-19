const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2]?? '.'

async function ls(folder) {
    let files 
    try {
        files = await fs.readdir(folder)
    }catch{
        console.log(`No se pudo leer el directori ${folder}`)
        process.exit
    }
    const filePromises = files.map(async file =>{
        const filePath = path.join(folder,file)
        let stats
        try{
            stats  = await fs.stat(filePath)
        }catch{
            console.log(`No se pudo leer el directori ${folder}`)
            process.exit
        }
        const isDirectory = stats.isDirectory();
        const fileType = isDirectory? 'd': 'f';
        const fileSize = stats.size
        const fileModified = stats.mtime.toLocaleDateString();
        return `${fileType} ${file.padEnd(20)} ${fileSize.toString().padStart(10)} ${fileModified}`
    })
    const fileInfo = await Promise.all(filePromises)
    fileInfo.forEach(fileInfo => console.log(fileInfo))
    
}
ls(folder)