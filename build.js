require('esbuild')
    .build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        minify: true,
        platform: 'node',
        target: ['node10.4'],
        external: ['cosmiconfig', 'joi', 'yargs', 'glob'],
        outfile: 'dist/index.js',
    })
    .catch((err) => (console.error(err), process.exit(1)));
