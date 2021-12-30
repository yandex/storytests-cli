import type { Config } from './config';

type GenerateArgs = {
    rewrite?: boolean;
    config: Pick<
        Config,
        | 'generateFileName'
        | 'componentNamePattern'
        | 'testGenerationStrategy'
        | 'testTemplate'
        | 'storyNamePattern'
        | 'storyFilesPath'
        | 'relativeTestDirectoryPath'
        | 'testFilePostfixes'
    >;
};

type CleanupArgs = {
    dry?: boolean;
    config: Pick<
        Config,
        | 'generateFileName'
        | 'testGenerationStrategy'
        | 'storyFilesPath'
        | 'storyNamePattern'
        | 'componentNamePattern'
        | 'testFilePostfixes'
        | 'relativeTestDirectoryPath'
        | 'validateFileName'
    >;
};

type TemplateTypes = 'hermione' | 'playwright' | 'puppeteer';

type InitArgs = {
    template?: TemplateTypes;
};

export type { GenerateArgs, CleanupArgs, InitArgs, TemplateTypes };
