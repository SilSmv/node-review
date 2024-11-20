const path = require ('node:path')
// indica el separador de rutas
console.log(path.sep)
//unir rutas con path.join
 const filePath = path.join('.','node','node-review','text.txt')
 console.log(filePath)

 const base = path.basename('./node/node-review/text.txt')
 console.log(base);
 const filename = path.basename('./node/node-review/text.txt','.txt')
 console.log(filename);

 const extension = path.extname('archivo.txt')
 console.log(extension)