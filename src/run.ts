import yargs from 'yargs';

import { injectConfig } from 'utils/inject-config';

import { generate } from 'commands/generate';
import { cleanup } from 'commands/cleanup';
import { init } from 'commands/init';

import type { InitArgs } from 'types/args';

const args = yargs
    .command(
        'init',
        'Initialize default settings',
        (yargs) => {
            return yargs.option('template', {
                alias: 't',
                describe: `Populate with predefined options for
                    a testing framework or provide your own GitHub Gist ID`,
                choices: ['hermione', 'playwright', 'puppeteer'],
                demandOption: false,
            });
        },
        (args) => {
            init(args as InitArgs);
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
        injectConfig(generate),
    )
    .command(
        ['cleanup'],
        'Delete test files from stories that no longer exist',
        (yargs) => {
            return yargs
                .option('dry', {
                    describe:
                        'Only print files to delete, but do not actually delete them',
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
        injectConfig(cleanup),
    )
    .option('verbose', {
        boolean: true,
        describe: 'Print error stacktraces',
        demandOption: false,
    })
    .fail((msg, err, yargs) => {
        /* eslint-disable no-console */
        console.error(
            yargs.argv.verbose ? err : `Error: ${msg || err.message}`,
        );
        console.error(
            'Please refer to the README at https://github.com/yandex/storytests-cli#readme or leave an issue there',
        );
        /* eslint-enable no-console */

        process.exit(1);
    });

const run = (): void => {
    args.parse();
};

export { run };
