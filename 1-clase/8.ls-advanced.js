const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.log(pc.red(`No se pudo leer el directori ${folder}`))
    process.exit(1)
  }
  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath)
    } catch {
      console.log(`No se pudo leer el directori ${folder}`)
      process.exit(1)
    }
    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleDateString()
    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(
      fileSize.toString().padStart(10)
    )}
         ${pc.yellow(fileModified)}`
  })
  const fileInfo = await Promise.all(filePromises)
  fileInfo.forEach((fileInfo) => console.log(fileInfo))
}
ls(folder)
