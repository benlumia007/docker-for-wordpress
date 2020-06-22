const commands = require( "./commands" );
const { execSync } = require( 'child_process' );
const path = require( "./configure" );
const getRootPath = path.setRootPath();
const getGlobalPath = path.setGlobalPath();
const getConfigPath = path.setConfigPath();
const getComposeFile = path.setComposeFile();

const help = function() {
    const command = commands.command();

    const help = `
Usage:  wsldocker ${command} {container}
`;
    console.log( help );
    process.exit();
};

const up = async function() {
    execSync( `docker-compose -f ${getComposeFile} up -d` );
};

const start = async function() {
    const container = commands.subcommand() || 'all';

    try {
        if ( container == 'all' ) {
            execSync( `docker-compose -f ${getComposeFile} start`, { stdio: 'inherit' } );
        } else {
            execSync( `docker-compose -f ${getComposeFile} start ${container}`, { stdio: 'inherit' } );
        }
    } catch ( ex ) {}

    process.exit();
}

const stop = async function() {
    const container = commands.subcommand() || 'all';

    try {
        if ( container == 'all' ) {
            execSync( `docker-compose -f ${getComposeFile} stop`, { stdio: 'inherit' } );
        } else {
            execSync( `docker-compose -f ${getComposeFile} stop ${container}`, { stdio: 'inherit' } );
        }
    } catch ( ex ) {}

    process.exit();
};

const restart = async function() {
    const container = commands.subcommand() || 'all';

    try {
        if ( commands.subcommand == 'all' ) {
            execSync( `docker-compose -f ${getComposeFile} restart`, { stdio: 'inherit' } );
        } else {
            execSync( `docker-compose -f ${getComposeFile} restart ${container}`, { stdio: 'inherit' } );
        }
    } catch ( ex ) {}

    process.exit();
};

const down = async function() {
    execSync( `docker-compose -f ${getComposeFile} exec mysql make docker-backup`, { stdio: 'inherit' } );
    execSync( `docker-compose -f ${getComposeFile} down` );
};

const command = async function() {
    if ( commands.subcommand() === 'help' || commands.subcommand() === false ) {
        help();
    } else {
        switch ( commands.command() ) {
            case 'up':
                up();
                break;
            case 'start':
                start();
                break;
            case 'restart':
                restart();
                break;
            case 'stop':
                stop();
                break;
            case 'down':
                down();
                break;
            default:
                help();
                break;
        }
    }
};

module.exports = { command, start, stop, restart, down, up, help };
