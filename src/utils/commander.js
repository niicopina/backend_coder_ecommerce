import {Command} from 'commander'

/* const program = new Command()

program
    .option('-d', 'variable para debug', false)
    .option('-p, --port <port>', 'puerto para servidor', 8000)
    .option('--mode <mode>', 'modo de trabajo', 'develpment')
    .requiredOption('-u <user>', 'usuario utilizando app', 'no se ha declarado un usuario')
    .option('-l, --letters [letter...]', 'specify letter')
    .parse()

console.log('options: ', program.opts())
console.log('argumentos: ', program.args()) */

const commander = new Command

commander
    .option('--mode <mode>', 'Modo de ejecución de nuestra app', 'development')
    .parse()

export default commander