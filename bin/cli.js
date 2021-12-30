#!/usr/bin/env node
var run = require('../dist/run').run;

process.on('unhandledRejection', (reason) => {
    console.error(reason);
    process.exit(1);
});

run();
