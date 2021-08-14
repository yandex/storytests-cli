const pkg = require('./package.json');

require('esbuild')
    .build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        minify: true,
        platform: 'node',
        target: ['node10.4'],
        external: ['cosmiconfig', 'yargs', 'glob', 'node-fetch'],
        outfile: pkg.main,
    })
    .catch((err) => (console.error(err), process.exit(1)));
