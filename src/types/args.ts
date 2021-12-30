type GenerateArgs = {
    rewrite: boolean;
    config: string | null;
};

type TemplateTypes = 'hermione' | 'playwright' | 'puppeteer';

type InitArgs = {
    template?: TemplateTypes;
};

export type { GenerateArgs, InitArgs, TemplateTypes };
