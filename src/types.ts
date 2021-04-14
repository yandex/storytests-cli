type TConfig = {
    testTemplate: (
        component: string,
        story: string | string[],
        postfix: string,
    ) => string;
    generateFileName: (name: string, postfix: string) => string;

    storyFilesPath: string;
    relativeTestDirectoryPath: string;
    testFilePostfixes: string[];
    testGenerationStrategy: 'component' | 'story';

    componentNamePattern: RegExp | string;
    storyNamePattern: RegExp | string;
};

type TArgs = {
    rewrite: boolean;
};

export type { TConfig, TArgs };
