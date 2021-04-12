require('esbuild')
    .build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        minify: true,
        platform: 'node',
        target: ['node10.4'],
        outfile: 'build/index.js',
    })
    .catch((err) => (console.error(err), process.exit(1)));
