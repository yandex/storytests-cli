#!/usr/bin/env node

process.on('unhandledRejection', (reason) => {
    console.error(reason);
    process.exit(1);
});

require('../dist/index').run();
