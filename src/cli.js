import arg from 'arg'
import * as services from './services/index.services.js'

function parseArgumentsIntoOptions(rawArgs) {
    
    const args = arg(
        {
            '--help': Boolean,
            '--template': String,
            '--output': String,
            '-h': '--help',
            '-t': '--template',
            '-o': '--output'
        }, {
        argv: rawArgs.slice(2)
    })

    return {
        input: args._[0] || null,
        help: args['--help'] || false,
        template: args['--template'] || "text",
        output: args['--output'] || null
    }
}


export function cli(args) {
    try {
        let options = parseArgumentsIntoOptions(args)
        if (options.help == true ) {
            services.showHelp()
        } else {
            if (options.input == null) {
                // console.error("(error) You must specify the input log file!")
                services.showHelp()
            } else {
                services.loadFile(options.input, options.template, options.output)
            }
    
        }
    } catch (error) {
        console.error("Bad Options!")
    }
    

    
}