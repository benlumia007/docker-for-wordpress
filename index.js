#!/usr/bin/env node
const commands = require( './src/commands' );

const help = function() {
    let help = `
Usage: sturdydocker [command]

Commands:

  provision	Creae new WordPress site or sites
  restart	Restarts one or more containers
  shell		Opens a shell for a specific container ( default: nginx )
  start		Starts one or more containers
  stop		Stops one or more containers
  up        Starts one or more containers
  down      Destroys one or more containers
  pull      Pull image or images

Run 'sturdydocker [command] help' for more information on a command.
`;
    console.log( help );
};

const version = function() {
    var pjson = require('./package.json');
    console.log( 'WP 4 Docker' );
    console.log( `Version: ${pjson.version}` );
};

const init = async function() {
    let command = commands.command();

    switch ( command ) {
        case 'provision':
            require( "./src/provision" );
            break;
        case 'down':
        case 'restart':
        case 'start':
        case 'stop':
        case 'up':
        case 'pull':
            await require( "./src/environment" ).command();
			break;
		case 'shell':
			await require( './src/shell' ).command();
        case '--version':
        case '-v':
            version();
            break;
        default:
            help();
            break;
    }
};
init();
