const config: Record<string, unknown> = {
    generateTest: () => '',
    generateFileName: () => '',

    filesGlob: '',
    testDirectory: '',
    postfixes: [''],
    strategy: 'component',

    componentPattern: /./,
    storyPattern: /./,

    validateFileName: () => {},
};

export { config };
