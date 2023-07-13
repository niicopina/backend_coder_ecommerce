console.log('iniciando el proceso')
process.on('exit', code => {
    console.log('este se ejecuta antes de salir del proceso', code)
})
console.log('AQUI')
process.on('uncaughtException', exception => {
    console.log('este atrapa todas las excepciones no controladas', exception)
})
