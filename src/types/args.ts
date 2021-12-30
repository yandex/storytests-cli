import type { Config } from './config';

type GenerateArgs = {
    rewrite?: boolean;
    config: Pick<
        Config,
        | 'generateFileName'
        | 'componentPattern'
        | 'strategy'
        | 'generateTest'
        | 'storyPattern'
        | 'filesGlob'
        | 'testDirectory'
        | 'postfixes'
    >;
};

type CleanupArgs = {
    dry?: boolean;
    config: Pick<
        Config,
        | 'generateFileName'
        | 'strategy'
        | 'filesGlob'
        | 'storyPattern'
        | 'componentPattern'
        | 'postfixes'
        | 'testDirectory'
        | 'validateFileName'
    >;
};

type TemplateTypes = 'hermione' | 'playwright' | 'puppeteer';

type InitArgs = {
    template?: TemplateTypes;
};

export type { GenerateArgs, CleanupArgs, InitArgs, TemplateTypes };
