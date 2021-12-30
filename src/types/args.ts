import type { Config } from './config';

type GenerateArgs = {
    rewrite: boolean;
    config: Config;
};

type TemplateTypes = 'hermione' | 'playwright' | 'puppeteer';

type InitArgs = {
    template?: TemplateTypes;
};

export type { GenerateArgs, InitArgs, TemplateTypes };
