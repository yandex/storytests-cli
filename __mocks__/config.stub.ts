const config: Record<string, unknown> = {
    testTemplate: () => '',
    generateFileName: () => '',

    storyFilesPath: '',
    relativeTestDirectoryPath: '',
    testFilePostfixes: [''],
    testGenerationStrategy: 'component',

    componentNamePattern: /./,
    storyNamePattern: /./,
};

export { config };