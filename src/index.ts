import yargs from 'yargs';

import { generate } from 'src/commands/generate';
import { init } from 'src/commands/init';
import type { TInitArgs } from './types/args';

const argv = yargs
    .command(
        'init',
        'Initialize default settings',
        (yargs) => {
            return yargs.option('template', {
                alias: 't',
                describe: 'Populate with options for testing framework',
                choices: ['hermione', 'playwright'],
                demandOption: false,
            });
        },
        (args) => {
            init(args as TInitArgs);
        },
    )
    .command(
        ['generate', '$0'],
        'Generate test files according to config',
        (yargs) => {
            return yargs
                .option('rewrite', {
                    alias: 'r',
                    describe: 'Rewrite existing test files',
                    boolean: true,
                    default: false,
                })
                .option('config', {
                    alias: 'c',
                    describe: 'Specify config path',
                    type: 'string',
                    nargs: 1,
                    default: null,
                    demandOption: false,
                });
        },
        generate,
    )
    .option('verbose', {
        boolean: true,
        describe: 'Print error stacktraces',
        demandOption: false,
    })
    .fail((msg, err) => {
        /* eslint-disable no-console */
        console.error(argv.verbose ? err : `Error: ${msg || err.message}`);
        console.error(
            'Please refer to the README at https://github.com/yandex/storytests-cli#readme or leave an issue there',
        );
        /* eslint-enable no-console */

        process.exit(1);
    })
    .parse();
