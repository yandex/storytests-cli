type TGenerateArgs = {
    rewrite: boolean;
    config: string | null;
};

type TTemplateTypes = 'hermione' | 'playwright' | 'puppeteer';

type TInitArgs = {
    template?: TTemplateTypes;
};

export type { TGenerateArgs, TInitArgs, TTemplateTypes };
