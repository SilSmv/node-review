console.log(process.argv)
//Controla el proceso y su salida
// process.exit(1)
// podemos controlar eventos del proceso
process.on('exit',() =>{

})
//current working directory
console.log(process.cwd())

//platfoorm
console.log(process.env.PEPITO)