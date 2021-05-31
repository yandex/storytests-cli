type TConfig = {
    testTemplate: (
        component: string,
        story: string | string[],
        postfix: string,
    ) => string | false;
    generateFileName: (name: string, postfix: string) => string;

    storyFilesPath: string;
    relativeTestDirectoryPath: string;
    testFilePostfixes: string[];
    testGenerationStrategy: 'component' | 'story';

    componentNamePattern: RegExp | string;
    storyNamePattern: RegExp | string;
};

export type { TConfig };
