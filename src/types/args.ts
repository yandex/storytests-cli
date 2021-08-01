type TGenerateArgs = {
    rewrite: boolean;
    config: string | null;
};

type TInitArgs = {
    template?: 'hermione' | 'playwright';
};

export type { TGenerateArgs, TInitArgs };
